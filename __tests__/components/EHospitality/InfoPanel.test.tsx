import { render, screen } from '@testing-library/react';
import InfoPanel from '../../../src/app/components/EHospitality/InfoPanel';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock cim-ui-components
jest.mock('cim-ui-components', () => ({
  DataPanel: ({ headerTitle, leadingColumns, ...props }: any) => (
    <div data-testid={headerTitle}>
      {leadingColumns && leadingColumns.map((col: any, idx: number) => (
        <div key={idx} data-testid={`leading-column-${col.title}`}>
          {col.component({ row: { id: 'row1' } })}
        </div>
      ))}
    </div>
  ),
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
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

describe('InfoPanel Integration Test', () => {
  it('renders DataPanel with correct header and Download button', () => {
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
      <Provider store={store}><InfoPanel /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Project Document Details')).toBeInTheDocument();

    // Check Download button in leading column
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});