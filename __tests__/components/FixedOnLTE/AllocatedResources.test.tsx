import { render, screen } from '@testing-library/react';
import AllocatedResources from '../../../src/app/components/FixedOnLTE/AllocatedResources';
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

// Mock usePermissionChecker
jest.mock('../../../src/app/hooks/usePermissionsChecker', () => ({
  usePermissionChecker: () => ({
    checkGroupPermissionExists: () => true
  })
}));

const mockStore = configureStore([]);

describe('AllocatedResources Integration Test', () => {
  it('renders DataPanel with correct header when permission is granted', () => {
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

    const selectedRow = {
      "GET_GSM_ACCOUNT_NUMBER": "GSM123",
      "GSM Account Number": "GSM123"
    };

    render(
      //@ts-ignore
      <Provider store={store}><AllocatedResources selectedRow={selectedRow} /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('Allocated Resources')).toBeInTheDocument();
  });
});