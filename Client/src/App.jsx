import { useEffect, useMemo, useState } from 'react'
import './styles/theme.css'
import AdminHome from './modules/admin/AdminHome'
import AdminAllBookings from './modules/admin/AllBookings'
import AllProperty from './modules/admin/AllProperty'
import AllUsers from './modules/admin/AllUsers'
import ForgotPassword from './modules/common/ForgotPassword'
import Home from './modules/common/Home'
import Login from './modules/common/Login'
import Register from './modules/common/Register'
import Toast from './modules/common/Toast'
import AddProperty from './modules/user/owner/AddProperty'
import OwnerAllBookings from './modules/user/owner/AllBookings'
import OwnerAllProperties from './modules/user/owner/AllProperties'
import OwnerHome from './modules/user/owner/OwnerHome'
import RenterAllProperties from './modules/user/renter/AllProperties'
import RenterHome from './modules/user/renter/RenterHome'
import { useAppStore } from './data/useAppStore'

const normalizeHashRoute = () => {
  const raw = window.location.hash.replace('#', '')
  if (!raw) return '/'
  return raw.startsWith('/') ? raw : `/${raw}`
}

function App() {
  const {
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
    adminStats,
    ownerProperties,
    ownerBookings,
    renterBookings,
    resetDatabase,
  } = useAppStore()

  const [route, setRoute] = useState(normalizeHashRoute())
  const [toast, setToast] = useState({ message: '', type: 'info' })

  useEffect(() => {
    const onHashChange = () => setRoute(normalizeHashRoute())
    window.addEventListener('hashchange', onHashChange)
    if (!window.location.hash) window.location.hash = '/'
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!toast.message) return
    const timer = setTimeout(() => setToast({ message: '', type: 'info' }), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const goTo = (path) => {
    window.location.hash = path
  }

  const requireRole = (role) => {
    if (!sessionUser || sessionUser.type !== role) {
      setToast({ message: `Please login as ${role}`, type: 'info' })
      goTo('/login')
      return false
    }
    return true
  }

  const onLogin = ({ email, password }) => {
    const result = login({ email, password })
    if (!result.ok) {
      setToast({ message: result.message, type: 'error' })
      return result
    }

    setToast({ message: `Welcome, ${result.user.name}`, type: 'success' })
    if (result.user.type === 'Admin') goTo('/admin/users')
    else if (result.user.type === 'Owner') goTo('/owner/properties')
    else goTo('/renter/properties')
    return result
  }

  const onRegister = ({ name, email, password, type }) => {
    const result = register({ name, email, password, type })
    if (!result.ok) {
      setToast({ message: result.message, type: 'error' })
      return result
    }

    setToast({ message: `Account created for ${result.user.name}`, type: 'success' })
    if (type === 'Owner') goTo('/owner/properties')
    else goTo('/renter/properties')
    return result
  }

  const onLogout = () => {
    logout()
    setToast({ message: 'Logged out successfully', type: 'info' })
    goTo('/')
  }

  const onBookProperty = (propertyId) => {
    if (!sessionUser) {
      setToast({ message: 'Please login to book a property', type: 'info' })
      goTo('/login')
      return
    }
    if (sessionUser.type !== 'Renter') {
      setToast({ message: 'Only renters can book properties', type: 'error' })
      return
    }

    const result = createBooking({ propertyId, tenantId: sessionUser.id })
    setToast({ message: result.message || 'Booking request created', type: result.ok ? 'success' : 'error' })
  }

  const page = useMemo(() => {
    if (route === '/') return <Home goTo={goTo} user={sessionUser} properties={db.properties} />
    if (route === '/login') return <Login goTo={goTo} onLogin={onLogin} />
    if (route === '/register') return <Register goTo={goTo} onRegister={onRegister} />
    if (route === '/forgot-password') {
      return <ForgotPassword goTo={goTo} onDone={(message) => setToast({ message, type: 'success' })} />
    }

    if (route === '/properties') {
      return (
        <RenterAllProperties
          goTo={goTo}
          userName={null}
          onLogout={null}
          isGuest
          properties={db.properties}
          onBookProperty={onBookProperty}
        />
      )
    }

    if (route.startsWith('/admin')) {
      if (!requireRole('Admin')) return null
      if (route === '/admin') {
        return <AdminHome goTo={goTo} userName={sessionUser.name} onLogout={onLogout} adminStats={adminStats} />
      }
      if (route === '/admin/users') {
        return (
          <AllUsers
            goTo={goTo}
            userName={sessionUser.name}
            onLogout={onLogout}
            users={db.users}
            onToggleGrant={toggleOwnerGrant}
          />
        )
      }
      if (route === '/admin/properties') {
        return (
          <AllProperty
            goTo={goTo}
            userName={sessionUser.name}
            onLogout={onLogout}
            properties={db.properties}
          />
        )
      }
      if (route === '/admin/bookings') {
        return (
          <AdminAllBookings
            goTo={goTo}
            userName={sessionUser.name}
            onLogout={onLogout}
            bookings={db.bookings}
          />
        )
      }
    }

    if (route.startsWith('/owner')) {
      if (!requireRole('Owner')) return null
      const myProperties = ownerProperties(sessionUser.id)
      const myBookings = ownerBookings(sessionUser.id)

      if (route === '/owner') return <OwnerHome goTo={goTo} userName={sessionUser.name} onLogout={onLogout} properties={myProperties} bookings={myBookings} />
      if (route === '/owner/add-property') {
        return (
          <AddProperty
            goTo={goTo}
            userName={sessionUser.name}
            onLogout={onLogout}
            onAddProperty={(payload) => addProperty({ ...payload, ownerId: sessionUser.id })}
            onNotify={(message, type) => setToast({ message, type: type || 'success' })}
          />
        )
      }
      if (route === '/owner/properties') {
        return (
          <OwnerAllProperties
            goTo={goTo}
            userName={sessionUser.name}
            onLogout={onLogout}
            properties={myProperties}
            onEdit={togglePropertyAvailability}
            onDelete={deleteProperty}
          />
        )
      }
      if (route === '/owner/bookings') {
        return (
          <OwnerAllBookings
            goTo={goTo}
            userName={sessionUser.name}
            onLogout={onLogout}
            bookings={myBookings}
            onToggleStatus={toggleBookingStatus}
          />
        )
      }
    }

    if (route === '/renter' || route === '/renter/bookings') {
      if (!requireRole('Renter')) return null
      return (
        <RenterHome
          goTo={goTo}
          userName={sessionUser.name}
          onLogout={onLogout}
          bookings={renterBookings(sessionUser.id)}
        />
      )
    }

    if (route === '/renter/properties') {
      if (!requireRole('Renter')) return null
      return (
        <RenterAllProperties
          goTo={goTo}
          userName={sessionUser.name}
          onLogout={onLogout}
          properties={db.properties}
          onBookProperty={onBookProperty}
        />
      )
    }

    return <Home goTo={goTo} user={sessionUser} properties={db.properties} />
  }, [route, sessionUser, db])

  return (
    <>
      {page}
      <button className="reset-btn" onClick={() => { resetDatabase(); setToast({ message: 'App reset to demo data', type: 'info' }); goTo('/') }}>
        Reset Demo Data
      </button>
      <Toast message={toast.message} type={toast.type} />
    </>
  )
}

export default App
