const joi = require('joi')

const authSchema = joi.object({
    product: joi.String().Product().required(),
})

module.exports = {
    authSchema
}
