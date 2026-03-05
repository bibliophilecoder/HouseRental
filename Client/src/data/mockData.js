const OWNER_ID = '688b463d063716ceb023e78f'

export const seedUsers = [
  {
    id: OWNER_ID,
    name: 'Pravanshu',
    email: 'owner@rentease.com',
    password: 'owner123',
    type: 'Owner',
    granted: true,
  },
  {
    id: '688b4dbfca9074cab4d275a1',
    name: 'Abhi',
    email: 'admin@rentease.com',
    password: 'admin123',
    type: 'Admin',
    granted: true,
  },
  {
    id: '688b5e0a05978e69d8499d7f',
    name: 'Ram',
    email: 'renter@rentease.com',
    password: 'renter123',
    type: 'Renter',
    granted: false,
  },
]

export const seedProperties = [
  {
    id: '688b5b2d05978e69d8499d5d',
    ownerId: OWNER_ID,
    propertyType: 'residential',
    adType: 'rent',
    address: '17, 4th Cross, Indiranagar 2nd Stage, Bengaluru, Karnataka - 560038',
    ownerContact: '+91 98765 43210',
    amount: '₹35000',
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '688b5c2205978e69d8499d66',
    ownerId: OWNER_ID,
    propertyType: 'commercial',
    adType: 'sale',
    address: '102, Hosur Road, Near Forum Mall, Koramangala, Bengaluru - 560095',
    ownerContact: '+91 90123 45678',
    amount: '₹18000000',
    availability: 'Unavailable',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '688b5c4705978e69d8499d6b',
    ownerId: OWNER_ID,
    propertyType: 'residential',
    adType: 'rent',
    address: '235, 6th Main, JP Nagar Phase 7, Bengaluru, Karnataka - 560078',
    ownerContact: '+91 99876 54321',
    amount: '₹8500000',
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '688b5c8705978e69d8499d70',
    ownerId: OWNER_ID,
    propertyType: 'commercial',
    adType: 'rent',
    address: '56, 2nd Floor, Brigade Road, MG Road, Bengaluru - 560001',
    ownerContact: '+91 91234 56789',
    amount: '₹120000',
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&w=1200&q=80',
  },
]

export const seedBookings = [
  {
    id: '688b5e725c396ccf12e2b4ad',
    ownerId: OWNER_ID,
    propertyId: '688b5c2205978e69d8499d66',
    tenantId: '688b5e0a05978e69d8499d7f',
    tenantName: 'Ram Agrawal',
    tenantPhone: '913847384567',
    status: 'booked',
  },
  {
    id: '688b5f415c396ccf12e2b4ba',
    ownerId: OWNER_ID,
    propertyId: '688b5c4705978e69d8499d6b',
    tenantId: '688b5e0a05978e69d8499d7f',
    tenantName: 'Ram Agrawal',
    tenantPhone: '91456473247',
    status: 'pending',
  },
]

export const defaultDatabase = {
  users: seedUsers,
  properties: seedProperties,
  bookings: seedBookings,
}
