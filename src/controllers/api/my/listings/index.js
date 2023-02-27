import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyListingsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    // Filters
    const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    // Common Where Query
    const where = {
      userId,
      OR: [
        {
          title: {
            contains: q
          }
        }, {
          description: {
            contains: q
          }
        }
      ]
    }

    const foundMyListings = await prisma.listing.findMany({
      where,
      orderBy: {
        [orderBy]: sortBy
      },
      include: {
        user: {
          select: {
            avatar: true
          }
        }
      }
    })

    return res.status(200).json(foundMyListings)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyListingsIndex
