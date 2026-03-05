import { useState } from 'react'
import { BrandHeader, ContentShell, TabBar } from '../../common/layoutHelpers'

function AddProperty({ goTo, userName, onLogout, onAddProperty, onNotify }) {
  const [form, setForm] = useState({
    propertyType: 'residential',
    adType: 'rent',
    address: '',
    amount: '',
    ownerContact: '',
    image: '',
  })

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const submit = (event) => {
    event.preventDefault()
    const payload = {
      ...form,
      amount: form.amount.startsWith('₹') ? form.amount : `₹${form.amount}`,
    }
    onAddProperty(payload)
    onNotify('Property added successfully', 'success')
    goTo('/owner/properties')
  }

  return (
    <div className="page dark-bg">
      <BrandHeader userName={userName} onLogout={onLogout} />
      <ContentShell>
        <TabBar
          tabs={[
            { label: 'Add Property', active: true, onClick: () => goTo('/owner/add-property') },
            { label: 'All Properties', onClick: () => goTo('/owner/properties') },
            { label: 'All Bookings', onClick: () => goTo('/owner/bookings') },
          ]}
        />
        <form className="panel-form" onSubmit={submit}>
          <h3>Add Property</h3>
          <div className="form-grid">
            <select value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)}>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            <select value={form.adType} onChange={(e) => update('adType', e.target.value)}>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
            <input placeholder="Owner Contact" value={form.ownerContact} onChange={(e) => update('ownerContact', e.target.value)} required />
            <input placeholder="Amount" value={form.amount} onChange={(e) => update('amount', e.target.value)} required />
          </div>
          <input placeholder="Image URL (optional)" value={form.image} onChange={(e) => update('image', e.target.value)} />
          <textarea placeholder="Full Address" value={form.address} onChange={(e) => update('address', e.target.value)} required />
          <button className="btn btn-primary" type="submit">Add Property</button>
        </form>
      </ContentShell>
    </div>
  )
}

export default AddProperty
