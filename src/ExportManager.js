import React from 'react';
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import { useStripes } from '@folio/stripes/core';

import { BE_INTERFACE } from './common/constants';
import { ExportJobs } from './ExportJobs';
import { ExportEdiJobs } from './ExportEdiJobs';

const ExportManager = () => {
  const stripes = useStripes();

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
        path="/export-manager/edi-jobs"
        render={({ match }) => {
          if (!stripes.hasInterface(BE_INTERFACE.organizations)) {
            return <Redirect to="/export-manager/jobs" />;
          }

          return (
            <Switch>
              <Route
                exact
                component={ExportEdiJobs}
                path={`${match.url}`}
              />
              <Route
                exact
                component={ExportEdiJobs}
                path={`${match.url}/:id`}
              />
            </Switch>
          );
        }}
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

export default ExportManager;
