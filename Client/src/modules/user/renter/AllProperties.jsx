import { useMemo, useState } from 'react'
import AllPropertiesCards from '../AllPropertiesCards'
import { BrandHeader, ContentShell, TabBar } from '../../common/layoutHelpers'

function RenterAllProperties({ goTo, userName, onLogout, isGuest = false, properties, onBookProperty }) {
  const [search, setSearch] = useState('')
  const [adType, setAdType] = useState('all')
  const [type, setType] = useState('all')

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const matchSearch = property.address.toLowerCase().includes(search.toLowerCase())
      const matchAd = adType === 'all' || property.adType === adType
      const matchType = type === 'all' || property.propertyType === type
      return matchSearch && matchAd && matchType
    })
  }, [properties, search, adType, type])

  return (
    <div className="page dark-bg">
      <BrandHeader
        userName={isGuest ? null : userName}
        onLogout={isGuest ? null : onLogout}
        rightLinks={
          isGuest
            ? [
                { label: 'Home', onClick: () => goTo('/') },
                { label: 'Login', onClick: () => goTo('/login') },
                { label: 'Register', active: true, onClick: () => goTo('/register') },
              ]
            : []
        }
      />
      <ContentShell>
        {!isGuest && (
          <TabBar
            tabs={[
              { label: 'All Properties', active: true, onClick: () => goTo('/renter/properties') },
              { label: 'Booking History', onClick: () => goTo('/renter/bookings') },
            ]}
          />
        )}

        <div className="filters-row">
          <input placeholder="Search by Address" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={adType} onChange={(e) => setAdType(e.target.value)}>
            <option value="all">All Ad Types</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className="cards-grid">
          {filtered.map((property) => (
            <AllPropertiesCards
              key={property.id}
              property={property}
              ctaLabel={isGuest ? 'Login to see details' : 'Get Info / Book'}
              showOwner={!isGuest}
              onAction={(id) => (isGuest ? goTo('/login') : onBookProperty?.(id))}
            />
          ))}
        </div>
      </ContentShell>
    </div>
  )
}

export default RenterAllProperties
