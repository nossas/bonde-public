import gql from 'graphql-tag';

import { client } from '../../../apis/graphql';

const query = gql`
  query ($widget_id: Int!) {
    form_entries_aggregate(where: { widget_id: { _eq: $widget_id } }) {
      aggregate {
        count
      }
    }
  }
`;

const FormCounter = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { data } = await client.query({
      query,
      variables: { widget_id: req.body.widget_id },
      fetchPolicy: 'network-only',
    });
    return res.status(200).json({ data: { count: data.form_entries_aggregate.aggregate.count } });
  }
  return res.status(400);
};

export default FormCounter;
