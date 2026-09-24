import { render, screen } from '@testing-library/react';
import InternetLeasedLine from '../../../src/app/components/InternetLeasedLine/index';
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
    ></div>
  ),
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  DesktopIcon: () => <span data-testid="DesktopIcon" />,
}));

// Mock proxyURL and debugReportURL
jest.mock('../../../src/utils/lib/proxyAPI', () => ({
  proxyURL: 'http://mock-api',
  debugReportURL: 'http://mock-debug'
}));

// Mock usePermissionChecker
jest.mock('../../../src/app/hooks/usePermissionsChecker', () => ({
  usePermissionChecker: () => ({
    checkGroupPermissionExists: () => true
  })
}));

// Mock useFetchData for CloudExpress 
jest.mock('../../../src/providers/FetchDataProvider', () => () => ({
  data: {
    refId: 'REF123',
    data: {
      GetCloudDetailsByAccount_MainTable: [],
      privatePeering: [],
      publicPeering: [],
    }
  }
}));

const mockStore = configureStore([]);

describe('InternetLeasedLine Integration Test', () => {
  it('renders main DataPanel components and CloudExpress', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountID: 'ACC123',
            partyID: 'PTY456',
            'PVP FRP ID': 'PVP789'
          }
        }
      }
    });

    render(
      <Provider store={store}><InternetLeasedLine /></Provider>
    );

    // Check main DataPanel headers
    expect(screen.getByTestId('Data/Leased Line')).toBeInTheDocument();
    expect(screen.getByTestId('Internet Leased Line Second Details')).toBeInTheDocument();
    expect(screen.getByTestId('POP Details')).toBeInTheDocument();
    expect(screen.getByTestId('IP Ranges')).toBeInTheDocument();
    expect(screen.getByTestId('Account Port/XPath Summary')).toBeInTheDocument();
    expect(screen.getByTestId('Account Port/XPath Details')).toBeInTheDocument();

    // Check CloudExpress DataPanel headers
    expect(screen.getByTestId('Cloud Express Details')).toBeInTheDocument();
    expect(screen.getByTestId('Private Peering')).toBeInTheDocument();
    expect(screen.getByTestId('Public Peering')).toBeInTheDocument();
  });
});