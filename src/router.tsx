
import React from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import App from './App';
import LogicalViewList from './pages/LogicalViewList';
import LogicalViewDetail from './pages/LogicalViewDetail';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/semantic-modeling/logical-views" replace /> },
      { 
        path: 'semantic-modeling/logical-views', 
        element: <LogicalViewList /> 
      },
      { 
        path: 'semantic-modeling/logical-views/:logicalViewId', 
        element: <LogicalViewDetail /> 
      },
      { path: '*', element: <div className="p-10">404 Not Found</div> }
    ]
  }
]);
