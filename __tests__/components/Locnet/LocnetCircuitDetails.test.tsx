import { render, screen, waitFor } from '@testing-library/react';
import LocnetCircuitDetails from '../../../src/app/components/Locnet/index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock DataPanel component
jest.mock('cim-ui-components', () => ({
  DataPanel: ({
    headerTitle,
    panelData,
    isLoading,
    error,
    debugMode,
    shouldRender,
    autoPublish,
    panelDataRefId,
    debugRoute,
    onRefresh,
    viewLayout,
  }: any) => (
    <div
      data-testid={headerTitle}
      //@ts-ignore
      panelData={JSON.stringify(panelData)}
      isLoading={isLoading}
      error={error ? error.message : ''}
      debugMode={debugMode}
      shouldRender={shouldRender}
      autoPublish={autoPublish}
      panelDataRefId={panelDataRefId}
      debugRoute={debugRoute}
      viewLayout={viewLayout}
    >
      {headerTitle}
    </div>
  ),
}));

// Mock proxyURL
jest.mock('../../../src/utils/lib/proxyAPI', () => ({
  proxyURL: 'http://mock-api'
}));

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: {
          Non_Table_Data: { port: '12345' },
          "GetAccountCircuitDetails.COMMON_DETAILS": [{ key: 'value' }],
          "GetAccountCircuitDetails.LOCNET_DETAILS": [{ key: 'locnet' }],
          "GetAccountCircuitDetails.CIRCUIT_DETAILS": [{ key: 'circuit' }],
        },
        refId: 'REF123'
      }
    })
  )
}));

const mockStore = configureStore([]);

describe('LocnetCircuitDetails Integration Test', () => {
  it('renders all DataPanel components with correct headers', async () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            accountNumber: 'AN456',
            debugReport: true
          }
        }
      }
    });

    render(
      <Provider store={store}><LocnetCircuitDetails /></Provider>
    );

    // Wait for async data fetch
    await waitFor(() => {
      expect(screen.getByTestId('Port Number')).toBeInTheDocument();
    });

    // Check all DataPanel headers
    expect(screen.getByTestId('Port Number')).toBeInTheDocument();
    expect(screen.getByTestId('Common Details')).toBeInTheDocument();
    expect(screen.getByTestId('Locnet Details')).toBeInTheDocument();
    expect(screen.getByTestId('Circuit Details')).toBeInTheDocument();
  });
});