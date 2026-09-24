import { render, screen } from '@testing-library/react';
import EHospitality from '../../../src/app/components/EHospitality/index';

// Mock child components
jest.mock('../../../src/app/components/EHospitality/InfoPanel', () => () => <div data-testid="InfoPanel" />);
jest.mock('../../../src/app/components/EHospitality/AccountInfo', () => () => <div data-testid="AccountInfo" />);

describe('EHospitality Integration Test', () => {
  it('renders InfoPanel and AccountInfo components', () => {
    render(<EHospitality />);
    
    // Check InfoPanel is rendered
    expect(screen.getByTestId('InfoPanel')).toBeInTheDocument();
    
    // Check AccountInfo is rendered
    expect(screen.getByTestId('AccountInfo')).toBeInTheDocument();
    
    // Check parent container attributes
    const container = screen.getByTitle('E-Hospitality');
    expect(container).toHaveClass('flex', 'flex-col', 'gap-2');
  });
});