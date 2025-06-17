import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
        hasError: false,
        error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
        hasError: true,
        error: error
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Caught unexpected error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
            <h4>ErrorBoundary reported something went wrong:</h4>
            <p>Error: {this.state.error?.message ?? "N/A"}</p>
        </>
    )
    }

    return this.props.children;
  }
}