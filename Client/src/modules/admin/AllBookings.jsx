import { BrandHeader, ContentShell, TabBar } from '../common/layoutHelpers'

function AllBookings({ goTo, userName, onLogout, bookings }) {
  const tabs = [
    { label: 'All Users', onClick: () => goTo('/admin/users') },
    { label: 'All Properties', onClick: () => goTo('/admin/properties') },
    { label: 'All Bookings', active: true, onClick: () => goTo('/admin/bookings') },
  ]

  return (
    <div className="page dark-bg">
      <BrandHeader userName={userName} onLogout={onLogout} />
      <ContentShell>
        <TabBar tabs={tabs} />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Owner ID</th>
                <th>Property ID</th>
                <th>Tenant ID</th>
                <th>Tenant Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.ownerId}</td>
                  <td className="text-accent">{booking.propertyId}</td>
                  <td>{booking.tenantId}</td>
                  <td>{booking.tenantName}</td>
                  <td className={booking.status === 'booked' ? 'text-green' : 'text-yellow'}>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentShell>
    </div>
  )
}

export default AllBookings
