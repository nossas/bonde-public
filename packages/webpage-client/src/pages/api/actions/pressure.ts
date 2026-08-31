import { pressure } from '../../../activists';
import { applyCors } from '../../../apis/cors';

export type Activist = {
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
  state?: string;
};

export type Mail = {
  disableEditField?: 's' | 'n';
  subject: string;
  body: string;
};

export type Payload = {
  activist: Activist;
  targets_id?: string;
  mail: Mail;
  form_data: any;
};

export type Widget = {
  id: number;
  settings: any;
};

export interface Args {
  payload: Payload;
  widget: Widget;
}

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

const ActionPressure = async (req: Request, res: Response) => {
  if (applyCors(req, res)) return;

  if (req.method === 'POST') {
    const result = await pressure(req.body);
    return res.status(200).json(result);
  }

  return res.status(200).json({ message: 'request GET' });
};

export default ActionPressure;
