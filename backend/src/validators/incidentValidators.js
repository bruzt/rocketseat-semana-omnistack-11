const { celebrate, Segments, Joi } = require('celebrate');

const index = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
});

const store = celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required().length(8)
    })
    .unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
});

const destroy = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
});

module.exports = { index, store, destroy };
