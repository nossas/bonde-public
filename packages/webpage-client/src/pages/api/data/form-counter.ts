import gql from 'graphql-tag';

import { client } from '../../../apis/graphql';
import { applyCors } from '../../../apis/cors';

const query = gql`
  query ($widget_id: Int!) {
    widgets(where: { id: { _eq: $widget_id } }) {
      form_entries_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const FormCounter = async (req: any, res: any) => {
  if (applyCors(req, res)) return;

  if (req.method === 'POST') {
    const { data } = await client.query({
      query,
      variables: { widget_id: req.body.widget_id },
      fetchPolicy: 'network-only',
    });
    return res.status(200).json(data.widgets[0]?.form_entries_aggregate.aggregate.count ?? 0);
  }

  return res.status(400);

};

export default FormCounter;
