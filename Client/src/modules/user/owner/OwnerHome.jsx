import { BrandHeader, ContentShell, TabBar } from '../../common/layoutHelpers'

function OwnerHome({ goTo, userName, onLogout, properties, bookings }) {
  const tabs = [
    { label: 'Add Property', onClick: () => goTo('/owner/add-property') },
    { label: 'All Properties', onClick: () => goTo('/owner/properties') },
    { label: 'All Bookings', onClick: () => goTo('/owner/bookings') },
  ]

  return (
    <div className="page dark-bg">
      <BrandHeader userName={userName} onLogout={onLogout} />
      <ContentShell>
        <TabBar tabs={tabs} />
        <section className="stats-grid">
          <article className="stat-card"><h3>My Listings</h3><p>{properties.length}</p></article>
          <article className="stat-card"><h3>Bookings</h3><p>{bookings.length}</p></article>
          <article className="stat-card"><h3>Active</h3><p>{properties.filter((p) => p.availability === 'Available').length}</p></article>
          <article className="stat-card"><h3>Pending</h3><p>{bookings.filter((b) => b.status === 'pending').length}</p></article>
        </section>
      </ContentShell>
    </div>
  )
}

export default OwnerHome
