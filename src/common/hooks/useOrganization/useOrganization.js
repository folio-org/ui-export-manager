import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { VENDORS_API } from '@folio/stripes-acq-components';

export const useOrganization = (id) => {
  const ky = useOkapiKy();

  const { isLoading, data } = useQuery(
    ['ui-organizations', 'organization', id],
    () => ky.get(`${VENDORS_API}/${id}`).json(),
    { enabled: Boolean(id) },
  );

  return ({
    organization: data,
    isLoading,
  });
};
