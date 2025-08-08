import { PhonePressureForm } from "@bonde/actions-components";
import styled from 'styled-components';
import { defaultPhoneCall } from "./api";


type Target = {
  name: string;
  phone: string;
}

type Settings = {
  main_color?: string;
  title_text?: string;
  call_script?: string;
  targets?: Target[];
  finish_message_html_text?: string;
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
    call_script: guideline,
    targets = [],
    finish_message_html_text: postActionHtml
  } = widget.settings || {};

  return (
    <Styled>
      {titleText && <h2 style={{ backgroundColor: mainColor }}>{titleText}</h2>}
      {/* Targets */}
      <div className="target-section">
        <h3>Quem você vai pressionar? (1 alvo)</h3>
        <div className="targets-scroll-container">
          <div className="targets-horizontal">
            {targets.map((target, index) => (
              <div key={`target-${index}`} className="target-item">
                <strong>{target.name}</strong>
                {target.phone && <div>{target.phone}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider"></div>
    
      <PhonePressureForm
        widgetId={widget.id}
        action={defaultPhoneCall}
        mainColor={mainColor || "blue"}
        guideline={guideline || ""}
        targets={targets}
        postActionHtml={postActionHtml}
        onFinish={(state) => {
          console.log("onFinish", { state });
        }}
        onFail={(state) => {
          console.log("onFinish", { state });
        }}
        onSuccess={() => {
          console.log("onSuccess");
        }}
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

  .target-section {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    padding-bottom: 1.5rem;
    background-color: rgba(0,0,0,0.2);
    
    .targets-scroll-container {
      overflow-x: auto;
      padding-bottom: 16px;
      -webkit-overflow-scrolling: touch;
      
      &::-webkit-scrollbar {
        height: 6px;
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.2);
        border-radius: 8px;
      }
    }
    
    .targets-horizontal {
      display: flex;
      gap: 0.8rem;
      width: max-content;
    }
    
    .target-item {
      padding: 0.75rem;
      background-color: #f5f5f5;
      border-radius: 4px;
      min-width: 200px;
      flex-shrink: 0;
      
      strong {
        font-size: 1.1rem;
        display: block;
        margin-bottom: 0.3rem;
      }
      
      div {
        font-size: 0.9rem;
        color: #555;
      }
    }
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
    
    .bonde-action-guideline {
      font-size: 16px;
      color: #505050;
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