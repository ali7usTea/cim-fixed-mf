import { render, screen } from '@testing-library/react';
import Elife from '../../../src/app/components/Elife/index';

// Mock all child components to render identifiable elements
jest.mock('../../../src/app/components/Elife/ACSDetails', () => () => <div data-testid="ACSDetails" />);
jest.mock('../../../src/app/components/Elife/AdslDetails', () => () => <div data-testid="AdslDetails" />);
jest.mock('../../../src/app/components/Elife/ELifeInterimDetails', () => () => <div data-testid="ELifeInterimDetails" />);
jest.mock('../../../src/app/components/Elife/IPTVDetail', () => () => <div data-testid="IPTVDetail" />);
jest.mock('../../../src/app/components/Elife/MPhone', () => () => <div data-testid="MPhone" />);
jest.mock('../../../src/app/components/Elife/PstnDetail', () => () => <div data-testid="PstnDetail" />);
jest.mock('../../../src/app/components/Elife/UMSDevice', () => () => <div data-testid="UMSDevice" />);
jest.mock('../../../src/app/components/Elife/UMSSubscription', () => () => <div data-testid="UMSSubscription" />);
jest.mock('../../../src/app/components/Elife/VirtualCPE', () => () => <div data-testid="VirtualCPE" />);
jest.mock('../../../src/app/components/Elife/STBAccountDetails', () => () => <div data-testid="STBAccountDetails" />);
jest.mock('../../../src/app/components/Elife/WebTVAccountDetails', () => () => <div data-testid="WebTVAccountDetails" />);

describe('Elife Integration Test', () => {
  it('renders all child components inside the main container', () => {
    render(<Elife />);
    expect(screen.getByTestId('PstnDetail')).toBeInTheDocument();
    expect(screen.getByTestId('AdslDetails')).toBeInTheDocument();
    expect(screen.getByTestId('IPTVDetail')).toBeInTheDocument();
    expect(screen.getByTestId('VirtualCPE')).toBeInTheDocument();
    expect(screen.getByTestId('UMSDevice')).toBeInTheDocument();
    expect(screen.getByTestId('UMSSubscription')).toBeInTheDocument();
    expect(screen.getByTestId('ACSDetails')).toBeInTheDocument();
    expect(screen.getByTestId('STBAccountDetails')).toBeInTheDocument();
    expect(screen.getByTestId('WebTVAccountDetails')).toBeInTheDocument();
    expect(screen.getByTestId('MPhone')).toBeInTheDocument();
    expect(screen.getByTestId('ELifeInterimDetails')).toBeInTheDocument();
  });
});