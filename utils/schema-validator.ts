import Ajv from 'ajv';

const ajv = new Ajv.default();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateSchema: true | any = (schema: any, inputData: any) => {
  const validate = ajv.compile(schema);

  if (validate(inputData)) {
    return true;
  } else {
    // If scheme does not valid, we will receive an error massage, instead of "false"
    return validate.errors;
  }
};

export { validateSchema };
