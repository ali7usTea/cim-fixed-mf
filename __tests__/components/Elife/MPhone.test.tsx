import { render, screen } from '@testing-library/react';
import MPhone from '../../../src/app/components/Elife/MPhone';
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

describe('MPhone Integration Test', () => {
  it('renders DataPanel with correct header', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountID: 'ACC123'
          }
        }
      }
    });

    render(
      <Provider store={store}><MPhone /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Mphone Details')).toBeInTheDocument();
  });
});