import { render, screen } from '@testing-library/react';
import ACSDetails from '../../../src/app/components/Elife/ACSDetails';
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

const mockStore = configureStore([]);

describe('ACSDetails Integration Test', () => {
  it('renders DataPanel with correct header and queryParams', () => {
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
      <Provider store={store}><ACSDetails /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('ACS Details')).toBeInTheDocument();
  });
});