const { celebrate, Segments, Joi } = require('celebrate');

const index = celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required().length(8)
    })
    .unknown()
});

module.exports = { index };