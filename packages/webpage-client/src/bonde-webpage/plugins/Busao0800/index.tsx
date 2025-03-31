import React, { useState, useReducer } from "react"
import styled from '@emotion/styled';

import FormWidget from "./FormWidget";
import { SUCCESS, FETCHING, FAILED, reducer, initialState } from "./redux";


export const Container = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  overflow: auto;
`;


const Busao0800 = ({ widget }) => {
    const [values, setValues] = useState({
        "n_employees": 10,
        "transportation_cost": 1600.00
    })
    const [state, dispatch] = useReducer(reducer, initialState)

    const {
        main_color: mainColor,
        call_to_action: callToAction,
        title_text: titleText,
        // Maybe `reply_email` is necessary...
        // reply_email,
        count_text: countText,
        optimization_enabled: optimizationEnabled = true,
        finish_message_type: finishMessageType,
        disable_edit_field: disableEditField,
        targets,
        pressure_type,
      } = widget.settings;

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch({ type: FETCHING });
        setTimeout(() => {
            // Calcula a economia
            const totalCost = (values.n_employees - 9) * 170;
            const saveMoney = values.transportation_cost - totalCost;

            dispatch({ type: SUCCESS, payload: { form_data: { ...values, totalCost, saveMoney } } });
        }, 10)
    }

    const handleChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })
    }

    if (state.data) {
      // Usa as variaveis do formulário de pressão
      // email, name, lastname, state, city
      const values = state.data.form_data
      const content = widget.settings.finish_message_html_text?.replace(/{{(.*?)}}/g, (_, chave) => values[chave] || `{{${chave}}}`)
      
      return <Container dangerouslySetInnerHTML={{__html: content || ''}} />;
    }
    
    return (
        <FormWidget widget={widget} handleSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="id_full_name">Nome completo</label>
                <input id="id_full_name" name='full_name' value={values['name']} onChange={handleChange} />
            </div>
            <div className="form-control">
                <label htmlFor="id_email">E-mail</label>
                <input id="id_email" type="email" name='email' value={values['email']} onChange={handleChange} />
            </div>
            <div className="form-control">
                <label htmlFor="id_n_employees">Número de colaboradores</label>
                <input id="id_n_employees" type="number" name='n_employees' value={values['n_employees']} onChange={handleChange} />
            </div>
            <div className="form-control">
                <label htmlFor="id_transportation_cost">Valor total gasto com Vale Transporte </label>
                <input id="id_transportation_cost" type="number" name='transportation_cost' value={values['transportation_cost']} onChange={handleChange} />
            </div>
        </FormWidget>
    )
}

export default Busao0800