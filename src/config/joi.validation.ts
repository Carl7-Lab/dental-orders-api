import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.required(),

  DB_TYPE: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.required(),

  DEFAULT_LIMIT: Joi.number().default(10),

  JWT_SECRET: Joi.required(),
  JWT_EXPIRATION_TIME: Joi.required(),
  JWT_REFRESH_SECRET: Joi.required(),
  JWT_REFRESH_EXPIRATION_TIME: Joi.required(),
});
