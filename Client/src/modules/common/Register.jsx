import { useState } from 'react'
import { BrandHeader } from './layoutHelpers'

function Register({ goTo, onRegister }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const result = onRegister({ name, email, password, type })
    if (!result?.ok) setError(result?.message || 'Unable to register')
  }

  return (
    <div className="page dark-bg">
      <BrandHeader
        rightLinks={[
          { label: 'Home', onClick: () => goTo('/') },
          { label: 'Login', onClick: () => goTo('/login') },
          { label: 'Register', active: true, onClick: () => goTo('/register') },
        ]}
      />
      <div className="auth-wrap">
        <form className="auth-card" onSubmit={submit}>
          <div className="auth-icon">📝</div>
          <h2>Sign Up</h2>
          <input placeholder="Renter Full Name / Owner Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select User Type</option>
            <option value="Renter">Renter</option>
            <option value="Owner">Owner</option>
          </select>
          {error && <p className="text-red compact-text">{error}</p>}
          <button className="btn btn-primary full-width" type="submit">Sign Up</button>
          <p className="center-text">
            <span className="text-red">Have an account?</span>{' '}
            <button type="button" className="text-btn" onClick={() => goTo('/login')}>Sign In</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
