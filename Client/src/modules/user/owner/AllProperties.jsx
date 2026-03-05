import { BrandHeader, ContentShell, TabBar } from '../../common/layoutHelpers'

function AllProperties({ goTo, userName, onLogout, properties, onEdit, onDelete }) {
  return (
    <div className="page dark-bg">
      <BrandHeader userName={userName} onLogout={onLogout} />
      <ContentShell>
        <TabBar
          tabs={[
            { label: 'Add Property', onClick: () => goTo('/owner/add-property') },
            { label: 'All Properties', active: true, onClick: () => goTo('/owner/properties') },
            { label: 'All Bookings', onClick: () => goTo('/owner/bookings') },
          ]}
        />
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
                <th>Actions</th>
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
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-outline small" onClick={() => onEdit(property.id)}>Edit</button>
                      <button className="btn btn-danger-outline small" onClick={() => onDelete(property.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={8} className="empty-cell">No properties found. Add your first listing.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ContentShell>
    </div>
  )
}

export default AllProperties
