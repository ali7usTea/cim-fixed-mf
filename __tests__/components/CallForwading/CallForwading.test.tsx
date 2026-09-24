import { render, screen } from '@testing-library/react';
import CallForwarding from '../../../src/app/components/CallForwarding';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock cim-ui-components
jest.mock('cim-ui-components', () => ({
  DataPanel: ({ headerTitle, ...props }: any) => (
    <div data-testid={headerTitle} {...props}></div>
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

describe('CallForwarding Integration Test', () => {
  it('renders DataPanel with correct props', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountNumber: 'acc789'
          }
        }
      }
    });

    render(
      <Provider store={store}><CallForwarding /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Call Forwarding Info')).toBeInTheDocument();
  });
});