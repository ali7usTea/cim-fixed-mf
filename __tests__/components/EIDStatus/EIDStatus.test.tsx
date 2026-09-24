import { render, screen } from '@testing-library/react';
import EIDStatus from '../../../src/app/components/EIDStatus';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock cim-ui-components
jest.mock('cim-ui-components', () => ({
  DataPanel: ({
    headerTitle,
    rowExpansionTemplate,
    ...props
  }: any) => (
    <div data-testid={headerTitle}>
      {/* Simulate row expansion rendering */}
      {rowExpansionTemplate &&
        rowExpansionTemplate({
          'GetEidDetailsByAccountNo.SUB_EID': 'EID123'
        })}
    </div>
  ),
}));

// Mock proxyURL and debugReportURL 
jest.mock('../../../src/utils/lib/proxyAPI', () => ({
  proxyURL: 'http://mock-api',
  debugReportURL: 'http://mock-debug'
}));

// Mock usePermissionChecker  
jest.mock('../../../src/app/hooks/usePermissionsChecker', () => ({
  usePermissionChecker: () => ({
    checkGroupPermissionExists: (group: string) => true
  })
}));

const mockStore = configureStore([]);

describe('EIDStatus Integration Test', () => {
  it('renders main DataPanel and nested DataPanel in row expansion', () => {
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
      <Provider store={store}><EIDStatus /></Provider>
    );

    // Check main DataPanel header
    expect(screen.getByTestId('Etisalat ID Inquiry')).toBeInTheDocument();

    // Check nested DataPanel header from row expansion template
    expect(screen.getByTestId('Etisalat ID Flat Details')).toBeInTheDocument();
  });
});