import { render, screen } from '@testing-library/react';
import OutagesDates from '../../../src/app/components/Outages/OutagesDates';
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
  }: any) => (
    <div
      data-testid={headerTitle}
      //@ts-ignore
      api={api}
      queryParams={JSON.stringify(queryParams)}
      shouldRender={shouldRender}
      viewLayout={viewLayout}
      debugMode={debugMode}
    >
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

describe('AccountInfo Integration Test', () => {
  it('renders DataPanel with Outages Dates header', () => {
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
      <Provider store={store}><OutagesDates /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Outages Dates')).toBeInTheDocument();
  });
});