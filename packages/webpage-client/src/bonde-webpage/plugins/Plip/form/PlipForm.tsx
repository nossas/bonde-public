import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import PlipDetails from "../components/PlipDetails";
import PlipFormStyles from "./PlipFormStyles";
import PlipLGPD from "./PlipLGPD";

type Props = {
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  asyncFillWidget: any;
  widget: any;
};

export interface PlipFormState {
  data: any[];
  submited: boolean;
}

const required = (field) => {
  return field ? undefined : "não pode ficar em branco";
};

const mustBeNumber = (whatsapp) =>
  isNaN(whatsapp) && whatsapp != null ? "Digite apenas números" : undefined;

const minValue = (min) => (whatsapp) =>
  isNaN(whatsapp) || whatsapp.length >= min
    ? undefined
    : `Digite o número com o DDD`;

const composeValidators =
  (...validators) =>
  (field) =>
    validators.reduce(
      (error, validator) => error || validator(field),
      undefined
    );

const PlipForm: React.FC<Props> = ({ asyncFillWidget, widget }) => {
  const [pdf, setPdf] = useState<PlipFormState>({ data: [], submited: false });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dots, setDots] = useState("");

  let bgcolor = "rgba(0,0,0,0.25)";
  if (widget.settings && widget.settings.main_color) {
    bgcolor = widget.settings.main_color;
  }

  let title = "Clique para configurar seu formulário...";
  if (widget.settings && widget.settings.call_to_action) {
    title = widget.settings.call_to_action;
  }

  const onSubmit = (values) => {
    setSubmitLoading(true);
    asyncFillWidget({ ...values, widget_id: widget.id })
      .then(({ create_plip }: any) => {
        setPdf({ data: create_plip, submited: true });
      })
      .catch((err: any) => {
        console.error("PlipPlugin: ", err);
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    if (!submitLoading) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, [submitLoading]);

  return (
    <PlipFormStyles style={{ backgroundColor: bgcolor }}>
      {pdf.submited ? (
        <PlipDetails pdf={pdf} />
      ) : (
        <Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} target="target_iframe" method="POST">
              <h2>{title}</h2>
              <Field name="name" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Nome completo*</label>
                    <input
                      {...input}
                      type="text"
                      placeholder="Insira seu nome"
                    />
                    {meta.error && meta.touched && (
                      <span>Nome completo {meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              <Field name="email" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Email* </label>
                    <input
                      {...input}
                      type="text"
                      placeholder="Insira seu e-mail"
                    />
                    {meta.error && meta.touched && (
                      <span>Email {meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              <Field name="state" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Estado* </label>
                    <select {...input}>
                      <option value="" disabled selected>
                        Selecione o Estado
                      </option>
                      <option value="EX">Internacional</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                    {meta.error && meta.touched && (
                      <span>Estado {meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field
                name="whatsapp"
                validate={composeValidators(
                  mustBeNumber,
                  minValue(11),
                  required
                )}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Whatsapp* </label>
                    <input
                      {...input}
                      type="text"
                      placeholder="não se esqueça do DDD!"
                    />
                    {meta.error && meta.touched && <span>WhatsApp {meta.error}</span>}
                  </div>
                )}
              </Field>

              {/* apenas para prod */}
              {widget.id === 79520 && (
                <Field name="team" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <label>Qual é seu boi?*</label>
                      <select {...input}>
                        <option value="" disabled selected>
                          selecione entre as opções
                        </option>
                        <option value="caprichoso">Caprichoso</option>
                        <option value="garantido">Garantido</option>
                      </select>
                      {meta.error && meta.touched && <span>É necessário selecionar uma opção</span>}
                    </div>
                  )}
                </Field>
              )}

              <button type="submit" value="submit" disabled={submitLoading}>
                {submitLoading
                  ? `Carregando, aguarde${dots}`
                  : (widget.settings && widget.settings.button_text) ||
                    "Enviar"}
              </button>
              <PlipLGPD />
            </form>
          )}
        </Form>
      )}
    </PlipFormStyles>
  );
};

export default PlipForm;
