import React from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
} from '@folio/stripes/components';

import { useNavigation } from '../hooks';

export const ExportJob = ({ uuid }) => {
  const { navigateToJobs } = useNavigation();

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      onClose={navigateToJobs}
    >
      Job details {uuid}
    </Pane>
  );
};

ExportJob.propTypes = {
  uuid: PropTypes.string.isRequired,
};
