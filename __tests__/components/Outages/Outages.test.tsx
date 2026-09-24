import { render, screen } from '@testing-library/react';
import Outages from '../../../src/app/components/Outages/index';

// Mock OutagesDates component
jest.mock('../../../src/app/components/Outages/OutagesDates', () => () => (
  <div data-testid="OutagesDatesMock">OutagesDatesMock</div>
));

// Mock OutagesSearchPanel component
jest.mock('../../../src/app/components/Outages/OutagesSearchPanel', () => () => (
  <div data-testid="OutagesSearchPanelMock">OutagesSearchPanelMock</div>
));

describe('Outages Integration Test', () => {
  it('renders OutagesDates and OutagesSearchPanel components', () => {
    render(<Outages />);
    // Check OutagesDates component
    expect(screen.getByTestId('OutagesDatesMock')).toBeInTheDocument();
    // Check OutagesSearchPanel component
    expect(screen.getByTestId('OutagesSearchPanelMock')).toBeInTheDocument();
  });
});