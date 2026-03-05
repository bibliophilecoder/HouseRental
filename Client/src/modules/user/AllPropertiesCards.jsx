function AllPropertiesCards({
  property,
  ctaLabel = 'Get Info / Book',
  showOwner = true,
  showPrice = true,
  onAction,
}) {
  const disabled = property.availability !== 'Available'

  return (
    <article className="property-card">
      <img src={property.image} alt={property.address} className="property-image" />
      <div className="property-body">
        <h3>{property.address}</h3>
        <p className="muted-text">{property.propertyType} - {property.adType}</p>
        {showOwner && <p><strong>Owner:</strong> {property.ownerContact}</p>}
        <p>
          <strong>Availability:</strong>{' '}
          <span className={disabled ? 'text-red' : 'text-green'}>{property.availability}</span>
        </p>
        {showPrice && <p><strong>Price:</strong> {property.amount}</p>}
        <button className="btn btn-primary full-width" disabled={disabled} onClick={() => onAction?.(property.id)}>
          {disabled ? 'Not Available' : ctaLabel}
        </button>
      </div>
    </article>
  )
}

export default AllPropertiesCards
