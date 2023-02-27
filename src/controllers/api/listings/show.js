import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiListingsShow = async (req, res) => {
  try {
    // console.log(req.userId)
    const { params: { listingId } } = req // not id

    const foundListing = await prisma.listing.findUnique({
      where: { id: Number(listingId) }, // not id
      rejectOnNotFound: true,
      include: {
        //  items: true,
        user: {
          select: {
            id: true,
            avatar: true, // need?
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
