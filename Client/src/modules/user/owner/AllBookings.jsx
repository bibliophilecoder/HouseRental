import { BrandHeader, ContentShell, TabBar } from '../../common/layoutHelpers'

function AllBookings({ goTo, userName, onLogout, bookings, onToggleStatus }) {
  return (
    <div className="page dark-bg">
      <BrandHeader userName={userName} onLogout={onLogout} />
      <ContentShell>
        <TabBar
          tabs={[
            { label: 'Add Property', onClick: () => goTo('/owner/add-property') },
            { label: 'All Properties', onClick: () => goTo('/owner/properties') },
            { label: 'All Bookings', active: true, onClick: () => goTo('/owner/bookings') },
          ]}
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property ID</th>
                <th>Tenant Name</th>
                <th>Tenant Phone</th>
                <th>Booking Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.propertyId}</td>
                  <td>{booking.tenantName}</td>
                  <td>{booking.tenantPhone}</td>
                  <td className={booking.status === 'booked' ? 'text-green' : 'text-yellow'}>{booking.status}</td>
                  <td>
                    <button
                      className={`btn small ${booking.status === 'booked' ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => onToggleStatus(booking.id)}
                    >
                      {booking.status === 'booked' ? 'Mark Pending' : 'Mark Booked'}
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-cell">No booking requests yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ContentShell>
    </div>
  )
}

export default AllBookings
