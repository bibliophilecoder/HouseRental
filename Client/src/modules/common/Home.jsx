import { useEffect, useState } from 'react'
import AllPropertiesCards from '../user/AllPropertiesCards'
import { BrandHeader } from './layoutHelpers'

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1800&q=80',
    title: 'Find Your Dream Rental Property',
    subtitle: 'Comfort, Convenience & Class - All in One Place',
  },
  {
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1800&q=80',
    title: 'Premium Homes In Prime Locations',
    subtitle: 'Curated listings from trusted owners',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80',
    title: 'Book Faster With Smart Filters',
    subtitle: 'Search, compare, and schedule instantly',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
    title: 'Built For Renters, Owners, and Admins',
    subtitle: 'One platform to manage the full rental lifecycle',
  },
]

function Home({ goTo, user, properties }) {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const links = [
    { label: 'Home', active: true, onClick: () => goTo('/') },
    { label: 'Login', active: false, onClick: () => goTo('/login') },
    { label: 'Register', active: false, onClick: () => goTo('/register') },
  ]

  return (
    <div className="page dark-bg">
      <BrandHeader rightLinks={links} />
      <section
        className="hero-banner"
        style={{ backgroundImage: `url(${heroSlides[slideIndex].image})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h2>{heroSlides[slideIndex].title}</h2>
          <p>{heroSlides[slideIndex].subtitle}</p>
          <div className="dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot ${index === slideIndex ? 'active' : ''}`}
                onClick={() => setSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <h3 className="section-title">Explore Our Premium Properties</h3>
        {!user && (
          <p className="owner-hint">
            Looking to post your property?{' '}
            <button className="btn btn-outline" onClick={() => goTo('/register')}>
              Register as Owner
            </button>
          </p>
        )}
        <div className="cards-grid cards-grid-home">
          {properties.slice(0, 3).map((property) => (
            <AllPropertiesCards
              key={property.id}
              property={property}
              ctaLabel={user ? 'Get Info / Book' : 'Login to see details'}
              showOwner={!!user}
              onAction={() => goTo(user ? '/renter/properties' : '/login')}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
