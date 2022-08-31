import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[A-Z]+[A-Z|a-z|0-9|,|\s|/]+$/)
    .required(),
});

export default schema;
