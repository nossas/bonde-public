// import type { SetState } from '@bonde/actions-components'
// import type { PhoneActionPayload, PhoneCallState } from '@bonde/actions-components'

// import { GET, POST } from '@bonde/actions-components';
import { isFinalState } from '@bonde/actions-components';

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json()
  if (response.ok) {
    return data as T
  }
  else {
    console.error(data)
    throw new Error(data.detail)
  }
}

export async function GET<Ret, Params extends Record<string, unknown> = Record<string, unknown>>(url: URL, params: Params): Promise<Ret> {
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value))
  }
  const res = await fetch(url, {
    method: 'GET',
  })
  return handleResponse<Ret>(res)
}

export async function POST<Ret, Body = unknown>(url: URL, body: Body): Promise<Ret> {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
  return handleResponse<Ret>(res)
}

export interface PhoneCallRequest {
  activist_number: string
  target_number: string
  widget_id: number
}

export interface PhoneCallResponse {
  call: string
  status: any
}

async function startTwilioCall(baseUrl: string, payload: any): Promise<PhoneCallResponse> {
  const body: PhoneCallRequest = {
    activist_number: payload.activist.phone,
    target_number: payload.input.custom_fields.target.phone,
    widget_id: payload.widget_id,
  }
  console.log("{body}", { body });
  return POST<PhoneCallResponse>(new URL('/phone/call', baseUrl), body)
}

async function pollTwilioCallStatus(baseUrl: string, call: string): Promise<PhoneCallResponse> {
  return GET<PhoneCallResponse>(new URL('/phone/status', baseUrl), { call })
}

export function configureBondePhoneCall(baseUrl: string): any {
  return async function bondePhoneCall(payload, setState) {
    console.log("{payload,setState}", { payload, setState });
    const { call, status } = await startTwilioCall(baseUrl, payload)
    setState(status)

    const interval = window.setInterval(async () => {
      const { status } = await pollTwilioCallStatus(baseUrl, call)
      setState(status)
      if (isFinalState(status)) {
        clearInterval(interval)
      }
    }, 2000)
  }
}

export const defaultPhoneCall = configureBondePhoneCall('https://701266c8de66.ngrok-free.app')