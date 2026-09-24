import { render, screen } from '@testing-library/react';
import DeviceIPDetails from '../../../../src/app/components/ManagedServices/DeviceIPDetails/index';
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
jest.mock('../../../../src/utils/lib/proxyAPI', () => ({
  proxyURL: 'http://mock-api'
}));

// Mock usePermissionChecker
jest.mock('../../../../src/app/hooks/usePermissionsChecker', () => ({
  usePermissionChecker: () => ({
    checkGroupPermissionExists: () => true
  })
}));

const mockStore = configureStore([]);

describe('DeviceIPDetails Integration Test', () => {
  it('renders DataPanel with Device IP Details header', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountID: '12345'
          }
        }
      }
    });

    render(
      <Provider store={store}><DeviceIPDetails /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Device IP Details')).toBeInTheDocument();
  });
});