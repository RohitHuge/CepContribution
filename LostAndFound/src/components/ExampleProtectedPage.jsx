import React from 'react';
import ProtectedRoute from './ProtectedRoute';

const ExampleProtectedPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>This is a Protected Page</h1>
        <p>Only authenticated users can see this content.</p>
      </div>
    </ProtectedRoute>
  );
};

export default ExampleProtectedPage;
