import getConfig from 'next/config';
import { configureBondePhoneCall } from '@bonde/actions-components';

const { publicRuntimeConfig } = getConfig();

export const defaultPhoneCall = configureBondePhoneCall(publicRuntimeConfig.phoneApiUrl || "");