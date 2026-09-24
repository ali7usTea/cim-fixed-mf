import { render, screen } from '@testing-library/react';
import Gipvpn from '../../../src/app/components/ManagedServices/Gipvpn';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock DataPanel component
jest.mock('cim-ui-components', () => ({
  DataPanel: ({
    headerTitle,
    ...props
  }: any) => (
    <div data-testid={headerTitle} {...props}>
      {headerTitle}
    </div>
  ),
}));

// Mock proxyURL
jest.mock('../../../src/utils/lib/proxyAPI', () => ({
  proxyURL: 'http://mock-api'
}));

// Mock usePermissionChecker
jest.mock('../../../src/app/hooks/usePermissionsChecker', () => ({
  usePermissionChecker: () => ({
    checkGroupPermissionExists: () => true
  })
}));

const mockStore = configureStore([]);

describe('Gipvpn Integration Test', () => {
  it('renders two DataPanel components with Main Details and Account Details headers', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountNumber: 'ACC12345'
          }
        }
      }
    });

    render(
      <Provider store={store}><Gipvpn /></Provider>
    );

    // Check DataPanel headers
    expect(screen.getByTestId('Main Details')).toBeInTheDocument();
    expect(screen.getByTestId('Account Details')).toBeInTheDocument();
  });
});