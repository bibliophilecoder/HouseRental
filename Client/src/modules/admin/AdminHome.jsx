import { BrandHeader, ContentShell, TabBar } from '../common/layoutHelpers'

function AdminHome({ goTo, userName, onLogout, adminStats }) {
  const tabs = [
    { label: 'All Users', onClick: () => goTo('/admin/users') },
    { label: 'All Properties', onClick: () => goTo('/admin/properties') },
    { label: 'All Bookings', onClick: () => goTo('/admin/bookings') },
  ]

  return (
    <div className="page dark-bg">
      <BrandHeader userName={userName} onLogout={onLogout} />
      <ContentShell>
        <TabBar tabs={tabs} />
        <section className="stats-grid">
          <article className="stat-card"><h3>Total Users</h3><p>{adminStats.users}</p></article>
          <article className="stat-card"><h3>Total Properties</h3><p>{adminStats.properties}</p></article>
          <article className="stat-card"><h3>Total Bookings</h3><p>{adminStats.bookings}</p></article>
          <article className="stat-card"><h3>Owners Granted</h3><p>{adminStats.ownersGranted}</p></article>
        </section>
      </ContentShell>
    </div>
  )
}

export default AdminHome
