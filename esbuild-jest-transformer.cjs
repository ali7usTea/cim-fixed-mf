const { transformSync } = require('esbuild');

/**
 * Hoist jest.mock/jest.unmock calls to the top of the CJS output, above all
 * require() calls. This replicates babel-jest's hoisting behavior.
 * 
 * esbuild always hoists require() calls to the top when converting ESM to CJS.
 * We need to move jest.mock() calls above those requires for Jest to intercept them.
 */
function hoistJestMocks(code) {
    // Find all jest.mock(...) blocks using a state machine approach
    const jestMockPattern = /^(\s*jest\.(mock|unmock|enableAutomock|disableAutomock)\s*\()/m;
    
    if (!jestMockPattern.test(code)) return code;
    
    const extracted = [];
    let remaining = code;
    
    let match;
    while ((match = remaining.match(/(\n|^)(\s*jest\.(mock|unmock|enableAutomock|disableAutomock)\s*\()/m)) !== null) {
        const startIdx = match.index + match[1].length;
        
        // Find the end of this jest.mock call by counting parentheses
        let depth = 0;
        let endIdx = startIdx;
        let inString = false;
        let stringChar = '';
        let escaped = false;
        
        for (let i = startIdx; i < remaining.length; i++) {
            const ch = remaining[i];
            
            if (escaped) {
                escaped = false;
                continue;
            }
            if (ch === '\\') {
                escaped = true;
                continue;
            }
            if (inString) {
                if (ch === stringChar) inString = false;
                continue;
            }
            if (ch === '"' || ch === "'" || ch === '`') {
                inString = true;
                stringChar = ch;
                continue;
            }
            if (ch === '(') depth++;
            if (ch === ')') {
                depth--;
                if (depth === 0) {
                    endIdx = i + 1;
                    // Skip trailing semicolons and newlines
                    while (endIdx < remaining.length && (remaining[endIdx] === ';' || remaining[endIdx] === '\n')) {
                        endIdx++;
                    }
                    break;
                }
            }
        }
        
        const block = remaining.substring(startIdx, endIdx);
        extracted.push(block.trim());
        remaining = remaining.substring(0, startIdx) + remaining.substring(endIdx);
    }
    
    if (extracted.length === 0) return code;
    
    // Also extract `var/const mockXxx = jest.fn()` declarations that mock factories reference
    const varPattern = /(\n|^)(\s*(?:var|const|let)\s+\w+\s*=\s*jest\.fn\(\);\s*\n?)/gm;
    const varDecls = [];
    let varMatch;
    while ((varMatch = varPattern.exec(remaining)) !== null) {
        varDecls.push(varMatch[2].trim());
    }
    // Remove those var declarations from remaining
    remaining = remaining.replace(/(\n|^)\s*(?:var|const|let)\s+\w+\s*=\s*jest\.fn\(\);\s*\n?/gm, '\n');
    
    // Insert after "use strict" if present
    const useStrictMatch = remaining.match(/^(\s*"use strict";\s*\n?)/);
    if (useStrictMatch) {
        const afterStrict = useStrictMatch[0].length;
        const before = remaining.substring(0, afterStrict);
        const after = remaining.substring(afterStrict);
        return before + varDecls.join('\n') + '\n' + extracted.join('\n') + '\n' + after;
    }
    
    return varDecls.join('\n') + '\n' + extracted.join('\n') + '\n' + remaining;
}

module.exports = {
    process(sourceText, sourcePath) {
        const loader = sourcePath.endsWith('.tsx')
            ? 'tsx'
            : sourcePath.endsWith('.ts')
            ? 'ts'
            : sourcePath.endsWith('.jsx')
            ? 'jsx'
            : 'js';

        // Replace import.meta.env with a global object for Jest compatibility
        const modifiedSource = sourceText.replace(/import\.meta\.env/g, 'globalThis.__VITE_ENV__');

        const result = transformSync(modifiedSource, {
            loader,
            sourcemap: 'inline',
            sourcefile: sourcePath,
            format: 'cjs',
            target: 'node18',
            jsx: 'automatic',
        });

        // Hoist jest.mock() calls above require() statements (like babel-jest does)
        // First strip the sourcemap comment to avoid false matches in base64 data
        let codeWithoutMap = result.code;
        let sourcemapComment = '';
        const smIdx = codeWithoutMap.lastIndexOf('//# sourceMappingURL=');
        if (smIdx !== -1) {
            sourcemapComment = codeWithoutMap.substring(smIdx);
            codeWithoutMap = codeWithoutMap.substring(0, smIdx);
        }
        
        const hoisted = hoistJestMocks(codeWithoutMap);

        return { code: hoisted + sourcemapComment, map: null };
    },
};
