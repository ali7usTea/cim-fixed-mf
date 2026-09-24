import { render, screen } from '@testing-library/react';
import DataPortCustomerWAN_IP from '../../../src/app/components/ManagedServices/DataPortCustomerWAN_IP';
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

describe('DataPortCustomerWAN_IP Integration Test', () => {
  it('renders DataPanel with Managed Services Data Port Details header', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountID: 'ACC12345'
          }
        }
      }
    });

    render(
      <Provider store={store}><DataPortCustomerWAN_IP /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Managed Services Data Port Details')).toBeInTheDocument();
  });
});