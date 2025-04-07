import React, { useReducer } from "react"
import styled from '@emotion/styled';

import LGPD from "../../components/ux/LGPD";
import { Form, Button, InputField, Validators } from "../../components/forms";
import { SUCCESS, FETCHING, reducer, initialState } from "../Busao0800/redux";


export const PostActionBox = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  overflow: auto;
`;

export const Container = styled.div<{ mainColor: string }>`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  h3 {
    padding: 15px 20px;
    background: ${props => props.mainColor || '#000'};
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
  
  button[type="submit"] {
    background: ${props => props.mainColor || '#000'};
    border-color: ${props => props.mainColor || '#000'};

    &:hover {
      filter: brightness(90%);
    }
  }
`

export const FormPanel = styled.div`
  .form-control {
    padding: 15px 20px 0;
    border-bottom: 1px solid #eee;
  }
`

export const FormFooter = styled.div`
  padding: 10px 20px
`

const { required } = Validators;


const Busao0800 = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { widget, asyncWidgetActionCreate } = props

  const {
    settings: {
      main_color: mainColor,
      title_text: titleText,
      call_to_action: callToAction,
      button_text: buttonText
    }
  } = widget;

  const handleSubmit = async ({ n_employees, transportation_cost, ...values }: any) => {
    dispatch({ type: FETCHING });

    const cost = parseFloat(transportation_cost.replace("R$ ", "").replace(".", "").replace(",", "."))
    const newCost = (n_employees - 9) * 170;
    const saveMoney = cost - newCost;

    await asyncWidgetActionCreate({
      ...values,
      widget_id: widget.id,
      custom_fields: { n_employees, transportation_cost: cost, save_money: saveMoney }
    });

    // Adiciona Contexto para utilizar na mensagem de agradecimento
    const context = { ...values, saveMoney, newCost, nEmployees: n_employees, cost: transportation_cost };
    dispatch({ type: SUCCESS, payload: { context } });
  }

  if (state.data) {
    // Usa as variaveis do formulário de pressão
    // email, name, lastname, state, city
    const values = state.data.context
    const content = widget.settings.finish_message_html_text?.replace(/{{(.*?)}}/g, (_, chave) => values[chave] || `{{${chave}}}`)

    return <PostActionBox dangerouslySetInnerHTML={{ __html: content || '' }} />;
  }

  return (
    <Container mainColor={mainColor}>
      <h3>{titleText || callToAction}</h3>
      <Form onSubmit={handleSubmit} initialValues={{ n_employees: 10, transportation_cost: "R$ 1.600,00" }}>
        {({ submitting }: any) => (
          <FormPanel>
            <InputField
              name="first_name"
              label="Nome"
              placeholder="Insira seu nome"
              validate={required("Preenchimento obrigatório")}
            />
            <InputField
              name="last_name"
              label="Sobrenome"
              placeholder="Insira seu sobrenome"
              validate={required("Preenchimento obrigatório")}
            />
            <InputField
              name="email"
              label="E-mail"
              placeholder="Insira seu e-mail"
              type="email"
              validate={required("Preenchimento obrigatório")}
            />
            <InputField
              name="phone"
              label="Whatsapp"
              mask="(xx) x xxxx-xxxx"
              placeholder="(xx) x xxxx-xxxx"
            />
            <InputField
              name="n_employees"
              label="Número de colaboradores"
              type="number"
            />
            <InputField
              name="transportation_cost"
              label="Valor total gasto com Vale Transporte"
              type="currency"
            />
            <FormFooter>
              <Button type="submit" disabled={submitting}>{buttonText || "Enviar"}</Button>
              <LGPD color="#545454" />
            </FormFooter>
          </FormPanel>
        )}
      </Form>
    </Container>
  )
}

export default Busao0800