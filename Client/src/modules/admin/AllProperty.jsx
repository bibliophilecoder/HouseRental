import { BrandHeader, ContentShell, TabBar } from '../common/layoutHelpers'

function AllProperty({ goTo, userName, onLogout, properties }) {
  const tabs = [
    { label: 'All Users', onClick: () => goTo('/admin/users') },
    { label: 'All Properties', active: true, onClick: () => goTo('/admin/properties') },
    { label: 'All Bookings', onClick: () => goTo('/admin/bookings') },
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
                <th>Property ID</th>
                <th>Property Type</th>
                <th>Ad Type</th>
                <th>Address</th>
                <th>Owner Contact</th>
                <th>Amount</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.propertyType}</td>
                  <td>{property.adType}</td>
                  <td>{property.address}</td>
                  <td>{property.ownerContact}</td>
                  <td>{property.amount}</td>
                  <td className={property.availability === 'Available' ? 'text-green' : 'text-red'}>{property.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentShell>
    </div>
  )
}

export default AllProperty
