import { BrandHeader, ContentShell, TabBar } from '../common/layoutHelpers'

function AllUsers({ goTo, userName, onLogout, users, onToggleGrant }) {
  const tabs = [
    { label: 'All Users', active: true, onClick: () => goTo('/admin/users') },
    { label: 'All Properties', onClick: () => goTo('/admin/properties') },
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
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Granted (Owners Only)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-accent">{user.type}</td>
                  <td className={user.granted ? 'text-green' : ''}>{user.type === 'Owner' ? (user.granted ? 'granted' : 'not granted') : '-'}</td>
                  <td>
                    {user.type === 'Owner' ? (
                      <button className={`btn small ${user.granted ? 'btn-danger' : 'btn-success'}`} onClick={() => onToggleGrant(user.id)}>
                        {user.granted ? 'Ungrant' : 'Grant'}
                      </button>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentShell>
    </div>
  )
}

export default AllUsers
