import queryString from 'query-string';
import { useInfiniteQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import {
  buildDateRangeQuery,
  CQL_OR_OPERATOR,
  makeQueryBuilder,
  ORGANIZATION_INTEGRATION_EXPORT_TYPES,
} from '@folio/stripes-acq-components';

import { EXPORT_JOB_TYPE_KEYS } from './constants';

const BULK_EDIT_TYPE = '"BULK_EDIT_IDENTIFIERS" or "BULK_EDIT_QUERY" or "BULK_EDIT_UPDATE"';

const ORDERS_JOB_TYPES = [
  EXPORT_JOB_TYPE_KEYS.ORDERS_CSV,
  EXPORT_JOB_TYPE_KEYS.ORDERS_EDI,
];
const ORDERS_JOB_TYPES_CQL_VALUE = ORGANIZATION_INTEGRATION_EXPORT_TYPES
  .map((type) => `"${type}"`)
  .join(CQL_OR_OPERATOR);

const buildOrdersJobTypeQuery = () => {};

const mapJobTypesToCql = (types) => {
  const value = types.map(v => {
    if (v === EXPORT_JOB_TYPE_KEYS.BULK_EDIT) {
      return BULK_EDIT_TYPE;
    } else return `"${v}"`;
  }).join(' or ');

  return `type==(${value})`;
};

const buildJobsQuery = makeQueryBuilder(
  'cql.allRecords=1',
  (query) => {
    return `name="*${query}*" or description="*${query}*"`;
  },
  'sortby name/sort.descending',
  {
    endTime: buildDateRangeQuery.bind(null, ['endTime']),
    startTime: buildDateRangeQuery.bind(null, ['startTime']),
    type: (query) => {
      const queryDict = {
        [EXPORT_JOB_TYPE_KEYS.BULK_EDIT]: `(${BULK_EDIT_TYPE})`,
        [EXPORT_JOB_TYPE_KEYS.ORDERS_CSV]: `(${ORDERS_JOB_TYPES_CQL_VALUE})`,
        [EXPORT_JOB_TYPE_KEYS.ORDERS_EDI]: `(${ORDERS_JOB_TYPES_CQL_VALUE})`,
      };

      if (Array.isArray(query)) {
        return mapJobTypesToCql(query);
      } else {
        return `type==${queryDict[query] ?? query}`;
      }
    },
  },
  {
    jobId: 'name',
  },
);

export const useExportJobsQuery = (search, pagination, filters) => {
  const ky = useOkapiKy();

  const {
    fetchNextPage,
    isLoading,
    data = {},
  } = useInfiniteQuery({
    queryKey: ['ui-export-manager', 'export-jobs', search],
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: pagination.limit,
          offset: pagination.offset,
          query: buildJobsQuery(queryString.parse(search)),
        },
      };

      const response = await ky.get('data-export-spring/jobs', kyOptions).json();

      return { ...response };
    },
    enabled: !![...Object.values(filters)].filter(Boolean).length,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const pages = data.pages || [];

  return {
    loadMore: fetchNextPage,
    isLoading,
    exportJobs: pages.reduce((acc, page) => {
      if (!page.jobRecords) {
        return acc;
      }

      return acc.concat(page.jobRecords);
    }, []),
    totalCount: pages[0]?.totalRecords,
  };
};
