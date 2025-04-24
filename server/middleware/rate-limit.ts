import { RateLimiterMemory } from "rate-limiter-flexible"

const rateLimiter = new RateLimiterMemory({
  points: 180,
  duration: 60,
})

export default defineEventHandler(async () => {
  try {
    await rateLimiter.consume(1)
    return
  } catch {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests',
    })
  }
})
