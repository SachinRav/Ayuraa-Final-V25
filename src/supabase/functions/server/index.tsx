import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Hono } from "npm:hono"
import { cors } from "npm:hono/cors"
import { logger } from "npm:hono/logger"
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', logger(console.log))

// Initialize Supabase client with service role key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// User Profile Routes
app.get('/make-server-4cca1616/profile/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const profile = await kv.get(`user_profile:${userId}`)
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }
    
    return c.json(profile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return c.json({ error: 'Failed to fetch profile' }, 500)
  }
})

app.post('/make-server-4cca1616/profile', async (c) => {
  try {
    const body = await c.req.json()
    const { id, email, name, role, created_at } = body
    
    if (!id || !email || !name) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
    
    const profile = {
      id,
      email,
      name,
      role: role || 'user',
      created_at: created_at || new Date().toISOString(),
      avatar_url: null,
      bio: null,
      specialties: [],
      experience: null,
      pricing: null,
      updated_at: new Date().toISOString()
    }
    
    await kv.set(`user_profile:${id}`, profile)
    return c.json(profile)
  } catch (error) {
    console.error('Error creating user profile:', error)
    return c.json({ error: 'Failed to create profile' }, 500)
  }
})

app.put('/make-server-4cca1616/profile/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const body = await c.req.json()
    
    const existingProfile = await kv.get(`user_profile:${userId}`)
    if (!existingProfile) {
      return c.json({ error: 'Profile not found' }, 404)
    }
    
    const updatedProfile = {
      ...existingProfile,
      ...body,
      updated_at: new Date().toISOString()
    }
    
    await kv.set(`user_profile:${userId}`, updatedProfile)
    return c.json(updatedProfile)
  } catch (error) {
    console.error('Error updating user profile:', error)
    return c.json({ error: 'Failed to update profile' }, 500)
  }
})

// Session Booking Routes
app.post('/make-server-4cca1616/bookings', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user } } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const body = await c.req.json()
    const { healer_id, service_type, date, time, price, notes } = body
    
    if (!healer_id || !service_type || !date || !time) {
      return c.json({ error: 'Missing required booking information' }, 400)
    }
    
    const booking = {
      id: crypto.randomUUID(),
      user_id: user.id,
      healer_id,
      service_type,
      date,
      time,
      price: price || '2500',
      status: 'pending',
      notes: notes || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    await kv.set(`booking:${booking.id}`, booking)
    
    // Also store in user's bookings list
    const userBookings = await kv.get(`user_bookings:${user.id}`) || []
    userBookings.push(booking.id)
    await kv.set(`user_bookings:${user.id}`, userBookings)
    
    // Store in healer's bookings list
    const healerBookings = await kv.get(`healer_bookings:${healer_id}`) || []
    healerBookings.push(booking.id)
    await kv.set(`healer_bookings:${healer_id}`, healerBookings)
    
    return c.json(booking)
  } catch (error) {
    console.error('Error creating booking:', error)
    return c.json({ error: 'Failed to create booking' }, 500)
  }
})

app.get('/make-server-4cca1616/bookings/user/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const bookingIds = await kv.get(`user_bookings:${userId}`) || []
    
    const bookings = []
    for (const bookingId of bookingIds) {
      const booking = await kv.get(`booking:${bookingId}`)
      if (booking) {
        bookings.push(booking)
      }
    }
    
    return c.json(bookings)
  } catch (error) {
    console.error('Error fetching user bookings:', error)
    return c.json({ error: 'Failed to fetch bookings' }, 500)
  }
})

// Healer Routes
app.get('/make-server-4cca1616/healers', async (c) => {
  try {
    const healerIds = await kv.getByPrefix('user_profile:')
    const healers = []
    
    for (const profile of healerIds) {
      if (profile.role === 'healer') {
        healers.push(profile)
      }
    }
    
    return c.json(healers)
  } catch (error) {
    console.error('Error fetching healers:', error)
    return c.json({ error: 'Failed to fetch healers' }, 500)
  }
})

// Wellness Goals Routes
app.post('/make-server-4cca1616/goals', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user } } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const body = await c.req.json()
    const { goal, total, category, deadline, color } = body
    
    if (!goal || !total) {
      return c.json({ error: 'Missing required goal information' }, 400)
    }
    
    const goalData = {
      id: crypto.randomUUID(),
      user_id: user.id,
      goal: goal.trim(),
      progress: 0,
      total: parseInt(total),
      category: category || 'Personal',
      deadline: deadline || null,
      color: color || 'neo-cyan',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    await kv.set(`goal:${goalData.id}`, goalData)
    
    // Add to user's goals list
    const userGoals = await kv.get(`user_goals:${user.id}`) || []
    userGoals.push(goalData.id)
    await kv.set(`user_goals:${user.id}`, userGoals)
    
    return c.json(goalData)
  } catch (error) {
    console.error('Error creating goal:', error)
    return c.json({ error: 'Failed to create goal' }, 500)
  }
})

app.get('/make-server-4cca1616/goals/user/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const goalIds = await kv.get(`user_goals:${userId}`) || []
    
    const goals = []
    for (const goalId of goalIds) {
      const goal = await kv.get(`goal:${goalId}`)
      if (goal) {
        goals.push(goal)
      }
    }
    
    return c.json(goals)
  } catch (error) {
    console.error('Error fetching user goals:', error)
    return c.json({ error: 'Failed to fetch goals' }, 500)
  }
})

app.put('/make-server-4cca1616/goals/:goalId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user } } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const goalId = c.req.param('goalId')
    const body = await c.req.json()
    
    const existingGoal = await kv.get(`goal:${goalId}`)
    if (!existingGoal || existingGoal.user_id !== user.id) {
      return c.json({ error: 'Goal not found or unauthorized' }, 404)
    }
    
    const updatedGoal = {
      ...existingGoal,
      ...body,
      updated_at: new Date().toISOString()
    }
    
    await kv.set(`goal:${goalId}`, updatedGoal)
    return c.json(updatedGoal)
  } catch (error) {
    console.error('Error updating goal:', error)
    return c.json({ error: 'Failed to update goal' }, 500)
  }
})

// Wishlist Routes
app.post('/make-server-4cca1616/wishlist', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user } } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const body = await c.req.json()
    const { product_id } = body
    
    if (!product_id) {
      return c.json({ error: 'Product ID required' }, 400)
    }
    
    const userWishlist = await kv.get(`wishlist:${user.id}`) || []
    
    if (!userWishlist.includes(product_id)) {
      userWishlist.push(product_id)
      await kv.set(`wishlist:${user.id}`, userWishlist)
    }
    
    return c.json({ success: true, wishlist: userWishlist })
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    return c.json({ error: 'Failed to add to wishlist' }, 500)
  }
})

app.get('/make-server-4cca1616/wishlist/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const wishlist = await kv.get(`wishlist:${userId}`) || []
    return c.json(wishlist)
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return c.json({ error: 'Failed to fetch wishlist' }, 500)
  }
})

// Health Check
app.get('/make-server-4cca1616/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Ayuraa Wellness Platform API'
  })
})

// 404 Handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404)
})

// Error Handler
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

serve(app.fetch)