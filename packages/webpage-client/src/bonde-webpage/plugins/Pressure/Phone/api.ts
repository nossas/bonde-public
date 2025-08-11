import getConfig from 'next/config';
import { configureBondePhoneCall } from '@bonde/actions-components';

const { publicRuntimeConfig } = getConfig();

console.log("publicRuntimeConfig", publicRuntimeConfig);

export const defaultPhoneCall = configureBondePhoneCall(publicRuntimeConfig.phoneApiUrl || "");