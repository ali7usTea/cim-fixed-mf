// Polyfill import.meta.env for Jest (Vite-specific)
const { TextEncoder, TextDecoder } = require('util');

// Polyfill TextEncoder/TextDecoder for react-router-dom
if (typeof globalThis.TextEncoder === 'undefined') {
    globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
    globalThis.TextDecoder = TextDecoder;
}

// Mock import.meta.env (replaced by esbuild transformer to globalThis.__VITE_ENV__)
globalThis.__VITE_ENV__ = {
    VITE_PUBLIC_API_PROXY: 'http://localhost:3000/api',
    VITE_PUBLIC_IMAGE_URL: 'http://localhost:3000/images',
    VITE_PUBLIC_DEBUG_REPORT_URL: 'http://localhost:3000/debug',
    VITE_PUBLIC_SSO_AUTH_URL: 'http://localhost:3000/auth/sso',
    VITE_PUBLIC_AUTH_LOGIN_URL: 'http://localhost:3000/auth/login',
    VITE_PUBLIC_AUTH_SERVER_URL: 'http://localhost:3000/auth',
    VITE_AXIOS_BASE_URL: 'http://localhost:3000',
    VITE_PUBLIC_PERMISSION_URL: 'http://localhost:3000/api/permissions/tabs',
    VITE_PUBLIC_ALL_TABS_URL: 'http://localhost:3000/api/permissions/all-tabs',
    VITE_PUBLIC_PERMISSION_GROUP_URL: 'http://localhost:3000/api/permissions/groups',
    VITE_PUBLIC_ALL_GROUPS_URL: 'http://localhost:3000/api/permissions/all-groups',
};
