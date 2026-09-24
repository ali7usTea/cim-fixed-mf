import { render, screen } from '@testing-library/react';
import PABXDetails from '../../../src/app/components/PABXDetails/index';

// Mock all child panel components
jest.mock('../../../src/app/components/PABXDetails/PABXPilotDetails', () => () => <div data-testid="PABXPilotDetails">PABXPilotDetails</div>);
jest.mock('../../../src/app/components/PABXDetails/HypoLinesPanel', () => () => <div data-testid="HypoLinesPanel">HypoLinesPanel</div>);
jest.mock('../../../src/app/components/PABXDetails/DIDRange', () => () => <div data-testid="DIDRange">DIDRange</div>);
jest.mock('../../../src/app/components/PABXDetails/DIDSummary', () => () => <div data-testid="DIDSummary">DIDSummary</div>);
jest.mock('../../../src/app/components/PABXDetails/DIDDetails', () => () => <div data-testid="DIDDetails">DIDDetails</div>);

describe('PABXDetails Integration Test', () => {
  it('renders all child panels inside the PABXDetails container', () => {
    render(<PABXDetails />);

    // Check for the presence of each child panel
    expect(screen.getByTestId('PABXPilotDetails')).toBeInTheDocument();
    expect(screen.getByTestId('HypoLinesPanel')).toBeInTheDocument();
    expect(screen.getByTestId('DIDRange')).toBeInTheDocument();
    expect(screen.getByTestId('DIDSummary')).toBeInTheDocument();
    expect(screen.getByTestId('DIDDetails')).toBeInTheDocument();

    // Check for the container div
    expect(screen.getByTitle('PABX Details')).toBeInTheDocument();
  });
});