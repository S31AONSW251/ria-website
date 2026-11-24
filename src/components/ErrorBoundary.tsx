import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  /** Rendered instead of the children when something throws. */
  fallback?: ReactNode
  /** Short label used in the console warning. */
  label?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Contains rendering failures so a single optional section can never blank the
 * whole page. Used around the route tree and around non-essential sections.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `[AION] ${this.props.label ?? 'Component'} failed to render.`,
      error,
      info.componentStack,
    )
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }

    return this.props.children
  }
}

/** Error boundary that quietly removes a non-essential section on failure. */
export function SectionBoundary({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return (
    <ErrorBoundary label={label} fallback={null}>
      {children}
    </ErrorBoundary>
  )
}

/** Visible fallback for a page-level render failure. */
export function PageFallback() {
  return (
    <section className="page-hero error-fallback" role="alert">
      <div className="container">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="page-title">This section could not be displayed.</h1>
        <p className="page-intro">
          The rest of the site is still available. Reload the page, or continue
          from the AION home page.
        </p>
        <div className="download-hero-actions">
          <a href="/" className="btn btn-primary btn-lg">
            Back to AION
          </a>
          <a href="/product" className="btn btn-secondary btn-lg">
            Explore RIA
          </a>
        </div>
      </div>
    </section>
  )
}
