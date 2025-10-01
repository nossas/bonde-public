import gql from 'graphql-tag';

import type { Filter, WidgetGraphQL } from './types';
import { client as GraphQLAPI } from '.';

const asyncFilterWidgetGraphql = async ({ slug, custom_domain }: any) => {
  // dispatch({ type: 'FILTER_WIDGETS_REQUEST' });

  const filter: Filter = {};
  if (slug) filter.slug = { _eq: slug };
  if (custom_domain) filter.custom_domain = { _eq: custom_domain };

  return GraphQLAPI.query({
    query: gql`
      query ($filter: mobilizations_bool_exp!) {
        widgets(where: { block: { mobilization: $filter, hidden: {_neq: true} } }, order_by: { id: asc }) {
          id
          kind
          goal
          settings
          block_id
          created_at
          updated_at
          sm_size
          md_size
          lg_size

          actions_count: analyze_activist_actions_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `,
    variables: { filter },
    fetchPolicy: "no-cache"
  })
  .then(({ data }: { data: { widgets: WidgetGraphQL[] } }) => {
    // dispatch({
    //   type: 'FILTER_WIDGETS_SUCCESS',
    //   payload: data.widgets.map((w: WidgetGraphQL) => ({
    //     ...w,
    //     form_entries_count: w.actions_count.aggregate.count,
    //     donations_count: w.actions_count.aggregate.count,
    //     count: w.actions_count.aggregate.count
    //   }))
    // });
    return Promise.resolve({ widgets: data.widgets.map((w: WidgetGraphQL) => ({
      ...w,
      form_entries_count: w.actions_count.aggregate.count,
      donations_count: w.actions_count.aggregate.count,
      count: w.actions_count.aggregate.count
    }))})
  })
  .catch((err: any) => {
    // dispatch({ type: 'FILTER_WIDGETS_FAILURE', payload: err });
    console.log('failed', err);
    return Promise.reject(err);
  })
}

export default asyncFilterWidgetGraphql;