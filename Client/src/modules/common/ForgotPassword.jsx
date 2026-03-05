import { useState } from 'react'
import { BrandHeader } from './layoutHelpers'

function ForgotPassword({ goTo, onDone }) {
  const [email, setEmail] = useState('')

  const submit = (event) => {
    event.preventDefault()
    onDone(`Reset link sent to ${email}`)
    goTo('/login')
  }

  return (
    <div className="page dark-bg">
      <BrandHeader rightLinks={[{ label: 'Back to Login', onClick: () => goTo('/login') }]} />
      <div className="auth-wrap">
        <form className="auth-card" onSubmit={submit}>
          <h2>Forgot Password</h2>
          <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="btn btn-primary full-width" type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
