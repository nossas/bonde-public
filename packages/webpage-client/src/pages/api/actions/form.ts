import { formEntry } from '../../../activists';
import { applyCors } from '../../../apis/cors';

export type Args = {
  fields: string;
  widget_id: number;
};

interface Request {
  method: 'POST' | string;
  headers: { origin?: string };
  body: Args;
}

interface Response {
  status: (_: number) => any | { json: (vars: any) => any };
  setHeader: (name: string, value: string) => any;
  end: () => any;
}

const ActionForm = async (req: Request, res: Response) => {
  if (applyCors(req, res)) return;

  if (req.method === 'POST') {
    const result = await formEntry(req.body);
    return res.status(200).json(result);
  }

  return res.status(200).json({ message: 'request GET' });
};

export default ActionForm;
