import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiArtistsShow = async (req, res) => {
  try {
    // const { params: { userId } } = req
    const { session: { user: { id: userId } } } = req
    // const { params: { artistId } } = req // not id
    // const { user: { id } } = req

    const foundListing = await prisma.user.findUnique({ // await prisma.listing.user.findUnique(
      where: { id: Number(userId) }, // not id.  where: { id: Number(artistId) }
      rejectOnNotFound: true
      /* include: {
        // items: true,
        user: {
          select: {
            avatar: true
          }
        }
      } */
    })
    return res.status(200).json(foundListing)
    // return res.status(200).json(_.omit(foundUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiArtistsShow
