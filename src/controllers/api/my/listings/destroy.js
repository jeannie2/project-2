import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const controllersApiListingsDestroy = async (req, res) => {
  try {
    const { params: { id } } = req
    const deletedListing = await prisma.listing.delete({ where: { id: Number(id) } })
    return res.status(200).json(deletedListing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiListingsDestroy
]
