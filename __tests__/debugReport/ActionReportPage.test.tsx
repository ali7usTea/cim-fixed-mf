import { render, screen } from '@testing-library/react';
import ActionReportPage from '../../src/app/debugReport/page';

// Mock ActionReport and DataPanel components
jest.mock('cim-action-report', () => ({
  ActionReport: ({ refId, proxyURL, actionCode }: any) => (
    //@ts-ignore
    <div data-testid="action-report" refId={refId} proxyURL={proxyURL} actionCode={actionCode}></div>
  ),
}));

jest.mock('cim-ui-components', () => ({
  DataPanel: ({ headerTitle, viewLayout, api }: any) => (
    //@ts-ignore
    <div data-testid={headerTitle} viewLayout={viewLayout} api={api}></div>
  ),
}));

// Mock proxyURL
jest.mock('../../src/utils/lib/proxyAPI', () => ({
  proxyURL: 'http://mock-api'
}));

// Mock useSearchParams
const mockSearchParams = new URLSearchParams('query=testQuery&refId=123&layout=table');
jest.mock('react-router', () => ({
  useSearchParams: () => [mockSearchParams],
}));

describe('ActionReportPage Integration Test', () => {
  it('renders ActionReport and DataPanel with correct props', () => {
    render(<ActionReportPage />);

    // Check ActionReport is rendered
    expect(screen.getByTestId('action-report')).toBeInTheDocument();

    // Check DataPanel is rendered with correct header
    expect(screen.getByTestId('Output Result')).toBeInTheDocument();
  });
});