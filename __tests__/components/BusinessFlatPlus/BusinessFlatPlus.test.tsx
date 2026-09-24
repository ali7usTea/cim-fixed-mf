import { render, screen, fireEvent } from '@testing-library/react';
import BusinessFlatPlus from '../../../src/app/components/BusinessFlatPlus';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock cim-ui-components
jest.mock('cim-ui-components', () => ({
  DataPanel: ({ headerTitle, children }: any) => (
    <div data-testid={headerTitle}>{children}</div>
  ),
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

// Mock DesktopIcon 
jest.mock('../../../src/app/icons/DesktopIcon', () => ({
  DesktopIcon: ({ className }: any) => <span data-testid="desktop-icon" className={className} />,
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

describe('BusinessFlatPlus Integration Test', () => {
  it('renders and interacts correctly', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            accountID: 'acc123',
            'GetBusinessFlatPlusDetails.CCID': 'ccid456'
          }
        }
      }
    });

    render(
      <Provider store={store}><BusinessFlatPlus /></Provider>
    );

    // Check main DataPanel header
    expect(screen.getByTestId('Voice Usage Plan Details')).toBeInTheDocument();

    // Check DesktopIcon button exists
    const desktopIcon = screen.getByTestId('desktop-icon');
    expect(desktopIcon).toBeInTheDocument();

    // Simulate clicking the DesktopIcon button
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // After selection, Corporate Customer DataPanel should appear
    expect(screen.getByTestId('Corporate Customer Voice Usage Plan Details')).toBeInTheDocument();
  });
});