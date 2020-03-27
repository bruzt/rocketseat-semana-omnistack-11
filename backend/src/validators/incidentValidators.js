const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    index: celebrate({
       [Segments.QUERY]: Joi.object().keys({
           page: Joi.number()
       })
    }),
    
    store: celebrate({
       [Segments.HEADERS]: Joi.object({
           authorization: Joi.string().required().length(8)
       })
       .unknown(),
       [Segments.BODY]: Joi.object().keys({
           title: Joi.string().required(),
           description: Joi.string().required(),
           value: Joi.number().required(),
       })
    }),

    destroy: celebrate({
       [Segments.PARAMS]: Joi.object().keys({
           id: Joi.number().required()
       })
    }),
}
