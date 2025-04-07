import React from 'react';
import styled from '@emotion/styled';
import { useField } from 'react-final-form';
// import InputMask from 'react-input-mask';

import { useMask } from "@react-input/mask";
import { useNumberFormat } from "@react-input/number-format";

import Box from './Box';
import Label from './Label';
import Raise from './Raise';

const InputStyled = styled.input`
  border: none;
  height: 2rem;
  outline: none;
  font-size: 0.9rem;
  width: 100%;
  font-family: "Nunito Sans", sans-serif;
  color: rgb(0, 0, 0);
  padding: 8px 0px;
  background: none;
`;

export interface InputFieldProperties {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  validate?: any;
  disabled?: boolean;
  mask?: any;
  replacement?: any;
}

const InputField: React.FC<InputFieldProperties> = ({
  name,
  placeholder,
  type,
  label,
  disabled,
  validate,
  mask,
  replacement
}) => {
  const { input, meta } = useField(name, { validate });

  let inputElement = (
    <InputStyled
      {...input}
      disabled={disabled}
      placeholder={placeholder}
      type={type || input.type}
    />
  )

  if (mask) {
    const inputRef = useMask({ mask: mask, replacement: replacement ? replacement : { x: /\d/ }, showMask: true });

    inputElement = (
      <InputStyled
        {...input}
        ref={inputRef}
        disabled={disabled}
        placeholder={placeholder}
        type={type || input.type}
      />
    )
  }

  if (type === "currency") {
    const inputRef = useNumberFormat({ locales: "pt-BR", format: "currency", currency: "BRL" });

    inputElement = (
      <InputStyled
        {...input}
        ref={inputRef}
        disabled={disabled}
        placeholder={placeholder}
        type="text"
      />
    )
  }

  return (
    <div className="form-control">
      <Box>
        {label && <Label>{label}</Label>}
        {meta.touched && meta.error && <Raise>{meta.error}</Raise>}
      </Box>
      {inputElement}
    </div>
  );
}

export default InputField;