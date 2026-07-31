// eslint-disable-next-line
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email: any) => regexEmail.test(email);

export const getFieldName = (uid: string) => `input-${uid}`;

export const validate = (fieldsWithValue: any, { t }: any) => {
  const errors = fieldsWithValue.map((field: any) => {
    if (field.required === 'true' && !field.value) {
      return t("Form Blank Validation", { field: field.label });
    } else if (
      field.value !== '' &&
      field.kind === 'email' &&
      !isValidEmail(field.value)
    ) {
      return t("Form Email Validation", { field: field.label });
    }
    return false;
  });

  return errors.filter((error: string | boolean) => !!error);
};

export const fields = (settings: any) => {
  const fields = settings && settings.fields ? settings.fields : [];
  // TODO: this field 'greetings' used to only render in edit mode
  return fields.filter((f: any) => f.kind !== 'greetings');
};

export const addValueToFields = (
  fields: Array<any>,
  values: Record<string, any>
) =>
  fields.map((field: { uid: string }) => ({
    ...field,
    value: values[getFieldName(field.uid)],
  }));

// Section backgrounds are configured independently of the mobilization's
// main_color (see Section.tsx#getBackgroundStyle), so text placed directly
// on a block needs its own contrast check instead of assuming main_color
// is always readable.
export const getContrastTextColor = (
  block: { bg_class?: string; bg_image?: string } | undefined,
  preferredColor?: string
) => {
  if (block?.bg_class) {
    try {
      const { r, g, b, a = 1 } = JSON.parse(block.bg_class);
      // blend over an assumed white page background before measuring luminance
      const blend = (channel: number) => channel * a + 255 * (1 - a);
      const luminance =
        (blend(r) * 299 + blend(g) * 587 + blend(b) * 114) / 1000;
      return luminance >= 150 ? preferredColor || '#000' : '#fff';
    } catch (ex) {
      // non-JSON bg_class is a custom CSS class of unknown color, fall
      // through to the bg_image/default handling below
    }
  }

  if (block?.bg_image) {
    return '#fff';
  }

  return preferredColor || '#000';
};
