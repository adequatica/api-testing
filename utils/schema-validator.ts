import Ajv from 'ajv';

const ajv = new Ajv();

function validateSchema(schema: any, data: any): true | unknown {
  const validate = ajv.compile(schema);

  if (validate(data)) {
    return true;
  } else {
    // if scheme does not valid, we need to receive error massage instead of 'false'
    return validate.errors;
  }
}

export { validateSchema };
