import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null
    };
  }
  
  componentDidCatch(error) {
    this.setState({ error })
  }
  
  render() {
    if (this.state.errorInfo) {
      return (
        <div className="mt-40 text-center">
          <h3>Something went wrong.</h3>
        </div>
      );
    }
    return this.props.children;
  }  
}

export default ErrorBoundary;