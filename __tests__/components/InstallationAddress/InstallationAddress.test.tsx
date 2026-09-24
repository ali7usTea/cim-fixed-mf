import { render, screen } from '@testing-library/react';
import InstallationAddress from '../../../src/app/components/InstallationAddress';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock DataPanel component
jest.mock('cim-ui-components', () => ({
  DataPanel: ({
    headerTitle,
    api,
    queryParams,
    shouldRender,
    viewLayout,
    debugMode,
    debugRoute,
  }: any) => (
    <div
      data-testid={headerTitle}
      api={api}
      queryParams={JSON.stringify(queryParams)}
      shouldRender={shouldRender}
      viewLayout={viewLayout}
      debugMode={debugMode}
      debugRoute={debugRoute}
    ></div>
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

describe('InstallationAddress Integration Test', () => {
  it('renders both DataPanel components with correct headers', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountID: 'ACC123',
            partyID: 'PTY456'
          }
        }
      }
    });

    render(
      <Provider store={store}><InstallationAddress /></Provider>
    );

    // Check Installation Address DataPanel
    expect(screen.getByTestId('Installation Address')).toBeInTheDocument();

    // Check Installation Site DataPanel
    expect(screen.getByTestId('Installation Site')).toBeInTheDocument();
  });
});