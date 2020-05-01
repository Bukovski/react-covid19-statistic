import React from 'react';

import './error-boundary.style.css';


export default class ErrorBoundary extends React.Component {
  state = {
    hasErrored: false
  };
  
  static getDerivedStateFromError(error) {
    return { hasErrored: true }
  };
  
  componentDidCatch(error, errorInfo) {
    console.log(error);
  }
  
  render() {
    if (this.state.hasErrored) {
      return(
        <div className="errorImageOverlay">
          <div className="errorImageContainer" />
          <div className="errorImageText">Sorry this page is broken</div>
        </div>
      )
    }
    
    return this.props.children;
  }
}
