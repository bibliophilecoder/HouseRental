import { useEffect, useMemo, useState } from 'react'
import { defaultDatabase } from './mockData'

const DB_KEY = 'rentease-db-v1'
const SESSION_KEY = 'rentease-user'

const makeId = () => `${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`

const defaultPasswordByType = {
  Admin: 'admin123',
  Owner: 'owner123',
  Renter: 'renter123',
}

const normalizeUser = (user) => ({
  ...user,
  password: user.password || defaultPasswordByType[user.type] || 'user123',
})

const normalizeDb = (rawDb) => {
  const safeDb = rawDb && typeof rawDb === 'object' ? rawDb : {}
  const users = Array.isArray(safeDb.users) ? safeDb.users.map(normalizeUser) : []
  const properties = Array.isArray(safeDb.properties) ? safeDb.properties : []
  const bookings = Array.isArray(safeDb.bookings) ? safeDb.bookings : []

  // Ensure core demo users are always present and have valid passwords.
  const byEmail = new Map(users.map((user) => [user.email?.toLowerCase(), user]))
  for (const seedUser of defaultDatabase.users) {
    const key = seedUser.email.toLowerCase()
    if (!byEmail.has(key)) byEmail.set(key, seedUser)
    else byEmail.set(key, normalizeUser(byEmail.get(key)))
  }

  return {
    users: [...byEmail.values()],
    properties: properties.length ? properties : defaultDatabase.properties,
    bookings: bookings.length ? bookings : defaultDatabase.bookings,
  }
}

const loadDb = () => {
  try {
    const raw = localStorage.getItem(DB_KEY)
    return raw ? normalizeDb(JSON.parse(raw)) : defaultDatabase
  } catch {
    return defaultDatabase
  }
}

const loadSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useAppStore() {
  const [db, setDb] = useState(loadDb)
  const [sessionUser, setSessionUser] = useState(loadSession)

  useEffect(() => {
    localStorage.setItem(DB_KEY, JSON.stringify(db))
  }, [db])

  useEffect(() => {
    if (sessionUser) localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
    else localStorage.removeItem(SESSION_KEY)
  }, [sessionUser])

  const login = ({ email, password }) => {
    const normalizedEmail = email.toLowerCase().trim()
    const normalizedPassword = password.trim()
    const found = db.users.find((user) => user.email.toLowerCase() === normalizedEmail)
    if (!found || found.password !== normalizedPassword) {
      return { ok: false, message: 'Invalid email or password' }
    }
    setSessionUser({ id: found.id, name: found.name, type: found.type, email: found.email })
    return { ok: true, user: found }
  }

  const register = ({ name, email, password, type }) => {
    if (db.users.some((user) => user.email.toLowerCase() === email.toLowerCase().trim())) {
      return { ok: false, message: 'Email already exists' }
    }
    const newUser = {
      id: makeId(),
      name: name.trim(),
      email: email.trim(),
      password,
      type,
      granted: type === 'Owner' ? false : true,
    }
    setDb((prev) => ({ ...prev, users: [...prev.users, newUser] }))
    setSessionUser({ id: newUser.id, name: newUser.name, type: newUser.type, email: newUser.email })
    return { ok: true, user: newUser }
  }

  const logout = () => setSessionUser(null)

  const toggleOwnerGrant = (userId) => {
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((user) => {
        if (user.id !== userId || user.type !== 'Owner') return user
        return { ...user, granted: !user.granted }
      }),
    }))
  }

  const addProperty = ({ ownerId, propertyType, adType, address, ownerContact, amount, image }) => {
    const newProperty = {
      id: makeId(),
      ownerId,
      propertyType,
      adType,
      address,
      ownerContact,
      amount,
      availability: 'Available',
      image: image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    }
    setDb((prev) => ({ ...prev, properties: [newProperty, ...prev.properties] }))
    return newProperty
  }

  const togglePropertyAvailability = (propertyId) => {
    setDb((prev) => ({
      ...prev,
      properties: prev.properties.map((property) => {
        if (property.id !== propertyId) return property
        return {
          ...property,
          availability: property.availability === 'Available' ? 'Unavailable' : 'Available',
        }
      }),
    }))
  }

  const deleteProperty = (propertyId) => {
    setDb((prev) => ({
      ...prev,
      properties: prev.properties.filter((property) => property.id !== propertyId),
      bookings: prev.bookings.filter((booking) => booking.propertyId !== propertyId),
    }))
  }

  const toggleBookingStatus = (bookingId) => {
    setDb((prev) => ({
      ...prev,
      bookings: prev.bookings.map((booking) => {
        if (booking.id !== bookingId) return booking
        return { ...booking, status: booking.status === 'booked' ? 'pending' : 'booked' }
      }),
    }))
  }

  const createBooking = ({ propertyId, tenantId }) => {
    const property = db.properties.find((item) => item.id === propertyId)
    const tenant = db.users.find((item) => item.id === tenantId)
    if (!property || !tenant) return { ok: false, message: 'Unable to create booking' }
    if (property.availability !== 'Available') {
      return { ok: false, message: 'Property is not available' }
    }
    const already = db.bookings.find(
      (booking) => booking.propertyId === propertyId && booking.tenantId === tenantId && booking.status !== 'cancelled'
    )
    if (already) return { ok: false, message: 'Booking already exists for this property' }

    const newBooking = {
      id: makeId(),
      ownerId: property.ownerId,
      propertyId,
      tenantId,
      tenantName: tenant.name,
      tenantPhone: '9000000000',
      status: 'pending',
    }

    setDb((prev) => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings],
      properties: prev.properties.map((item) =>
        item.id === propertyId ? { ...item, availability: 'Unavailable' } : item
      ),
    }))

    return { ok: true, booking: newBooking }
  }

  const derived = useMemo(() => {
    const adminStats = {
      users: db.users.length,
      properties: db.properties.length,
      bookings: db.bookings.length,
      ownersGranted: db.users.filter((user) => user.type === 'Owner' && user.granted).length,
    }

    const ownerProperties = (ownerId) => db.properties.filter((property) => property.ownerId === ownerId)
    const ownerBookings = (ownerId) => db.bookings.filter((booking) => booking.ownerId === ownerId)
    const renterBookings = (tenantId) => db.bookings.filter((booking) => booking.tenantId === tenantId)

    return { adminStats, ownerProperties, ownerBookings, renterBookings }
  }, [db])

  const resetDatabase = () => {
    setDb(defaultDatabase)
    setSessionUser(null)
  }

  return {
    db,
    sessionUser,
    login,
    register,
    logout,
    toggleOwnerGrant,
    addProperty,
    togglePropertyAvailability,
    deleteProperty,
    toggleBookingStatus,
    createBooking,
    resetDatabase,
    ...derived,
  }
}
