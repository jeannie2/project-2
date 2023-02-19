import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiArtistsShow = async (req, res) => { /// HOW TO UPDATE THIS PART???
  try {
    const { params: { id } } = req
    const foundListing = await prisma.listing.findUnique({
      where: { id: Number(id) },
      rejectOnNotFound: true,
      include: {
        items: true,
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

export default controllersApiArtistsShow // Artist singular?
