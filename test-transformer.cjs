// Quick test: what does esbuild produce from a file with jest.mock and imports?
const { transformSync } = require('esbuild');

const testSource = `
import { render } from '@testing-library/react';
import axiosClient from '../../src/utils/axios';

jest.mock('../../src/utils/axios', () => ({
    __esModule: true,
    default: { get: jest.fn(), post: jest.fn() }
}));

describe('test', () => {
    it('works', () => {
        axiosClient.get.mockReturnValue(Promise.resolve({ data: {} }));
    });
});
`;

const result = transformSync(testSource, {
    loader: 'tsx',
    format: 'cjs',
    target: 'node18',
    jsx: 'automatic',
});

console.log('=== RAW ESBUILD OUTPUT (first 30 lines) ===');
const lines = result.code.split('\n');
lines.slice(0, 30).forEach((l, i) => console.log(`${i}: ${l}`));
console.log('\n=== NOW RUNNING THROUGH HOISTER ===');

const { process: transform } = require('./esbuild-jest-transformer.cjs');
const transformed = transform(testSource, 'test.tsx');
const tLines = transformed.code.split('\n');
tLines.slice(0, 30).forEach((l, i) => console.log(`${i}: ${l}`));
