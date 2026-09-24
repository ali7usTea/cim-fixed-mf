import { render, screen } from '@testing-library/react';
import OutagesSearchPanel from '../../../src/app/components/Outages/OutagesSearchPanel';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock DataPanel component
jest.mock('cim-ui-components', () => ({
  DataPanel: ({
    headerTitle,
    children,
    ...props
  }: any) => (
    <div data-testid={headerTitle} {...props}>
      {headerTitle}
      {children}
    </div>
  ),
  Button: ({ children, ...props }: any) => (
    <button {...props} data-testid="search-button">{children}</button>
  ),
  CalendarInput: ({ value, onChange, ...props }: any) => (
    <input
      type="date"
      value={value?.toISOString().split('T')[0]}
      onChange={e => onChange && onChange(new Date(e.target.value))}
      {...props}
      data-testid={props.id}
    />
  ),
  RadioGroup: ({ children, ...props }: any) => (
    <div data-testid="radio-group" {...props}>{children}</div>
  ),
  RadioGroupItem: ({ value, id, ...props }: any) => (
    <input type="radio" value={value} id={id} {...props} data-testid={id} />
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

describe('OutagesSearchPanel Integration Test', () => {
  it('renders DataPanel with Outages Search Panel header and search controls', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            partyID: 'PTY123',
            noOfRecords: 10,
            debugReport: true
          }
        }
      }
    });

    render(
      <Provider store={store}><OutagesSearchPanel /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Outages Search Panel')).toBeInTheDocument();

    // Check CalendarInput controls
    expect(screen.getByTestId('sdate')).toBeInTheDocument();
    expect(screen.getByTestId('edate')).toBeInTheDocument();

    // Check RadioGroup and RadioGroupItem controls
    expect(screen.getByTestId('radio-group')).toBeInTheDocument();
    expect(screen.getByTestId('party')).toBeInTheDocument();
    expect(screen.getByTestId('account')).toBeInTheDocument();

    // Check Search Button
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toHaveTextContent('Search');
  });
});