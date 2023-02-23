import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiListingsIndex = async (req, res) => {
  try {
    // Filters
    const { params: { hallId } } = req

    const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    /* Pagination
    const take = 10
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take */

    // Common Where Query
    const where = {
      hallId: { hallId },
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

    // const totalListings = await prisma.listing.count({ where })
    const foundListings = await prisma.listing.findMany({
      // take,
      // skip,
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
    /* return res.status(200).json({
      listings: foundListings,
      meta: { currentPage: page, totalPages: Math.ceil(totalListings / take) }
    }) */
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiListingsIndex
