const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const authRoutes = require('./routes/authRoutes')
const symptomRoutes = require('./routes/symptomRoutes')
const historyRoutes = require('./routes/historyRoutes')
const allergyRoutes = require('./routes/allergyRoutes')

const logger = require('./utils/logger')

const app = express()

// CORS configuration - allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://med-assist-project-ai-drug-recommen-eight.vercel.app'
].filter(Boolean) // loại bỏ undefined

const allowedOrigin = (origin, callback) => {
  // Allow requests with no origin (like mobile apps, curl, Postman)
  if (!origin) return callback(null, true)
  
  // Allow localhost in development
  if (process.env.NODE_ENV === 'development' && /^http:\/\/localhost:\d+$/.test(origin)) {
    return callback(null, true)
  }
  
  // Check if origin is in allowed list
  if (allowedOrigins.includes(origin)) {
    return callback(null, true)
  }
  
  // Allow all Vercel preview deployments (optional)
  if (origin.match(/https:\/\/.*\.vercel\.app$/)) {
    return callback(null, true)
  }
  
  // Log blocked origin for debugging
  console.warn(`[CORS] Blocked origin: ${origin}`)
  callback(new Error('Not allowed by CORS'))
}

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`)
  })
  next()
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/symptoms', symptomRoutes)
app.use('/api/v1/history', historyRoutes)
app.use('/api/v1/allergies', allergyRoutes)

app.use(errorHandler)

module.exports = app