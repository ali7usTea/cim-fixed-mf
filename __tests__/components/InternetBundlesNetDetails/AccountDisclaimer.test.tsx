import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountDisclaimer from '../../../src/app/components/InternetBundlesNetDetails/AccountDisclaimer';
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
      api={api}
      queryParams={JSON.stringify(queryParams)}
      shouldRender={shouldRender}
      viewLayout={viewLayout}
      debugMode={debugMode}
    ></div>
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
          renderDisplayTotalNetAccountDisclaimer: true
        }
      }
    })
  )
}));

const mockStore = configureStore([]);

describe('AccountDisclaimer Integration Test', () => {
  it('renders disclaimer text and displays DataPanel on button click', async () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountID: 'ACC123',
            accountNumber: 'AN456'
          }
        }
      }
    });

    render(
      <Provider store={store}><AccountDisclaimer /></Provider>
    );

    // Wait for disclaimer data to load
    await waitFor(() =>
        
      expect(
        screen.getByText(/Current searched account/i)
      ).toBeInTheDocument()
    );

    // Check disclaimer text
    expect(
      screen.getByText(/Current searched account/i)
    ).toBeInTheDocument();

    // Click the button to display DataPanel
    fireEvent.click(screen.getByText(/Display Internet Bundles/i));

    // DataPanel should be rendered
    await waitFor(() =>
      expect(screen.getByTestId('Admin Details')).toBeInTheDocument()
    );
  });
});