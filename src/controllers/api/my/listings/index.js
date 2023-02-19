import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyListingsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    // Filters
    const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    /* Pagination
    const take = 10
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take */

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

    // const totalMyWishlists = await prisma.wishlist.count({ where })
    const foundMyListings = await prisma.listing.findMany({
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

    return res.status(200).json(foundMyListings)
    /* return res.status(200).json({
      wishlists: foundMyWishlists,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyWishlists / take) }
    }) */
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyListingsIndex
