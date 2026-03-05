import { BrandHeader, ContentShell, TabBar } from '../../common/layoutHelpers'

function RenterHome({ goTo, userName, onLogout, bookings }) {
  return (
    <div className="page dark-bg">
      <BrandHeader userName={userName} onLogout={onLogout} />
      <ContentShell>
        <TabBar
          tabs={[
            { label: 'All Properties', onClick: () => goTo('/renter/properties') },
            { label: 'Booking History', active: true, onClick: () => goTo('/renter/bookings') },
          ]}
        />
        <div className="sub-panel">
          <h3>All My Bookings</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Property ID</th>
                  <th>Tenant Name</th>
                  <th>Phone</th>
                  <th>Booking Status</th>
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
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="empty-cell">No bookings yet. Browse properties to place a request.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </ContentShell>
    </div>
  )
}

export default RenterHome
