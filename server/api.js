import { defineEventHandler, readBody } from 'h3'
import jwt from 'jsonwebtoken'

// Mock database
let posts = [
  {
    id: 1,
    title: 'The Power of Deliberate Practice',
    excerpt: 'Discover how deliberate practice can accelerate your learning and skill development.',
    content: 'Deliberate practice is a highly structured activity engaged in with the specific goal of improving performance. It is different from mere repetition or mindless practice. Instead, it involves focused attention and is conducted with the specific goal of improving performance. When you engage in deliberate practice, you identify the skills you want to improve, and then work on them with full concentration and effort. This often involves breaking down complex skills into smaller, manageable parts and working on them individually. Over time, this approach leads to significant improvements in performance and mastery of skills.',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Deliberate Practice in Music',
    excerpt: 'Learn how musicians use deliberate practice to master their instruments and compositions.',
    content: 'In the world of music, deliberate practice is a cornerstone of mastery. Musicians don\'t simply play their instruments for hours on end; they engage in focused, purposeful practice sessions. This might involve working on a difficult passage repeatedly, slowly increasing the tempo as they improve. It could also mean practicing scales with different rhythms or articulations to improve technique. Deliberate practice in music often involves recording oneself and critically listening to the playback, identifying areas for improvement. By breaking down complex pieces into manageable sections and focusing intently on each part, musicians can make rapid progress and achieve high levels of skill.',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Applying Deliberate Practice in Your Career',
    excerpt: 'Explore how you can use deliberate practice principles to advance in your professional life.',
    content: 'The principles of deliberate practice can be powerfully applied to career development. Instead of simply going through the motions at work, deliberate practice involves setting specific goals for improvement and working systematically towards them. This might involve seeking out challenging projects that push you out of your comfort zone, or dedicating time each week to learning new skills relevant to your field. It could also mean asking for regular feedback from colleagues or mentors and using that feedback to focus your efforts. By approaching your work with the mindset of deliberate practice - setting clear goals, focusing intently, seeking feedback, and continuously pushing your boundaries - you can accelerate your professional growth and achieve higher levels of performance in your career.',
    created_at: new Date().toISOString()
  }
]

// Middleware to verify JWT token
const authenticateToken = (event) => {
  const authHeader = event.node.req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    event.node.res.statusCode = 401
    return 'Unauthorized'
  }

  try {
    const user = jwt.verify(token, 'your_secret_key')
    event.context.user = user
    return true
  } catch (err) {
    event.node.res.statusCode = 403
    return 'Forbidden'
  }
}

export default defineEventHandler(async (event) => {
  const { req } = event.node
  const method = req.method
  const url = new URL(req.url, `http://${req.headers.host}`)
  const path = url.pathname

  if (path === '/api/posts' && method === 'GET') {
    return posts
  }

  if (path.startsWith('/api/posts/') && method === 'GET') {
    const id = parseInt(path.split('/').pop())
    const post = posts.find(p => p.id === id)
    if (!post) {
      event.node.res.statusCode = 404
      return { error: 'Post not found' }
    }
    return post
  }

  if (path === '/api/posts' && method === 'POST') {
    const auth = authenticateToken(event)
    if (auth !== true) return auth

    const { title, excerpt, content } = await readBody(event)
    const newPost = {
      id: posts.length + 1,
      title,
      excerpt,
      content,
      created_at: new Date().toISOString()
    }
    posts.push(newPost)
    return newPost
  }

  if (path.startsWith('/api/posts/') && method === 'PUT') {
    const auth = authenticateToken(event)
    if (auth !== true) return auth

    const id = parseInt(path.split('/').pop())
    const { title, excerpt, content } = await readBody(event)
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) {
      event.node.res.statusCode = 404
      return { error: 'Post not found' }
    }
    posts[index] = { ...posts[index], title, excerpt, content }
    return posts[index]
  }

  if (path.startsWith('/api/posts/') && method === 'DELETE') {
    const auth = authenticateToken(event)
    if (auth !== true) return auth

    const id = parseInt(path.split('/').pop())
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) {
      event.node.res.statusCode = 404
      return { error: 'Post not found' }
    }
    posts.splice(index, 1)
    event.node.res.statusCode = 204
    return null
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const { email, password } = await readBody(event)
    // Mock user authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      const token = jwt.sign({ id: 1, email }, 'your_secret_key', { expiresIn: '1h' })
      return { token, user: { id: 1, email } }
    } else {
      event.node.res.statusCode = 401
      return { error: 'Invalid credentials' }
    }
  }

  if (path === '/api/auth/user' && method === 'GET') {
    const auth = authenticateToken(event)
    if (auth !== true) return auth

    return event.context.user
  }

  event.node.res.statusCode = 404
  return { error: 'Not found' }
})