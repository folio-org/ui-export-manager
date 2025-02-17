import queryString from 'query-string';
import { useInfiniteQuery } from 'react-query';

import { useNamespace, useOkapiKy } from '@folio/stripes/core';
import {
  buildDateRangeQuery,
  CQL_AND_OPERATOR,
  CQL_OR_OPERATOR,
  makeQueryBuilder,
  ORGANIZATION_INTEGRATION_EXPORT_TYPES,
} from '@folio/stripes-acq-components';

import { EXPORT_FILE_TYPE } from '../common/constants';
import { EXPORT_JOB_TYPE_KEYS } from './constants';
import { areFilersEmpty } from '../common/helpers';

const AND_SEPARATOR = ` ${CQL_AND_OPERATOR} `;
const OR_SEPARATOR = ` ${CQL_OR_OPERATOR} `;
const BULK_EDIT_TYPE = '"BULK_EDIT_IDENTIFIERS" or "BULK_EDIT_QUERY" or "BULK_EDIT_UPDATE"';
const EDI_ORDERS_FILE_FORMAT_KEY = 'jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.fileFormat';

const ORDERS_JOB_TYPES_CQL_VALUE = ORGANIZATION_INTEGRATION_EXPORT_TYPES
  .map((t) => `"${t}"`)
  .join(` ${CQL_OR_OPERATOR} `);

const buildOrdersJobTypeQueryDict = (fileType) => ({
  type: `${ORDERS_JOB_TYPES_CQL_VALUE}`,
  [EDI_ORDERS_FILE_FORMAT_KEY]: `"${fileType}"`,
});

const typeQueryDict = {
  [EXPORT_JOB_TYPE_KEYS.BULK_EDIT]: { type: `${BULK_EDIT_TYPE}` },
  [EXPORT_JOB_TYPE_KEYS.ORDERS_CSV]: buildOrdersJobTypeQueryDict(EXPORT_FILE_TYPE.csv),
  [EXPORT_JOB_TYPE_KEYS.ORDERS_EDI]: buildOrdersJobTypeQueryDict(EXPORT_FILE_TYPE.edi),
};

/*
 * Function to build CQL query from an array of dictionaries (objects)
 */
const buildCqlQueryFromDicts = (arr) => {
  /* Group objects by their keys to optimize the CQL query */
  const grouped = arr.reduce((acc, obj) => {
    const key = Object.keys(obj)
      .sort((a, b) => a.localeCompare(b))
      .join('_');

    acc[key] = acc[key] || [];
    acc[key].push(obj);

    return acc;
  }, {});

  /* Transform grouped objects into CQL conditions */
  const cqlParts = Object.values(grouped).map((group) => {
    const uniqueConditions = group.reduce((acc, obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (!acc[key]) {
          acc[key] = new Set();
        }
        acc[key].add(value);
      });

      return acc;
    }, {});

    const conditions = Object.entries(uniqueConditions)
      .map(([key, values]) => `${key}==(${[...values].join(OR_SEPARATOR)})`)
      .join(AND_SEPARATOR);

    return `(${conditions})`;
  });

  return cqlParts.join(OR_SEPARATOR);
};

/*
 * Function to map job types to their CQL representation
*/
const mapJobTypesToCql = (types) => {
  const queryDicts = types.map((type) => typeQueryDict[type] ?? { type });

  return buildCqlQueryFromDicts(queryDicts);
};

const buildJobsQuery = makeQueryBuilder(
  'cql.allRecords=1',
  (query) => `name="*${query}*" or description="*${query}*"`,
  'sortby name/sort.descending',
  {
    endTime: buildDateRangeQuery.bind(null, ['endTime']),
    startTime: buildDateRangeQuery.bind(null, ['startTime']),
    type: (query) => mapJobTypesToCql(Array.isArray(query) ? query : [query]),
  },
  {
    jobId: 'name',
  },
);

export const useExportJobsQuery = (search, pagination, filters) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'export-jobs' });
  const filtersEmpty = areFilersEmpty(filters);

  const {
    fetchNextPage,
    isLoading,
    isFetching,
    data = {},
  } = useInfiniteQuery({
    queryKey: [namespace, search],
    queryFn: async ({ signal }) => {
      const kyOptions = {
        signal,
        searchParams: {
          limit: pagination.limit,
          offset: pagination.offset,
          query: buildJobsQuery(queryString.parse(search)),
        },
      };

      return ky.get('data-export-spring/jobs', kyOptions).json();
    },
    keepPreviousData: !filtersEmpty,
    enabled: !filtersEmpty,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const pages = data.pages || [];

  return {
    loadMore: fetchNextPage,
    isFetching,
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
