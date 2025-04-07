import getConfig from 'next/config';
import graphql from "../../../activists/request-graphql";


let endpoint: string;
    
if (process.env.NODE_ENV !== 'test') {
  const { publicRuntimeConfig } = getConfig();
  endpoint = publicRuntimeConfig.domainApiGraphql || "https://api-graphql.staging.bonde.org/v1/graphql"
};

interface Input {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  widget_id: number;
  custom_fields?: any
}


interface Request {
  method: 'POST' | string;
  body: Input;
}

interface Response {
  status: (_: number) => any | { json: (vars: any) => any };
}


const query = `
  mutation WidgetActionCreate($activist: ActivistInput!, $widget_id: Int!, $input: WidgetActionInput!) {
    create_widget_action(activist: $activist, widget_id: $widget_id, input: $input) {
      data
    }
  }
`;

export default async (req: Request, res: Response) => {
  if (req.method === "POST") {

    const { custom_fields, widget_id, ...activist } = req.body
    const variables = {
      activist: { ...activist, name: `${activist.first_name} ${activist.last_name}` },
      widget_id,
      input: { custom_fields }
    }

    const { data, errors }: any = await (await fetch(endpoint, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ query, variables })
    })).json();

    // console.log({ data, errors });

    if (errors) {
      return res.status(400).json(errors);
    }

    return res.status(201).json(data.create_widget_action.data);
  }

  return res.status(405).json({ message: "GET Method Not Allowed" });
}