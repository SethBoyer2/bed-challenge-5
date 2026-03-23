import Joi from "joi";
/**
 * @openapi
 * components:
 *   validations:
 *     Resource:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - url
 *       properties:
 *         title:
 *           type: string
 *           description: Title for the library resource
 *           example: "JSDoc quickstart guide"
 *         type:
 *           type: string
 *           description: type of resource (eg. video, documentation, etc...)
 *           example: "documentation"
 *         url:
 *           type: string
 *           description: url of the resource
 */
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

/**
 * @openapi
 * components:
 *   validations:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "user not found"
 *         details:
 *           type: array
 *           post:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               issue:
 *                 type: string
 *                 example: "must be a valid email address"
 *           description: Detailed validation errors (optional)
 */

  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Item ID is required",
        "string.empty": "Item ID cannot be empty",
      }),
    }),
  },
};
