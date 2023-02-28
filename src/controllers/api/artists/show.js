import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiArtistsShow = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    const foundListing = await prisma.user.findUnique({
      where: { id: Number(userId) },
      rejectOnNotFound: true
    })
    return res.status(200).json(foundListing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiArtistsShow
