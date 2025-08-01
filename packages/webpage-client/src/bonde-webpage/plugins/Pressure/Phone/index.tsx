import React from 'react';
import { PhonePressureForm } from "@bonde/actions-components";
import styled from 'styled-components';
import { defaultPhoneCall } from "./api";

type Settings = {
  main_color?: string;
  title_text?: string;
}

type Widget = {
  id: number;
  settings?: Settings;
}

type Props = {
  widget: Widget
}

export default function PhoneWidget({ widget }: Props) {
  const {
    main_color: mainColor,
    title_text: titleText,
  } = widget.settings || {};
  // const 
  console.log("{widget}", {widget});

  return (
    <Styled>
      {titleText && <h2 style={{ backgroundColor: mainColor }}>{titleText}</h2>}
      <PhonePressureForm
        widgetId={widget.id}
        action={defaultPhoneCall}
        mainColor={mainColor || "blue"}
        guideline="Olá, meu nome é [seu nome]. Estou ligando para pedir que [nome do alvo] faça [ação solicitada]. Essa decisão é muito importante porque [insira argumento principal]. Contamos com o apoio de vocês!"
        targets={[
          {
            name: "Igor",
            phone: "+55 31 98286-6512"
          }
        ]}
      />
    </Styled>
  );
}

const Styled = styled.div`
  font-family: "Nunito Sans", sans-serif;
  display: flex;
  flex-direction: column;
  background-color: white;

  h2 {
    margin: 0;
    padding: 1rem 0;
    text-align: center;
    color: white;
  }

  .bonde-phone-pressure-form form {
    display: flex;
    flex-direction: column;

    .bonde-action-field {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 1rem 2rem 0.5rem;
      border-bottom: 1px solid #eee;

      input {
        border: none;
      }
      
      label {
        line-height: 1.5;
        font-size: 0.75rem;
        font-weight: 600;
        color: #aaa;
      }
    }
    
    .bonde-action-field__error {
      position: absolute;
      right: 2rem;
      top: 1rem;
      font-size: 11px;
      font-weight: 600;
      line-height: 1.36;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: rgb(255, 9, 49);
    }

    .bonde-action-button {
      background-color: var(--bonde-action-brand-color);
      border: none;
      padding: 1rem 0;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
      margin-top: 1rem;
    }
  }
`

// import styled from '@emotion/styled';

// import { Count, Form, Targets } from '../components';
// import { Header } from '../styles';
// import {
//   parseTarget,
//   getEmailTarget,
//   arrayUtils,
//   getTargetList,
// } from '../utils';
// import CallingTargets from './CallingTargets';
// import PhoneFields from './PhoneFields';

// const PhoneFormStyled = styled.div`
//   .pressure-form {
//     overflow: hidden;
//     position: relative;
//     background-color: #ffffff;

//     & > div {
//       transition: left 0.5s ease;
//     }

//     .activist-form {
//       position: relative;
//       width: 100%;
//       left: 0;
//     }

//     .phone-calls {
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       top: 0;
//       left: 100%;
//       overflow-y: auto;
//     }

//     &.is-calling {
//       .activist-form {
//         left: -100%;
//       }
//       .phone-calls {
//         left: 0;
//       }
//     }

//     .form-group {
//       padding-top: 0.25rem;
//       padding-bottom: 0.25rem;

//       label,
//       input,
//       textarea {
//         font-size: 0.9rem;
//       }
//     }
//   }

//   @-webkit-keyframes ring {
//     0% {
//       transform: rotate(-30deg);
//     }
//     3% {
//       transform: rotate(30deg);
//     }
//     6% {
//       transform: rotate(-30deg);
//     }
//     9% {
//       transform: rotate(30deg);
//     }
//     12% {
//       transform: rotate(-30deg);
//     }
//     15% {
//       transform: rotate(30deg);
//     }
//     18% {
//       transform: rotate(-30deg);
//     }
//     21% {
//       transform: rotate(30deg);
//     }
//     24% {
//       transform: rotate(0deg);
//     }
//   }
//   .ring {
//     animation: ring 1s linear infinite alternate;
//   }
// `;

// /* TODO: Change static content by props
//  * - title
//  * - bgColor
//  */

// type Props = {
//   /* Below props are from root parent */
//   editable?: boolean;
//   mobilization: {
//     header_font?: string;
//     community_id?: string | number;
//   };
//   widget: {
//     id: number;
//     count?: number;
//     settings: {
//       main_color: string;
//       call_to_action?: string;
//       title_text: string;
//       button_text: string;
//       pressure_subject: string;
//       pressure_body: string;
//       disable_edit_field?: any;
//       finish_message_type?: string;
//       finish_message?: Record<any, any>;
//       finish_message_background?: string;
//       targets: string;
//       count_text?: string;
//       show_city?: string;
//       pressure_type: string | 'unique' | 'group';
//     };
//   };
//   block: {
//     scrollTopReached?: any;
//   };
//   overrides: {
//     FinishCustomMessage: {
//       component?: any;
//       props: any;
//     };
//     FinishDefaultMessage: {
//       component?: any;
//       props: any;
//     };
//   };
//   analyticsEvents: {
//     pressureIsFilled: () => void;
//   };
//   twilio: {
//     call: any;
//     observableQuery?: any;
//     phonePressureCount: number;
//     callTransition?: any;
//   };
// };

// const PhonePressure = ({
//   analyticsEvents,
//   widget,
//   mobilization,
//   block,
//   overrides,
//   twilio,
// }: Props) => {
//   const [targetsError, setTargetsError] = useState<Array<string>>([]);
//   const [showFinishMessage, toggleFinishMessage] = useState(false);
//   const [callManagement, setCalls] = useState<any[]>([]);

//   const { call, phonePressureCount, callTransition } = twilio;
//   // console.log('phonePressureCount', { phonePressureCount });
//   const {
//     main_color: mainColor,
//     call_to_action: callToAction,
//     title_text: titleText,
//     // Maybe `reply_email` is necessary...
//     // reply_email,
//     count_text: countText,
//     finish_message_type: finishMessageType,
//     targets,
//   } = widget.settings;

//   const {
//     FinishCustomMessage: { component: FinishCustomMessage, props: customProps },
//     FinishDefaultMessage: {
//       component: FinishDefaultMessage,
//       props: defaultProps,
//     },
//   } = overrides;

//   const targetList = getTargetList(targets) || [];

//   useEffect(() => {
//     if (!callTransition && targetList && targetList.length) {
//       const value = targetList.map((target: any) => ({
//         ...parseTarget(target),
//         attempts: 0,
//       }));
//       return setCalls(value);
//     }

//     if (callTransition && targetList && targetList.length) {
//       const value = callManagement.map((target, index) => {
//         const isCallToCurrentTarget =
//           target.value === callTransition.twilioCallTo;
//         const transition = isCallToCurrentTarget ? callTransition : {};
//         const { twilioCallTransitionStatus: status } = transition;
//         const isFailStatus = ['busy', 'failed', 'no-answer'].includes(status);

//         let { attempts } = callManagement[index];
//         if (isCallToCurrentTarget && isFailStatus) attempts++;

//         return { ...target, ...transition, attempts };
//       });
//       setCalls(value);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [callTransition]);

//   const handleSubmit = (data: any) => {
//     if (targetList.length < 1) {
//       return setTargetsError([
//         'Ops, você precisa selecionar pelo menos um alvo para poder pressionar',
//       ]);
//     }

//     // normalize phone number with + sign (e.g. +5511987654321)
//     data.phone = /^\+/.test(data.phone) ? data.phone : `+${data.phone}`;

//     setTargetsError([]);

//     return call(
//       {
//         widgetId: widget.id,
//         communityId: mobilization.community_id,
//         from: data.phone,
//         // get phone
//         to: getEmailTarget(arrayUtils.shuffle(targetList)[0]),
//       },
//       true
//     );
//   };

//   const finishPressure =
//     showFinishMessage && FinishCustomMessage && FinishDefaultMessage;

//   if (finishPressure)
//     return finishMessageType === 'custom' ? (
//       <FinishCustomMessage
//         mobilization={mobilization}
//         widget={widget}
//         {...customProps}
//       />
//     ) : (
//       <FinishDefaultMessage
//         mobilization={mobilization}
//         widget={widget}
//         {...defaultProps}
//       />
//     );

//   return (
//     <PhoneFormStyled id={`widget-${widget.id}`}>
//       {/* <div onKeyDown={e => e.stopPropagation()} /> */}
//       <Header backgroundColor={mainColor}>{callToAction || titleText}</Header>
//       <Targets targets={targetList} pressureType="phone" />
//       {callTransition ? (
//         <CallingTargets
//           addTwilioCallMutation={call}
//           buttonColor={mainColor}
//           toggleFinishMessage={toggleFinishMessage}
//           callManagement={callManagement}
//         />
//       ) : (
//         <>
//           <Form
//             widget={widget}
//             onSubmit={handleSubmit}
//             pureTargets={[]}
//             saving={!!showFinishMessage}
//             BeforeStandardFields={() =>
//               PhoneFields(targetList, analyticsEvents.pressureIsFilled())
//             }
//             errors={targetsError}
//           />
//           {countText && (
//             <Count
//               value={phonePressureCount}
//               color={mainColor}
//               text={countText}
//               startCounting={block.scrollTopReached}
//             />
//           )}
//         </>
//       )}
//     </PhoneFormStyled>
//   );
// };

// export default PhonePressure;
