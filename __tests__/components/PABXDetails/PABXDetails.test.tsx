import { render, screen } from '@testing-library/react';
import PABXPilotDetails from '../../../src/app/components/PABXDetails/PABXPilotDetails';
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

describe('PABXPilotDetails Integration Test', () => {
  it('renders DataPanel with PRI DID Details header', () => {
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

    render(
      <Provider store={store}><PABXPilotDetails /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('PRI DID Details')).toBeInTheDocument();
  });
});