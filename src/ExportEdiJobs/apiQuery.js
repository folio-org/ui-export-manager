import queryString from 'query-string';
import { useInfiniteQuery } from 'react-query';

import {
  useOkapiKy,
  useNamespace,
} from '@folio/stripes/core';
import {
  buildDateRangeQuery,
  CQL_OR_OPERATOR,
  makeQueryBuilder,
  ORGANIZATION_INTEGRATION_EXPORT_TYPES,
} from '@folio/stripes-acq-components';
import { getDataByFiltersState } from '../common/helpers';

const buildIntegrationTypesCqlValue = (type) => {
  if (!Array.isArray(type)) return type;

  const value = type
    .map((t) => `"${t}"`)
    .join(` ${CQL_OR_OPERATOR} `);

  return `(${value})`;
};

const buildJobsQuery = makeQueryBuilder(
  `type=${buildIntegrationTypesCqlValue(ORGANIZATION_INTEGRATION_EXPORT_TYPES)}`,
  (query) => {
    return `name="*${query}*" or description="*${query}*"`;
  },
  'sortby name/sort.descending',
  {
    endTime: buildDateRangeQuery.bind(null, ['endTime']),
    startTime: buildDateRangeQuery.bind(null, ['startTime']),
    vendorId: (id) => `jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.vendorId=="${id}"`,
    exportConfigId: (id) => `jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.exportConfigId=="${id}"`,
    integrationType: (type) => (
      `jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.integrationType==${buildIntegrationTypesCqlValue(type)}`
    ),
  },
  {
    jobId: 'name',
    exportMethod: 'jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.configName',
  },
);

export const useExportEdiJobsQuery = (search, pagination, filters) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'export-edi-jobs' });
  const areFiltersPristine = Object.keys(filters).length === 0;

  const {
    fetchNextPage,
    isLoading,
    isFetching,
    data = {},
    refetch,
  } = useInfiniteQuery({
    queryKey: [namespace, search],
    queryFn: async ({ signal }) => {
      const kyOptions = {
        signal,
        searchParams: {
          limit: pagination.limit,
          offset: pagination.offset,
          query: buildJobsQuery({
            type: ORGANIZATION_INTEGRATION_EXPORT_TYPES,
            ...queryString.parse(`${search}`),
          }),
        },
      };

      return ky.get('data-export-spring/jobs', kyOptions).json();
    },

    keepPreviousData: true,
    enabled: !areFiltersPristine,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (response) => getDataByFiltersState(response, filters),
  });

  const pages = data.pages || [];

  return {
    loadMore: fetchNextPage,
    isLoading,
    isFetching,
    exportEdiJobs: pages.reduce((acc, page) => {
      if (!page.jobRecords) {
        return acc;
      }

      return acc.concat(page.jobRecords);
    }, []),
    totalCount: pages[0]?.totalRecords,
    refetch,
  };
};
