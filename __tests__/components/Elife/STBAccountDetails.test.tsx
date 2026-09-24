import { render, screen, fireEvent } from '@testing-library/react';
import STBAccountDetails from '../../../src/app/components/Elife/STBAccountDetails';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock cim-ui-components
jest.mock('cim-ui-components', () => ({
  DataPanel: ({ headerTitle, selectedRows, setSelectedRows, ...props }: any) => (
    <div data-testid={headerTitle}><div data-testid="DataPanelRows">{selectedRows?.length ?? 0}</div><button data-testid="mock-refresh" onClick={props.onRefresh}>Refresh</button></div>
  ),
  Button: ({ children, ...props }: any) => (
    <button {...props} data-testid="ResetPasswordButton">{children}</button>
  ),
}));

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { data: {}, refId: 'ref123' } }))
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

// Mock proxyURL and debugReportURL
jest.mock('../../../src/utils/lib/proxyAPI', () => ({
  proxyURL: 'http://mock-api',
  debugReportURL: 'http://mock-debug'
}));

const mockStore = configureStore([]);

describe('STBAccountDetails Integration Test', () => {
  it('renders DataPanel and Reset Password button', async () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountNumber: 'ACC123',
            productCode: 'PROD456',
            userName: 'user789',
            accountID: 'ACCID101'
          }
        }
      }
    });

    render(
      <Provider store={store}><STBAccountDetails /></Provider>
    );

    // Check DataPanel header
    expect(await screen.findByTestId('STB Details')).toBeInTheDocument();

    // Check Reset Password button
    expect(screen.getByTestId('ResetPasswordButton')).toBeInTheDocument();
    expect(screen.getByTestId('ResetPasswordButton')).toHaveTextContent('Reset Password');
  });
});