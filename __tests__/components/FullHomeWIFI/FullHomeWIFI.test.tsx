import { render, screen } from '@testing-library/react';
import FullHomeWIFI from '../../../src/app/components/FullHomeWIFI';
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

describe('FullHomeWIFI Integration Test', () => {
  it('renders DataPanel with correct header when permission is granted', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountNumber: 'ACC123'
          }
        }
      }
    });

    render(
      <Provider store={store}><FullHomeWIFI /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Contract End Date,Device Details')).toBeInTheDocument();
  });
});