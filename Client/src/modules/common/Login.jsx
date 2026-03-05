import { useState } from 'react'
import { BrandHeader } from './layoutHelpers'

function Login({ goTo, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const result = onLogin({ email, password })
    if (!result?.ok) {
      setError(result?.message || 'Unable to login')
    }
  }

  return (
    <div className="page dark-bg">
      <BrandHeader
        rightLinks={[
          { label: 'Home', onClick: () => goTo('/') },
          { label: 'Login', active: true, onClick: () => goTo('/login') },
          { label: 'Register', onClick: () => goTo('/register') },
        ]}
      />
      <div className="auth-wrap">
        <form className="auth-card" onSubmit={submit}>
          <div className="auth-icon">🔒</div>
          <h2>Sign In</h2>
          <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red compact-text">{error}</p>}
          <button className="btn btn-primary full-width" type="submit">Sign In</button>
          <div className="auth-links">
            <button type="button" className="text-btn text-red" onClick={() => goTo('/forgot-password')}>Forgot Password?</button>
            <button type="button" className="text-btn" onClick={() => goTo('/register')}>Create an Account</button>
          </div>
          <p className="demo-creds">
            Demo: admin@rentease.com / admin123 | owner@rentease.com / owner123 | renter@rentease.com / renter123
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
