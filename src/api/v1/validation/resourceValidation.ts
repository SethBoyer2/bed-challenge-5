import Joi from "joi";

export const itemSchemas = {
  create: {
    body: Joi.object({
      title: Joi.string().required().min(3).max(100).messages({
        "any.required": "title is required",
        "string.empty": "title cannot be empty.",
      }),

      type: Joi.string().required().messages({
        "any.required": "type is required.",
        "string.empty": "type cannot be empty.",
      }),

      url: Joi.string().required().messages({
        "any.required": "Capacity is required.",
        "string.empty": "Capacity cannot be empty.",
      }),

      description: Joi.string().optional().max(500).messages({
        "string.max": "Description may not exceed 500 characters"
        }),
    }),
  },

  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Item ID is required",
        "string.empty": "Item ID cannot be empty",
      }),
    }),
  },
};
