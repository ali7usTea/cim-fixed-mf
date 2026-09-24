import { render, screen } from '@testing-library/react';
import ManagedServices from '../../../src/app/components/ManagedServices/index';

// Mock all child components
jest.mock('../../../src/app/components/ManagedServices/Main', () => () => <div data-testid="Main_ManagedServices">Main_ManagedServices</div>);
jest.mock('../../../src/app/components/ManagedServices/Gipvpn', () => () => <div data-testid="Gipvpn">Gipvpn</div>);
jest.mock('../../../src/app/components/ManagedServices/CPETechnicalDetails', () => () => <div data-testid="CPETechnicalDetails">CPETechnicalDetails</div>);
jest.mock('../../../src/app/components/ManagedServices/DataPortCustomerWAN_IP', () => () => <div data-testid="DataPortCustomerWAN_IP">DataPortCustomerWAN_IP</div>);
jest.mock('../../../src/app/components/ManagedServices/MRWANProv', () => () => <div data-testid="MRWANProv">MRWANProv</div>);
jest.mock('../../../src/app/components/ManagedServices/LanBroadcastSubnets', () => () => <div data-testid="LanBroadcastSubnets">LanBroadcastSubnets</div>);
jest.mock('../../../src/app/components/ManagedServices/MSSPortMgmtWAN_IP', () => () => <div data-testid="MSSPortMgmtWAN_IP">MSSPortMgmtWAN_IP</div>);
jest.mock('../../../src/app/components/ManagedServices/DeviceIPDetails', () => () => <div data-testid="DeviceIPDetails">DeviceIPDetails</div>);
jest.mock('../../../src/app/components/ManagedServices/FileUpload', () => () => <div data-testid="FileUpload">FileUpload</div>);
jest.mock('../../../src/app/components/ManagedServices/FromToIPAddressIDA', () => () => <div data-testid="FromToIPAddressIDA">FromToIPAddressIDA</div>);

describe('ManagedServices Integration Test', () => {
  it('renders all child panels/components', () => {
    render(<ManagedServices />);
    expect(screen.getByTestId('Main_ManagedServices')).toBeInTheDocument();
    expect(screen.getByTestId('Gipvpn')).toBeInTheDocument();
    expect(screen.getByTestId('CPETechnicalDetails')).toBeInTheDocument();
    expect(screen.getByTestId('DataPortCustomerWAN_IP')).toBeInTheDocument();
    expect(screen.getByTestId('MRWANProv')).toBeInTheDocument();
    expect(screen.getByTestId('LanBroadcastSubnets')).toBeInTheDocument();
    expect(screen.getByTestId('MSSPortMgmtWAN_IP')).toBeInTheDocument();
    expect(screen.getByTestId('DeviceIPDetails')).toBeInTheDocument();
    expect(screen.getByTestId('FileUpload')).toBeInTheDocument();
    expect(screen.getByTestId('FromToIPAddressIDA')).toBeInTheDocument();
  });

  it('renders container with correct title and class', () => {
    const { container } = render(<ManagedServices />);
    const div = container.querySelector('div[title="Managed Services"]');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('flex', 'flex-col', 'gap-2');
  });
});