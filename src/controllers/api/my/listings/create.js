import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import uploadFileAsync from '../../../_helpers/upload-file.js'

const createSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  hallId: yup.string().required(),
  work: yup.mixed().required()
})

const controllersApiMyListingsCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)
    const newListing = await prisma.listing.create({
      data: {
        userId,
        ...verifiedData
      }
    })
    return res.status(201).json(newListing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyListingsCreate
