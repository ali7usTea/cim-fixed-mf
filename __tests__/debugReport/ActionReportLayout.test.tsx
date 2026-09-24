import React from 'react';
import { render, screen } from '@testing-library/react';
import ActionReportLayout from '../../src/app/debugReport/layout';

// Mock Loading component
jest.mock('../../src/app/components/Loading', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-fallback">Loading...</div>,
}));

describe('ActionReportLayout Integration Test', () => {
  it('renders children inside the layout', () => {
    render(
      <ActionReportLayout><div data-testid="child-content">Child Content</div></ActionReportLayout>
    );

    // Check that child content is rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders Loading fallback when Suspense is triggered', () => {
    // Simulate a lazy-loaded child component
    const LazyChild = React.lazy(() => Promise.resolve({
      default: () => <div data-testid="lazy-child">Lazy Child</div>
    }));

    render(
      <ActionReportLayout><LazyChild /></ActionReportLayout>
    );

    // Loading fallback should be visible initially
    expect(screen.getByTestId('loading-fallback')).toBeInTheDocument();
  });
});