import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiListingsShow = async (req, res) => {
  try {
    const { params: { listingId } } = req

    const foundListing = await prisma.listing.findUnique({
      where: { id: Number(listingId) },
      rejectOnNotFound: true,
      include: {
        //  items: true,
        user: {
          select: {
            id: true,
            avatar: true,
            name: true,
            bio: true
          }
        }
      }
    })
    return res.status(200).json(foundListing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiListingsShow
