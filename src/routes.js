import { Router } from 'express'

const router = Router()

export default router

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// API | MY PROFILE | AUTH REQUIRED
router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/show.js')).default)
router.put('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/update.js')).default)

// API | MY LISTINGS | AUTH REQUIRED
router.get('/api/my/listings', authenticateUser('json'), (await import('./controllers/api/my/listings/index.js')).default)
router.post('/api/my/listings', authenticateUser('json'), (await import('./controllers/api/my/listings/create.js')).default)
router.get('/api/my/listings/:id', authenticateUser('json'), (await import('./controllers/api/my/listings/show.js')).default)
router.put('/api/my/listings/:id', authenticateUser('json'), (await import('./controllers/api/my/listings/update.js')).default)
router.delete('/api/my/listings/:id', authenticateUser('json'), (await import('./controllers/api/my/listings/destroy.js')).default)

// API | LISTINGS
router.get('/api/halls/:hallId', (await import('./controllers/api/halls/index.js')).default) // (await import('./controllers/api/halls/hallId/index.js')).default)
router.get('/api/halls/:hallId/:artId', (await import('./controllers/api/halls/show.js')).default) // (await import('./controllers/api/halls/hallId/artId/index.js')).default) . not show.js

// API | ARTIST
router.get('/api/artists/:artistId', (await import('./controllers/api/artists/show.js')).default) //  (await import('./controllers/api/artistId/index.js')).default)

// API | HOME
router.use('/api', (await import('./controllers/api/home.js')).default)

// API | NOT FOUND
router.use('/api', (await import('./controllers/api/not-found.js')).default) // can be same route / as home?

/// ///////////////////////////////////////////////////////

// PAGES | AUTH
router.get('/auth/signup', (await import('./controllers/pages/auth/signup.js')).default)
router.get('/auth/login', (await import('./controllers/pages/auth/login.js')).default)

// PAGES | MY PROFILE | AUTH REQUIRED
router.get('/my/profile/edit', (authenticateUser('html'), await import('./controllers/pages/my/profile/edit.js')).default)

// PAGES | MY LISTINGS | AUTH REQUIRED
router.get('/my/listings/new', authenticateUser('html'), (await import('./controllers/pages/my/listings/new.js')).default)
router.get('/my/listings/:id/edit', authenticateUser('html'), (await import('./controllers/pages/my/listings/edit.js')).default)
router.get('/my/listings/:id', authenticateUser('html'), (await import('./controllers/pages/my/listings/show.js')).default)
router.get('/my/listings', authenticateUser('html'), (await import('./controllers/pages/my/listings/index.js')).default)

// PAGES | LISTINGS
router.get('/halls/:hallId', (await import('./controllers/pages/halls/index.js')).default) // (await import('./controllers/pages/halls/hallId/index.js')).default)
router.get('/halls/:hallId/:artId', (await import('./controllers/pages/halls/show.js')).default) // not show.js. (await import('./controllers/pages/halls/hallId/artId/index.js')).default)

// PAGES | ARTIST
router.get('/artists/:artistId', (await import('./controllers/pages/artists/show.js')).default) // not show. artists/artistId?. (await import('./controllers/pages/artistId/index.js')).default)

// PAGES | Homepage
router.get('/', (await import('./controllers/pages/home.js')).default) // correct?

// PAGES | NOT FOUND
router.use('/', (await import('./controllers/pages/not-found.js')).default) // can be same route / as home?
