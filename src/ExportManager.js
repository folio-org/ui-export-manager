import React from 'react';
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import { ExportJobs } from './ExportJobs';

export const ExportManager = () => {
  return (
    <Switch>
      <Route
        exact
        component={ExportJobs}
        path="/export-manager/jobs"
      />

      <Route
        exact
        component={ExportJobs}
        path="/export-manager/jobs/:id"
      />

      <Route
        path="/"
        render={() => {
          return <Redirect to="/export-manager/jobs" />;
        }}
      />
    </Switch>
  );
};
