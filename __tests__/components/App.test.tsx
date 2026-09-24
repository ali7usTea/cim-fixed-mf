import { Toaster } from 'sonner';

jest.mock('sonner', () => ({
    Toaster: jest.fn(() => <div data-testid="toaster">Toaster</div>),
}));
jest.mock('cim-ui-components', () => ({
    DialogTitle: jest.fn(() => <div data-testid="dialog-title">DialogTitle</div>),
    Spinner: jest.fn(() => <div data-testid="spinner">Spinner</div>),
}));
jest.mock('../../src/providers/AuthProvider', () => ({
    __esModule: true,
    AuthProvider: jest.fn(({ enabled }) => <div data-testid="auth-provider" />),
}));

jest.mock('../../src/app/ClientProviders', () => ({
    __esModule: true,
    default: jest.fn(({ children }) => (
        <div data-testid="client-providers">
            <Toaster />
            {children}
        </div>
    )),
}));

jest.mock('../../src/layout/layout', () => ({
    __esModule: true,
    default: jest.fn(({ children }) => <div data-testid="layout">{children}</div>),
}));

import { render, screen } from '@testing-library/react';
import App from '../../src/App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('client-providers')).toBeInTheDocument();
    });

    it('renders Layout component', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    it('renders Toaster component', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId('toaster')).toBeInTheDocument();
    });
});
