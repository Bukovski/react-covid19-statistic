import React from 'react';

import "./is-loading.style.css";


const IsLoading = ({ isLoading, children }) => {
  return isLoading ? (
    <div className="spinner-overlay">
      <div className="spinner-container" />
    </div>
  ) : (
    children
  );
};


export default IsLoading;
