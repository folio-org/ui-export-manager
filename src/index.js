
import { lazy } from 'react';

const ExportManager = lazy(() => import('./ExportManager'));
const ExportManagerSettings = lazy(() => import('./settings/ExportManagerSettings'));

export default function ExportManagerRoot({ showSettings, ...props }) {
  if (showSettings) {
    return <ExportManagerSettings {...props} />;
  }

  return <ExportManager />;
}
