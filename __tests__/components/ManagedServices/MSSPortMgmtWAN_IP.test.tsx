import { render, screen } from '@testing-library/react';
import MSSPortMgmtWAN_IP from '../../../src/app/components/ManagedServices/MSSPortMgmtWAN_IP';
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

describe('MSSPortMgmtWAN_IP Integration Test', () => {
  it('renders DataPanel with MSS Port Management Wan IP Details By AccountId header', () => {
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
      <Provider store={store}><MSSPortMgmtWAN_IP /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('MSS Port Management Wan IP Details By AccountId')).toBeInTheDocument();
  });
});