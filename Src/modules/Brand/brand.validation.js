import Joi from "joi"


export const addBrandSchema = Joi.object({

    name: Joi.string().min(3).required().max(30)
})

export const getBrandByIdSchema = Joi.object({

    id : Joi.string().required().hex().length(24)
})

export const updateBrandSchema = Joi.object({

    id : Joi.string().required().hex().length(24),
    name: Joi.string().min(3).max(30)
})

export const deleteBrandSchema = Joi.object({

    id : Joi.string().required().hex().length(24)
})