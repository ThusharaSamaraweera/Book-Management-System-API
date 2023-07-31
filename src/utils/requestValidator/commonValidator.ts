import Joi from "joi";
import { BadRequestError } from "../errorHandling/ErrorResponse";

export function validate(schema: any, data: any) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { value, error } = schema.validate(data, options);

  if (error) {
    throw new BadRequestError(undefined, error.details);
  }

  return value;
}
