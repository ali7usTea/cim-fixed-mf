import { render, screen } from '@testing-library/react';
import HypoLinesPanel from '../../../src/app/components/PABXDetails/HypoLinesPanel';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock DataPanel component
jest.mock('cim-ui-components', () => ({
  DataPanel: ({
    headerTitle,
    ...props
  }: any) => (
    <div data-testid={headerTitle} {...props}>
      {headerTitle}
    </div>
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

describe('HypoLinesPanel Integration Test', () => {
  it('renders DataPanel with Hypo Lines Inquiry header', () => {
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
      <Provider store={store}><HypoLinesPanel /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Hypo Lines Inquiry')).toBeInTheDocument();
  });
});