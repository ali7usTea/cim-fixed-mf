import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import InternetBundlesNetDetails from '../../../src/app/components/InternetBundlesNetDetails/index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock AdminDetails component
jest.mock('../../../src/app/components/InternetBundlesNetDetails/AdminDetails', () => () => (
  <div data-testid="AdminDetailsMock">AdminDetailsMock</div>
));

// Mock AccountDisclaimer component
jest.mock('../../../src/app/components/InternetBundlesNetDetails/AccountDisclaimer', () => () => (
  <div data-testid="AccountDisclaimerMock">AccountDisclaimerMock</div>
));

const mockStore = configureStore([]);

describe('InternetBundlesNetDetails Integration Test', () => {
  it('renders AccountDisclaimer and AdminDetails components', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            partyID: 'PTY456',
            accountID: 'ACC123',
            accountNumber: 'AN456'
          }
        }
      }
    });

    render(
      <Provider store={store}><InternetBundlesNetDetails /></Provider>
    );

    // Check AccountDisclaimer component
    expect(screen.getByTestId('AccountDisclaimerMock')).toBeInTheDocument();

    // Check AdminDetails component
    expect(screen.getByTestId('AdminDetailsMock')).toBeInTheDocument();
  });
});