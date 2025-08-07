import { configureBondePhoneCall } from '@bonde/actions-components';


export const defaultPhoneCall = configureBondePhoneCall(process.env.NEXT_PUBLIC_PHONE_API_URL || "");