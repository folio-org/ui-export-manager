import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  CommandList,
  defaultKeyboardShortcuts,
} from '@folio/stripes/components';
import { TitleManager } from '@folio/stripes/core';
import { Settings } from '@folio/stripes/smart-components';

import { JobsSettings } from './JobsSettings';

const pages = [
  {
    component: JobsSettings,
    label: <FormattedMessage id="ui-export-manager.settings.jobs" />,
    route: 'jobs',
    perm: 'ui-export-manager.settings.view',
  },
];

const ExportManagerSettings = (props) => {
  const intl = useIntl();

  return (
    <TitleManager page={intl.formatMessage({ id: 'ui-export-manager.settings.title' })}>
      <CommandList commands={defaultKeyboardShortcuts}>
        <Settings
          {...props}
          pages={pages}
          paneTitle={<FormattedMessage id="ui-export-manager.meta.title" />}
        />
      </CommandList>
    </TitleManager>
  );
};

export default ExportManagerSettings;
