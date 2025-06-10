import React from 'react';
import {
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  ButtonGroup,
  Button,
} from '@folio/stripes/components';
import { IfInterface } from '@folio/stripes/core';

import { BE_INTERFACE } from '../../constants';
import { NAVIGATION_TABS } from './constants';

const Navigation = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const getTabStyle = tabId => (path.includes(`/export-manager/${tabId}`) ? 'primary' : 'default');
  const goToTab = (tabId) => history.push(`/export-manager/${tabId}`);

  return (
    <IfInterface name={BE_INTERFACE.organizations}>
      <ButtonGroup fullWidth>
        <Button
          onClick={() => goToTab(NAVIGATION_TABS.JOBS)}
          buttonStyle={getTabStyle(NAVIGATION_TABS.JOBS)}
        >
          <FormattedMessage id="ui-export-manager.navigation.all" />
        </Button>

        <Button
          onClick={() => goToTab(NAVIGATION_TABS.EDI_JOBS)}
          buttonStyle={getTabStyle(NAVIGATION_TABS.EDI_JOBS)}
        >
          <FormattedMessage id="ui-export-manager.navigation.organizations" />
        </Button>
      </ButtonGroup>
    </IfInterface>
  );
};

export default Navigation;
