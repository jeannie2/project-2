import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const updateSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  hallId: yup.string().required(), // how pass as param?
  linkIframe: yup.string().url().required()
/*
  items: yup.array().of(yup.object({
    name: yup.string().required().label('name'),
    hallId: yup.string().required().label('hallId') // need label?
  })) */
})

const controllersApiListingsUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updated = await prisma.wishlist.update({
      where: { id: Number(id) },
      data: {
        ...verifiedData
        /* items: {
          deleteMany: {},
          create: verifiedData?.items
        } */
      }
    })
    return res.status(200).json(updated)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiListingsUpdate
]
