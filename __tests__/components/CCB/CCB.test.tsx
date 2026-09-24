import React from 'react';
import { render, screen } from '@testing-library/react';
import CCB from '../../../src/app/components/CCB';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock cim-ui-components
jest.mock('cim-ui-components', () => ({
  DataPanel: ({ headerTitle, ...props }: any) => (
    <div data-testid={headerTitle} {...props}></div>
  ),
}));

// Mock proxyURL
jest.mock('../../../utils/lib/proxyAPI', () => ({
  proxyURL: 'http://mock-api'
}));

// Mock usePermissionChecker
jest.mock('../../hooks/usePermissionsChecker', () => ({
  usePermissionChecker: () => ({
    checkGroupPermissionExists: () => true
  })
}));

const mockStore = configureStore([]);

describe('CCB Integration Test', () => {
  it('renders DataPanel with correct header when permission is granted', () => {
    // Mock initial Redux state
    const store = mockStore({
      customerslice: {
        Customers: {
          'customer1': {
            debugReport: true,
            EID: 'eid123',
            accountNumber: 'acc456',
            accountID: 'acc789'
          }
        }
      }
    });

    render(
      <Provider store={store}><CCB /></Provider>
    );

    // Check DataPanel header
    expect(screen.getByTestId('CCB')).toBeInTheDocument();
  });
});