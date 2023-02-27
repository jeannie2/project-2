import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiListingsIndex = async (req, res) => {
  try {
    // Filters
    const { params: { hallId } } = req

    const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    // Common Where Query
    const where = {
      hallId,
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

    const foundListings = await prisma.listing.findMany({
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

    return res.status(200).json(foundListings)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiListingsIndex
