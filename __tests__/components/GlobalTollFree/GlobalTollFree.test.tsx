import { render, screen } from '@testing-library/react';
import GlobalTollFree from '../../../src/app/components/GlobalTollFree';
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

describe('GlobalTollFree Integration Test', () => {
  it('renders DataPanel with correct header and props', () => {
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
      <Provider store={store}><GlobalTollFree /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Global Toll Free Details')).toBeInTheDocument();
  });
});