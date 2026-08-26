import gql from 'graphql-tag';

import { client } from '../../../apis/graphql';

const query = gql`
  query ($widget_id: Int!) {
    activist_pressures_aggregate(where: { widget_id: { _eq: $widget_id } }) {
      aggregate {
        count
      }
    }
  }
`;

const PressureCounter = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { data } = await client.query({
      query,
      variables: { widget_id: req.body.widget_id },
      fetchPolicy: 'network-only',
    });
    return res.status(200).json({ data: { count: data.activist_pressures_aggregate.aggregate.count } });
  }
  return res.status(400);
};

export default PressureCounter;
