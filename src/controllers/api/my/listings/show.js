import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const controllersApiListingsShow = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundListing = await prisma.listing.findUnique({
      where: { id: Number(id) },
      rejectOnNotFound: true,
      include: {
        // listings: true,
        user: {
          select: {
            avatar: true
          }
        }
      }
    })
    return res.status(200).json(foundListing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiListingsShow
]
