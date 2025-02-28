import graphql, { Response } from './request-graphql';

export type Args = {
  name: string
  state: string
  email: string
  whatsapp: number
  widget_id: number
  team?: String
};

export const plipQuery = `
mutation Plip($activist: ActivistInput!, $widget_id: Int!, $input: PlipInput!) {
  create_plip(widget_id: $widget_id, activist: $activist, input: $input) {
      data
    }
  }
`;

const plip = async ({
  name,
  email,
  state,
  widget_id,
  whatsapp,
  team
}: Args): Promise<any> => {

  try {
    const variables = {
      activist: {
        name,
        email,
        state,
        phone: whatsapp
      },
      input: {
        name,
        state,
        whatsapp,
        email,
        expected_signatures: 10,
        team
      },
      widget_id,
    };

    const query = JSON.stringify({ query: plipQuery, variables });

    const { data, errors }: Response = await graphql(query);

    if (errors) {
      throw new Error('request_graphql_error');
    }
    return data;
  } catch (err) {
    // TODO: Show popup window error
    console.log('err', err);
  }
};

export default plip;