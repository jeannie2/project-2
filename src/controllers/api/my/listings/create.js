import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  hallId: yup.string().required(), // how pass as param?
  link: yup.string().required()
  /* listings: yup.array().of(yup.object({ // items:
    name: yup.string().required().label('name'),
    hallId: yup.string().required().label('hallId') // need label?
  })) */
})

const controllersApiMyListingsCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newListing = await prisma.listing.create({
      data: {
        userId,
        ...verifiedData /* , */
        /* items: {
          create: verifiedData?.items
        } */
      }
    })
    return res.status(201).json(newListing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyListingsCreate
