// This is a module exposed as './FixedApp in remote-fixed/vite.config.mts.
// It's the contract the Shell's RemoteMfeLoader expects: a default-exported.
// component that accepts the active SearchContext as a prop.

import type { SearchContext } from '@/types'; // mirror the Shells shape

interface FixedAppProps {
    searchContext: SearchContext;
}

export default function FixedApp({ searchContext }: FixedAppProps) {
    // This MFE owns everythins below this line: its own routing, its own API/BFF calls (using searchContext.customerId / accountNo / etc.),
    // its own local state. It should NOT reach into the Shell's state or into other MFEs.
    return (
        <div>
            <h2>Fixed - {searchContext.customerId} </h2>
            {/* this MFE's actual UI... */}
        </div>
    )
}