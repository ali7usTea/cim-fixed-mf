import { render, screen } from '@testing-library/react';
import FixedOnLTEPanel from '../../../src/app/components/FixedOnLTE/FixedOnLTEPanel';
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

describe('FixedOnLTEPanel Integration Test', () => {
  it('renders DataPanel with correct header when permission is granted', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true
          }
        }
      }
    });

    const mockOnDataLoaded = jest.fn();

    render(
      <Provider store={store}><FixedOnLTEPanel onDataLoaded={mockOnDataLoaded} /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Fixed On LTE')).toBeInTheDocument();
  });
});