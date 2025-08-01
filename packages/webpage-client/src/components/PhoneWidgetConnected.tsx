import React from 'react';
import fetch from 'node-fetch';
import {
  PhonePressurePlugin,
  PressureAnalytics,
  FinishMessageCustom,
  PressureTellAFriend,
} from '../bonde-webpage';
import Utils from '../Utils';

const TWILIO_SERVICE_URL =
  process.env.NEXT_PUBLIC_TWILIO_CALL_URL || 'https://twilio-service.seudominio.org/call';

const PressurePhoneConnected = (props: any) =>
  <PhonePressurePlugin
    {...props}
    asyncFetchTargets={async (args: any) =>
      (
        await fetch('/api/data/targets', {
          method: 'post',
          body: JSON.stringify(args),
          headers: { 'Content-Type': 'application/json' }
        })
      ).json()
    }
    asyncFillWidget={async (args: any) =>
      (
        await fetch('/api/actions/pressure', {
          method: 'post',
          body: JSON.stringify(args),
          headers: { 'Content-Type': 'application/json' }
        })
      ).json()
    }
    analyticsEvents={PressureAnalytics}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: PressureTellAFriend,
        props: {
          imageUrl: Utils.imageUrl,
          href: Utils.getSharedPath(props.mobilization),
        },
      },
    }}
    twilio={{
      call: async (setState: (state: string) => void, payload: any) => {
        const { activist, input, widget_id } = payload;
        const { target } = input.custom_fields;

        try {
          console.log('Iniciando chamada via Twilio Service:', {
            activist,
            target,
            widget_id,
            serviceUrl: TWILIO_SERVICE_URL
          });

          const response = await fetch(TWILIO_SERVICE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              activist,
              target,
              widget_id
            }),
          });

          if (!response.ok) {
            throw new Error(`Erro ao conectar com o serviço Twilio (${response.status})`);
          }

          const result = await response.json();
          const callStatus = result.status || 'success';
          setState(callStatus);
        } catch (err) {
          console.error('Erro na chamada:', err);
          setState('fail');
        }
      },
      phonePressureCount: props.widget?.count || 0
    }}
  />
;

export default PressurePhoneConnected;
