import { render, screen } from '@testing-library/react';
import FixedOnLTE from '../../../src/app/components/FixedOnLTE/index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock AllocatedResources and FixedOnLTEPanel
jest.mock('../../../src/app/components/FixedOnLTE/AllocatedResources', () => ({
  __esModule: true,
  default: ({ selectedRows }: any) => (
    <div data-testid="Allocated Resources" selectedRows={selectedRows}></div>
  ),
}));

jest.mock('../../../src/app/components/FixedOnLTE/FixedOnLTEPanel', () => ({
  __esModule: true,
  default: ({ onDataLoaded }: any) => (
    //@ts-ignore
    <div data-testid="Fixed On LTE" onDataLoaded={onDataLoaded}></div>
  ),
}));

const mockStore = configureStore([]);

describe('FixedOnLTE Integration Test', () => {
  it('renders FixedOnLTEPanel and AllocatedResources components', () => {
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
      <Provider store={store}><FixedOnLTE /></Provider>
    );

    // Check FixedOnLTEPanel header
    expect(screen.getByTestId('Fixed On LTE')).toBeInTheDocument();

    // Check AllocatedResources header
    expect(screen.getByTestId('Allocated Resources')).toBeInTheDocument();
  });
});