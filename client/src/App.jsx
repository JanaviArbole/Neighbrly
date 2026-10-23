import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEYS = {
  users: 'neighbrly_demo_users',
  providers: 'neighbrly_demo_providers',
  enquiries: 'neighbrly_demo_enquiries',
  session: 'neighbrly_demo_session',
  favorites: 'neighbrly_demo_favorites',
}

const initialProviders = [
  {
    id: 'p1',
    businessName: 'BrightSpark Electricals',
    ownerName: 'Amit Sharma',
    category: 'Electrical',
    description: 'Home electrical repairs, installations, fan fitting, lighting, and safety checks.',
    phone: '+919876543210',
    area: 'Kothrud, Pune',
    priceFrom: 299,
    rating: 4.8,
    reviewCount: 42,
    hours: 'Mon–Sat, 9:00 AM–7:00 PM',
    verified: true,
    active: true,
    services: ['Electrical repairs', 'Fan installation', 'Lighting'],
  },
  {
    id: 'p2',
    businessName: 'PipeCare Plumbing',
    ownerName: 'Rahul Patil',
    category: 'Plumbing',
    description: 'Reliable plumbing for leaks, taps, bathroom fittings, and water-line maintenance.',
    phone: '+919876543211',
    area: 'Baner, Pune',
    priceFrom: 249,
    rating: 4.7,
    reviewCount: 31,
    hours: 'Mon–Sun, 8:00 AM–8:00 PM',
    verified: true,
    active: true,
    services: ['Leak repair', 'Tap fitting', 'Bathroom plumbing'],
  },
  {
    id: 'p3',
    businessName: 'NeatNest Home Cleaning',
    ownerName: 'Priya Deshmukh',
    category: 'Cleaning',
    description: 'Deep cleaning and regular home cleaning with flexible appointment slots.',
    phone: '+919876543212',
    area: 'Aundh, Pune',
    priceFrom: 799,
    rating: 4.9,
    reviewCount: 56,
    hours: 'Mon–Sat, 9:00 AM–6:00 PM',
    verified: true,
    active: true,
    services: ['Deep cleaning', 'Kitchen cleaning', 'Regular cleaning'],
  },
  {
    id: 'p4',
    businessName: 'WoodWorks by Sameer',
    ownerName: 'Sameer Kulkarni',
    category: 'Carpentry',
    description: 'Furniture assembly, door repairs, shelves, and custom woodwork.',
    phone: '+919876543213',
    area: 'Wakad, Pune',
    priceFrom: 399,
    rating: 4.6,
    reviewCount: 24,
    hours: 'Mon–Sat, 10:00 AM–7:00 PM',
    verified: false,
    active: true,
    services: ['Furniture repair', 'Shelf installation', 'Door repairs'],
  },
  {
    id: 'p5',
    businessName: 'ColourCraft Painters',
    ownerName: 'Neha Joshi',
    category: 'Painting',
    description: 'Interior painting, touch-ups, wall preparation, and colour consultation.',
    phone: '+919876543214',
    area: 'Pimple Saudagar, Pune',
    priceFrom: 1499,
    rating: 4.5,
    reviewCount: 19,
    hours: 'Mon–Sat, 9:00 AM–6:00 PM',
    verified: true,
    active: true,
    services: ['Interior painting', 'Touch-ups', 'Colour consultation'],
  },
  {
    id: 'p6',
    businessName: 'FixRight Appliance Care',
    ownerName: 'Vikas More',
    category: 'Appliances',
    description: 'Maintenance and repair support for common household appliances.',
    phone: '+919876543215',
    area: 'Shivajinagar, Pune',
    priceFrom: 349,
    rating: 4.4,
    reviewCount: 27,
    hours: 'Mon–Sun, 10:00 AM–7:00 PM',
    verified: false,
    active: true,
    services: ['Appliance diagnostics', 'Maintenance', 'Installation'],
  },
  {
    id: 'p7',
    businessName: 'Nigdi Neighbourhood Plumbing',
    ownerName: 'Demo Provider — Rohan',
    category: 'Plumbing',
    description: 'Sample listing for tap repairs, leakage checks, and small plumbing jobs in Nigdi.',
    phone: '',
    area: 'Nigdi, Pimpri-Chinchwad, Pune',
    priceFrom: 249,
    rating: 4.6,
    reviewCount: 12,
    hours: 'Mon–Sat, 9:00 AM–6:00 PM',
    verified: false,
    active: true,
    isSample: true,
    services: ['Tap repairs', 'Leak checks', 'Fitting replacement'],
  },
  {
    id: 'p8',
    businessName: 'Lane No. 3 Home Repairs',
    ownerName: 'Demo Provider — Sameer',
    category: 'Carpentry',
    description: 'Sample listing for minor furniture repairs, shelf fitting, and household fixes.',
    phone: '',
    area: 'Lane No. 3, Pune',
    priceFrom: 299,
    rating: 4.5,
    reviewCount: 9,
    hours: 'Mon–Sat, 10:00 AM–6:00 PM',
    verified: false,
    active: true,
    isSample: true,
    services: ['Furniture repair', 'Shelf fitting', 'Small household fixes'],
  },
  {
    id: 'p9',
    businessName: 'Everyday Essentials — Nigdi',
    ownerName: 'Demo Provider — Asha',
    category: 'Groceries',
    description: 'Sample local grocery listing for everyday essentials and household basics.',
    phone: '',
    area: 'Nigdi, Pimpri-Chinchwad, Pune',
    priceFrom: 0,
    rating: 4.3,
    reviewCount: 7,
    hours: 'Daily, 8:00 AM–9:00 PM',
    verified: false,
    active: true,
    isSample: true,
    services: ['Everyday essentials', 'Household basics'],
  },
]

const categories = [
  { name: 'Plumbing', icon: '⌁', description: 'Leaks, taps & fittings', tint: 'mint', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=82' },
  { name: 'Electrical', icon: 'ϟ', description: 'Repairs & installations', tint: 'yellow', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=82' },
  { name: 'Carpentry', icon: '⌘', description: 'Furniture & woodwork', tint: 'peach', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=82' },
  { name: 'Cleaning', icon: '✳', description: 'A cleaner, fresher home', tint: 'blue', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=82' },
  { name: 'Painting', icon: '◒', description: 'Walls & interiors', tint: 'pink', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=82' },
  { name: 'Appliances', icon: '⚙', description: 'Repairs & maintenance', tint: 'lavender', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=82' },
  { name: 'Healthcare', icon: '✚', description: 'Clinics & pharmacies', tint: 'mint', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=82' },
  { name: 'Groceries', icon: '▤', description: 'Everyday essentials', tint: 'yellow', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=82' },
]


const SERVICE_CATALOG = {
  Plumbing: [
    'Tap and faucet repair', 'Leaking pipe repair', 'Drain and sink unclogging',
    'Toilet repair and flush replacement', 'Washbasin installation', 'Bathroom fitting installation',
    'Shower and mixer installation', 'Water tank cleaning', 'Water motor and pump repair',
    'Pipeline installation and replacement', 'Water leakage inspection', 'Geyser connection support',
    'Kitchen sink installation', 'Emergency plumbing visit',
  ],
  Electrical: [
    'Electrical fault diagnosis', 'Switch and socket repair', 'Fan installation and repair',
    'Light and LED installation', 'MCB and fuse repair', 'Wiring and rewiring',
    'Inverter installation support', 'Doorbell installation', 'Earthing and safety checks',
    'Appliance power connection', 'Short-circuit inspection', 'Emergency electrical visit',
  ],
  Carpentry: [
    'Door and lock repair', 'Furniture assembly', 'Wardrobe repair',
    'Shelf and curtain-rod installation', 'Hinge and handle replacement', 'Bed and table repair',
    'Modular kitchen adjustments', 'Wood polishing', 'Custom woodwork',
  ],
  Cleaning: [
    'Full home deep cleaning', 'Kitchen cleaning', 'Bathroom cleaning',
    'Sofa and upholstery cleaning', 'Move-in / move-out cleaning', 'Window and balcony cleaning',
    'Regular housekeeping', 'Mattress cleaning', 'Post-renovation cleanup',
  ],
  Painting: [
    'Interior wall painting', 'Exterior painting', 'Wall touch-ups',
    'Putty and surface preparation', 'Waterproof coating', 'Texture painting',
    'Colour consultation', 'Door and grill painting',
  ],
  Appliances: [
    'Washing machine repair', 'Refrigerator repair', 'Air conditioner servicing',
    'Microwave repair', 'Water purifier service', 'Chimney servicing',
    'Installation and uninstallation', 'Appliance inspection and maintenance',
  ],
  Healthcare: [
    'Nearby clinic discovery', 'General physician consultation', 'Dental clinic discovery',
    'Diagnostic laboratory discovery', 'Pharmacy and medicine availability enquiry',
    'Physiotherapy clinic discovery', 'Eye-care clinic discovery',
  ],
  Groceries: [
    'Daily groceries', 'Fresh fruits and vegetables', 'Dairy and bakery essentials',
    'Household cleaning supplies', 'Packaged food and staples', 'Local store delivery enquiry',
  ],
}

const CITY_AREAS = {
  Pune: ['All Pune areas', 'Pimpri-Chinchwad', 'Nigdi', 'Akurdi', 'Pradhikaran', 'Kothrud', 'Baner', 'Aundh', 'Wakad', 'Hinjawadi', 'Pimple Saudagar', 'Shivajinagar', 'Hadapsar', 'Kondhwa', 'Viman Nagar', 'Lane No. 3'],
  Mumbai: ['All Mumbai areas', 'Andheri', 'Bandra', 'Borivali', 'Dadar', 'Powai'],
  Bengaluru: ['All Bengaluru areas', 'Whitefield', 'Indiranagar', 'Koramangala', 'Jayanagar', 'Hebbal'],
  Hyderabad: ['All Hyderabad areas', 'Gachibowli', 'Madhapur', 'Kukatpally', 'Secunderabad', 'Banjara Hills'],
  Delhi: ['All Delhi areas', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh', 'Lajpat Nagar'],
}

const CATEGORY_IMAGES = Object.fromEntries(categories.map(category => [category.name, category.image]))

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The app still works for the current session if storage is unavailable.
  }
}

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    store: <><path d="M3 10h18l-2-6H5Z" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name] || paths.arrow}
    </svg>
  )
}

function Button({ children, variant = 'primary', className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>
}

function Brand({ onClick }) {
  return <button className="brand" onClick={onClick} aria-label="Go to Neighbrly homepage"><img src="/neighbrly-mark.svg" alt="" className="brand-mark" />neighbrly<span>.</span></button>
}

function Header({ onNavigate, session, onLogout, locationName }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand onClick={() => onNavigate('home')} />
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
          <button onClick={() => { onNavigate('home', { scrollTo: 'categories' }); setMenuOpen(false) }}>Explore services</button>
          <button onClick={() => { onNavigate('providers'); setMenuOpen(false) }}>Find a professional</button>
          <button onClick={() => { onNavigate('provider-signup'); setMenuOpen(false) }}>List your business</button>
        </nav>
        <div className="header-actions">
          <span className="location-chip"><Icon name="pin" size={15} /> {locationName || 'Choose your area'}</span>
          {session ? (
            <>
              <Button variant="ghost" onClick={() => onNavigate(session.role === 'provider' ? 'provider-dashboard' : 'resident-dashboard')}>My dashboard</Button>
              <button className="avatar-button" title="Sign out" onClick={onLogout}><Icon name="logout" size={17} /></button>
            </>
          ) : (
            <>
              <button className="sign-in-link" onClick={() => onNavigate('resident-login')}>Sign in</button>
              <Button onClick={() => onNavigate('resident-signup')}>Get started <Icon name="arrow" size={16} /></Button>
            </>
          )}
          <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        </div>
      </div>
    </header>
  )
}

function CategoryCard({ category, onClick }) {
  return (
    <button className="category-card" onClick={() => onClick(category.name)}>
      <span className="category-photo-wrap"><img className="category-photo" src={category.image} alt={`${category.name} service`} loading="lazy" onError={event => { event.currentTarget.style.display = 'none' }} /><span className="category-photo-overlay" /></span>
      <span className={`category-icon ${category.tint}`}>{category.icon}</span>
      <span className="category-name">{category.name}</span>
      <span className="category-description">{category.description}</span>
      <span className="category-arrow"><Icon name="arrow" size={17} /></span>
    </button>
  )
}

function ProviderCard({ provider, onOpen, favorite, onFavorite }) {
  return (
    <article className="provider-card">
      <div className={`provider-art art-${provider.category.toLowerCase()}`}>
        {CATEGORY_IMAGES[provider.category] && <img src={CATEGORY_IMAGES[provider.category]} alt={`${provider.category} service`} loading="lazy" onError={event => { event.currentTarget.style.display = 'none' }} />}
        <span className="provider-art-mark">{provider.category === 'Electrical' ? 'ϟ' : provider.category === 'Plumbing' ? '⌁' : provider.category === 'Cleaning' ? '✳' : '✦'}</span>
        <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} aria-label={favorite ? 'Remove favourite' : 'Add favourite'} onClick={(event) => { event.stopPropagation(); onFavorite(provider.id) }}><Icon name="heart" size={18} /></button>
      </div>
      <div className="provider-card-body">
        <div className="provider-card-topline">
          <span className="small-category">{provider.category}</span>
          {provider.isSample && <span className="sample-pill">Sample data</span>}{provider.verified && <span className="verified-pill"><Icon name="check" size={12} /> Demo verified</span>}
        </div>
        <button className="provider-title" onClick={() => onOpen(provider)}>{provider.businessName}</button>
        <div className="provider-meta"><span className="rating">★ {Number(provider.rating || 0).toFixed(1)}</span><span>({provider.reviewCount || 0} reviews)</span><span>·</span><span>{provider.area}</span></div>
        <p>{provider.description}</p>
        <div className="provider-card-footer"><span>From <strong>₹{Number(provider.priceFrom || 0).toLocaleString('en-IN')}</strong></span><button onClick={() => onOpen(provider)}>View details <Icon name="arrow" size={15} /></button></div>
      </div>
    </article>
  )
}

function HomePage({ onNavigate, providers, onCategory, onOpenProvider, favorites, onFavorite, locationName, onChooseLocation }) {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('Pune')
  const [area, setArea] = useState('All Pune areas')
  const place = area === 'All Pune areas' || area.startsWith('All ') ? city : `${area}, ${city}`
  const [geoMessage, setGeoMessage] = useState('')
  const filtered = useMemo(() => providers.filter(p => p.active && `${p.businessName} ${p.category} ${p.description} ${p.area}`.toLowerCase().includes(search.toLowerCase().trim())), [providers, search])
  const useLocation = () => {
    if (!navigator.geolocation) {
      setGeoMessage('Location is not supported by this browser. You can choose your area manually.')
      return
    }
    setGeoMessage('Requesting location permission…')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const label = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
        setCity('Pune')
        setArea('All Pune areas')
        onChooseLocation(label)
        setGeoMessage('Location detected. Nearby search can be connected to geographic queries later.')
      },
      () => setGeoMessage('Location permission was not granted. You can still search by neighbourhood.'),
      { enableHighAccuracy: false, timeout: 8000 }
    )
  }
  return (
    <>
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEIGHBOURHOOD, CONNECTED</div>
            <h1>Good people.<br /><span>Right around you.</span></h1>
            <p className="hero-description">From the leaky tap to the perfect paint job, discover the local people who make your neighbourhood feel like home.</p>
            <div className="hero-actions">
              <Button onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}>Explore local services <Icon name="arrow" size={17} /></Button>
              <button className="text-action" onClick={() => onNavigate('provider-signup')}>I provide services <span>↗</span></button>
            </div>
          </div>
          <div className="hero-visual hero-photo-wrap">
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=88"
              alt="Welcoming residential home with a warm, lived-in neighbourhood feel"
              loading="eager"
              fetchPriority="high"
            />
            <div className="hero-photo-shade" />
            <div className="floating-note note-top"><span className="note-icon mint"><Icon name="check" size={16} /></span><div><strong>Local, not far away</strong><small>Services around your area</small></div></div>
            <div className="floating-note note-bottom"><span className="note-icon peach">✦</span><div><strong>Your next great find</strong><small>Starts just around the corner</small></div></div>
          </div>
        </div>
        <div className="search-panel" id="discover">
          <div className="search-field"><Icon name="search" size={21} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="What service are you looking for?" aria-label="Search local services" onKeyDown={e => { if (e.key === 'Enter') onNavigate('providers', { search }) }} /></div>
          <div className="search-divider" />
          <div className="location-field location-selects"><Icon name="pin" size={20} /><select value={city} aria-label="Choose city" onChange={event => { const nextCity = event.target.value; setCity(nextCity); setArea(CITY_AREAS[nextCity][0]) }}><option value="Pune">Pune</option><option value="Mumbai">Mumbai</option><option value="Bengaluru">Bengaluru</option><option value="Hyderabad">Hyderabad</option><option value="Delhi">Delhi</option></select><select value={area} aria-label="Choose neighbourhood" onChange={event => setArea(event.target.value)}>{CITY_AREAS[city].map(locality => <option key={locality} value={locality}>{locality}</option>)}</select><button title="Use my location" onClick={useLocation}>◎</button></div>
          <Button onClick={() => { onChooseLocation(place); onNavigate('providers', { search, area: place, city, locality: area }) }}>Search <Icon name="arrow" size={16} /></Button>
          {geoMessage && <p className="geo-message">{geoMessage}</p>}
        </div>
      </section>

      <section className="section category-section" id="categories">
        <div className="section-heading"><div><div className="eyebrow">A LITTLE HELP GOES A LONG WAY</div><h2>What do you need today?</h2><p>Everyday help, from people who know your neighbourhood.</p></div><button className="section-link" onClick={() => onNavigate('providers')}>View all services <Icon name="arrow" size={16} /></button></div>
        <div className="category-grid">{categories.map(category => <CategoryCard key={category.name} category={category} onClick={onCategory} />)}</div>
      </section>

      <section className="section featured-section">
        <div className="section-heading"><div><div className="eyebrow">LOCAL FINDS, RIGHT HERE</div><h2>Meet your local experts.</h2><p>Explore service providers listed in our demo directory.</p></div><button className="section-link" onClick={() => onNavigate('providers')}>Browse directory <Icon name="arrow" size={16} /></button></div>
        {filtered.length ? <div className="provider-grid">{filtered.slice(0, 3).map(provider => <ProviderCard key={provider.id} provider={provider} onOpen={onOpenProvider} favorite={favorites.includes(provider.id)} onFavorite={onFavorite} />)}</div> : <div className="empty-state"><span>⌕</span><h3>No matches just yet</h3><p>Try a different service or neighbourhood.</p><Button variant="secondary" onClick={() => setSearch('')}>Clear search</Button></div>}
      </section>

      <section className="section account-journey-section" id="account-options">
        <div className="section-heading"><div><div className="eyebrow">YOUR NEIGHBRLY JOURNEY</div><h2>What brings you here today?</h2><p>Choose the experience that fits you. You can always return and switch roles later.</p></div></div>
        <div className="account-journey-grid">
          <article className="account-journey-card"><span className="journey-icon"><Icon name="search" size={25} /></span><div className="eyebrow">FOR RESIDENTS</div><h3>Find help around you.</h3><p>Discover local professionals, save useful providers, and send enquiries for the work you need done.</p><div className="journey-actions"><Button onClick={() => onNavigate('resident-signup')}>Create resident account <Icon name="arrow" size={16} /></Button><button className="text-action" onClick={() => onNavigate('resident-login')}>Already registered? Sign in</button></div></article>
          <article className="account-journey-card provider-journey-card"><span className="journey-icon"><Icon name="store" size={25} /></span><div className="eyebrow">FOR LOCAL PROFESSIONALS</div><h3>Help your business get found.</h3><p>Create a service listing, manage your service areas and working hours, and review enquiries from nearby residents.</p><div className="journey-actions"><Button onClick={() => onNavigate('provider-signup')}>List your business <Icon name="arrow" size={16} /></Button><button className="text-action" onClick={() => onNavigate('provider-login')}>Already registered? Sign in</button></div></article>
        </div>
      </section>

      <section className="provider-cta"><div className="cta-art"><div className="cta-circle">✳</div><div className="cta-star">✦</div></div><div><div className="eyebrow">GROW WITH YOUR COMMUNITY</div><h2>Good at what you do?<br /><span>Let your neighbours know.</span></h2><p>Create a profile, share the services you offer, and help people nearby find you.</p><Button onClick={() => onNavigate('provider-signup')}>List your business <Icon name="arrow" size={16} /></Button></div></section>
    </>
  )
}

function AuthPage({ mode, onNavigate, onSubmit, error, success }) {
  const isProvider = mode.startsWith('provider')
  const isSignup = mode.endsWith('signup')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', community: 'Pune', businessName: '', category: 'Plumbing', description: '', area: 'Pune', priceFrom: '299', hours: 'Mon–Sat, 9:00 AM–6:00 PM' })
  const [showPassword, setShowPassword] = useState(false)
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const submit = (event) => {
    event.preventDefault()
    onSubmit({ ...form, role: isProvider ? 'provider' : 'resident' }, mode)
  }
  return (
    <main className="auth-layout">
      <aside className={`auth-aside ${isProvider ? 'provider-aside' : ''}`}>
        <button className="auth-back-brand" onClick={() => onNavigate('home')}>neighbrly<span>.</span></button>
        <div className="auth-aside-content"><div className="eyebrow">YOUR NEIGHBOURHOOD, CONNECTED</div><h1>{isProvider ? 'Your work deserves to be found.' : 'Feel at home, wherever you are.'}</h1><p>{isProvider ? 'Build your local presence and help nearby residents discover the services you offer.' : 'Find helpful people, useful services, and a little more peace of mind around the corner.'}</p><div className="auth-benefit-list"><div><span>✓</span> {isProvider ? 'Create a service profile' : 'Discover local professionals'}</div><div><span>✓</span> {isProvider ? 'Manage your listing' : 'Send an enquiry directly'}</div><div><span>✓</span> {isProvider ? 'Reach nearby residents' : 'Keep useful services together'}</div></div></div>
        <div className="auth-aside-footer">A little closer to home. <span>✳</span></div>
      </aside>
      <section className="auth-main"><button className="back-link" onClick={() => onNavigate('home')}>← Back to homepage</button><div className="auth-card"><div className="auth-card-top"><div className="eyebrow">{isProvider ? 'FOR LOCAL PROFESSIONALS' : 'FOR YOUR EVERYDAY LIFE'}</div><h2>{isSignup ? (isProvider ? 'Create your provider account' : 'Create your resident account') : (isProvider ? 'Welcome back, provider' : 'Welcome back')}</h2><p>{isSignup ? 'A few details to get you started.' : 'Sign in to continue to your Neighbrly space.'}</p></div>
        {error && <div className="form-alert error-alert">{error}</div>}{success && <div className="form-alert success-alert">{success}</div>}
        <form onSubmit={submit} className="form-stack">
          {isSignup && <div className="form-field"><label htmlFor="name">Full name</label><input id="name" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Janavi Arbole" autoComplete="name" /></div>}
          {isProvider && isSignup && <div className="form-field"><label htmlFor="businessName">Business or service name</label><input id="businessName" required value={form.businessName} onChange={e => update('businessName', e.target.value)} placeholder="e.g. BrightSpark Electricals" /></div>}
          <div className="form-field"><label htmlFor="email">Email address</label><input id="email" type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" autoComplete="email" /></div>
          {isSignup && <div className="form-field"><label htmlFor="phone">Phone number</label><input id="phone" type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" autoComplete="tel" /></div>}
          {isProvider && isSignup && <>
            <div className="form-row"><div className="form-field"><label htmlFor="category">Main service</label><select id="category" value={form.category} onChange={e => update('category', e.target.value)}>{['Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Painting', 'Appliances', 'Healthcare', 'Groceries', 'Other'].map(v => <option key={v}>{v}</option>)}</select></div><div className="form-field"><label htmlFor="priceFrom">Starting price (₹)</label><input id="priceFrom" type="number" min="0" value={form.priceFrom} onChange={e => update('priceFrom', e.target.value)} /></div></div>
            <div className="form-field"><label htmlFor="description">Describe your service</label><textarea id="description" required rows="3" value={form.description} onChange={e => update('description', e.target.value)} placeholder="What can you help people with?" /></div>
            <div className="form-row"><div className="form-field"><label htmlFor="area">Service area</label><input id="area" required value={form.area} onChange={e => update('area', e.target.value)} placeholder="Neighbourhood, city" /></div><div className="form-field"><label htmlFor="hours">Working hours</label><input id="hours" value={form.hours} onChange={e => update('hours', e.target.value)} /></div></div>
          </>}
          {!isProvider && isSignup && <div className="form-field"><label htmlFor="community">Neighbourhood or community</label><input id="community" required value={form.community} onChange={e => update('community', e.target.value)} placeholder="e.g. Kothrud, Pune" /></div>}
          <div className="form-field"><label htmlFor="password">Password</label><div className="password-wrap"><input id="password" type={showPassword ? 'text' : 'password'} minLength="6" required value={form.password} onChange={e => update('password', e.target.value)} placeholder={isSignup ? 'At least 6 characters for this demo' : 'Enter your password'} autoComplete={isSignup ? 'new-password' : 'current-password'} /><button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</button></div></div>
          {!isSignup && <div className="auth-forgot"><button type="button" onClick={() => window.alert('Password recovery is not connected in this frontend demo yet. Please contact the project team for help with your demo account.')}>Forgot password?</button></div>}
          {isSignup && <label className="consent-row"><input type="checkbox" required /> <span>I agree to the demo terms and understand this prototype stores sample data in this browser.</span></label>}
          <Button type="submit" className="full-button">{isSignup ? 'Create account' : 'Sign in'} <Icon name="arrow" size={16} /></Button>
        </form>
        <div className="auth-switch">{isSignup ? 'Already have an account?' : 'New to Neighbrly?'} <button onClick={() => onNavigate(isProvider ? (isSignup ? 'provider-login' : 'provider-signup') : (isSignup ? 'resident-login' : 'resident-signup'))}>{isSignup ? 'Sign in' : 'Create an account'}</button></div>
        <div className="role-switch"><span>{isProvider ? 'Looking for services instead?' : 'Do you offer local services?'}</span><button onClick={() => onNavigate(isProvider ? 'resident-login' : 'provider-login')}>{isProvider ? 'Resident sign in' : 'Provider sign in'}</button></div>
        </div></section>
    </main>
  )
}

function ProviderDirectory({ providers, onOpenProvider, onNavigate, favorites, onFavorite, initialSearch = '', initialArea = '' }) {
  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState('All services')
  const [city, setCity] = useState('Pune')
  const [area, setArea] = useState(() => { const candidate = initialArea.split(',')[0].trim(); return CITY_AREAS.Pune.includes(candidate) ? candidate : 'All Pune areas' })
  const selectedPlace = area.startsWith('All ') ? city : `${area}, ${city}`
  const filtered = providers.filter(p => {
    const textMatch = `${p.businessName} ${p.category} ${p.description} ${p.area}`.toLowerCase().includes(search.toLowerCase().trim())
    const areaText = (p.area || '').toLowerCase()
    const areaMatch = area.startsWith('All ') ? (!area.includes('Pune') || areaText.includes('pune')) : area.toLowerCase() === 'pimpri-chinchwad' ? (areaText.includes('pimpri-chinchwad') || areaText.includes('nigdi') || areaText.includes('akurdi') || areaText.includes('pradhikaran')) : areaText.includes(area.toLowerCase())
    const cityMatch = area.startsWith('All ') ? areaText.includes(city.toLowerCase()) : areaText.includes(city.toLowerCase()) && areaMatch
    return p.active && (category === 'All services' || p.category === category) && textMatch && cityMatch
  })
  return <main className="page-shell"><div className="page-intro"><button className="back-link" onClick={() => onNavigate('home')}>← Home</button><div className="eyebrow">YOUR LOCAL DIRECTORY</div><h1>Find your kind of help.</h1><p>Explore service providers and discover who can help nearby.</p></div><div className="directory-controls"><div className="directory-search"><Icon name="search" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by service or provider" /></div><div className="directory-location"><label>City<select value={city} onChange={e => { setCity(e.target.value); setArea(CITY_AREAS[e.target.value][0]) }}>{Object.keys(CITY_AREAS).map(c => <option key={c}>{c}</option>)}</select></label><label>Neighbourhood<select value={area} onChange={e => setArea(e.target.value)}>{CITY_AREAS[city].map(a => <option key={a}>{a}</option>)}</select></label></div><select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category"><option>All services</option>{categories.map(c => <option key={c.name}>{c.name}</option>)}</select></div><div className="directory-result-line"><strong>{filtered.length} {filtered.length === 1 ? 'provider' : 'providers'}</strong><span>Sample listings · {selectedPlace}</span></div>{filtered.length ? <div className="provider-grid directory-grid">{filtered.map(p => <ProviderCard key={p.id} provider={p} onOpen={onOpenProvider} favorite={favorites.includes(p.id)} onFavorite={onFavorite} />)}</div> : <div className="empty-state"><span>⌕</span><h3>No providers found</h3><p>Try a different category or neighbourhood.</p><Button variant="secondary" onClick={() => { setSearch(''); setArea(CITY_AREAS[city][0]); setCategory('All services') }}>Reset filters</Button></div>}</main>
}

function ProviderDetails({ provider, onNavigate, onEnquiry }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  if (!provider) return <main className="page-shell"><div className="empty-state"><h2>Provider not found</h2><Button onClick={() => onNavigate('providers')}>Browse providers</Button></div></main>
  const submit = event => {
    event.preventDefault()
    if (!form.message.trim()) { setError('Please tell the provider what help you need.'); return }
    onEnquiry({ ...form, providerId: provider.id, providerName: provider.businessName, createdAt: new Date().toISOString(), status: 'New' })
    setSent(true); setError('')
  }
  return <main className="page-shell detail-shell"><button className="back-link" onClick={() => onNavigate('providers')}>← Back to providers</button><div className="detail-layout"><section className="detail-main"><div className={`detail-banner art-${provider.category.toLowerCase()}`}><span>{provider.category === 'Electrical' ? 'ϟ' : provider.category === 'Plumbing' ? '⌁' : '✦'}</span><div className="detail-banner-label">LOCAL SERVICE PROFILE</div></div><div className="detail-heading"><div className="provider-card-topline"><span className="small-category">{provider.category}</span>{provider.verified && <span className="verified-pill"><Icon name="check" size={12} /> Verified profile</span>}</div><h1>{provider.businessName}</h1><p className="detail-owner">Listed by {provider.ownerName || 'Local service provider'}</p><div className="provider-meta detail-meta"><span className="rating">★ {Number(provider.rating || 0).toFixed(1)}</span><span>{provider.reviewCount || 0} reviews</span><span>·</span><span><Icon name="pin" size={15} /> {provider.area}</span></div><p className="detail-description">{provider.description}</p></div><div className="detail-info-grid"><div><span className="info-icon"><Icon name="clock" /></span><div><strong>Working hours</strong><p>{provider.hours || 'Contact provider for availability'}</p></div></div><div><span className="info-icon"><Icon name="pin" /></span><div><strong>Service area</strong><p>{provider.area}</p></div></div><div><span className="info-icon">₹</span><div><strong>Starting price</strong><p>From ₹{Number(provider.priceFrom || 0).toLocaleString('en-IN')}</p></div></div></div><div className="detail-services"><h2>Services offered</h2><p className="services-intro">Choose the specific service you need when sending your enquiry. Availability and final pricing are confirmed by the provider.</p><div className="service-tags">{[...new Set([...(provider.services || []), ...(SERVICE_CATALOG[provider.category] || [provider.category + ' services'])])].map(service => <span key={service}><Icon name="check" size={14} /> {service}</span>)}</div></div><div className="trust-note"><Icon name="check" size={18} /><div><strong>Know before you book</strong><p>{provider.verified ? 'This profile has been marked as verified in the demo directory. Always confirm details directly.' : 'This listing has not been verified by an administrator. Please confirm details before engaging.'}</p></div></div></section><aside className="enquiry-card"><div className="eyebrow">GET IN TOUCH</div><h2>Tell them what you need.</h2><p>Send an enquiry and the provider can follow up using the contact details you share.</p>{sent ? <div className="enquiry-success"><span><Icon name="check" size={24} /></span><h3>Enquiry submitted</h3><p>Your enquiry has been saved in this demo. You can see it in the resident dashboard after signing in with the same browser.</p><Button variant="secondary" onClick={() => onNavigate('home')}>Back to homepage</Button></div> : <form className="form-stack" onSubmit={submit}>{error && <div className="form-alert error-alert">{error}</div>}<div className="form-field"><label htmlFor="enqName">Your name</label><input id="enqName" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div><div className="form-field"><label htmlFor="enqEmail">Email address</label><input id="enqEmail" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div><div className="form-field"><label htmlFor="enqPhone">Phone number</label><input id="enqPhone" type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div><div className="form-field"><label htmlFor="enqMessage">What do you need?</label><textarea id="enqMessage" rows="4" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe the work or service you need…" /></div><Button type="submit" className="full-button">Send enquiry <Icon name="arrow" size={16} /></Button><small className="privacy-note">Demo only: your enquiry is stored in this browser, not sent to the provider.</small></form>}</aside></div></main>
}

function Dashboard({ session, providers, enquiries, favorites, onNavigate, onEditProvider, onToggleActive }) {
  const isProvider = session?.role === 'provider'
  const mine = providers.filter(p => p.ownerEmail === session?.email)
  const myEnquiries = enquiries.filter(e => isProvider ? mine.some(p => p.id === e.providerId) : true)
  return <main className="page-shell dashboard-shell"><div className="dashboard-welcome"><div><div className="eyebrow">{isProvider ? 'YOUR BUSINESS SPACE' : 'YOUR NEIGHBOURHOOD SPACE'}</div><h1>Hello, {session?.name?.split(' ')[0] || 'there'}.</h1><p>{isProvider ? 'Manage your profile and keep your service information up to date.' : 'Your local discoveries and enquiries, all in one place.'}</p></div><div className="dashboard-avatar">{(session?.name || 'N').slice(0, 1).toUpperCase()}</div></div><div className="dashboard-stats"><div><span>{isProvider ? 'Your listings' : 'Saved providers'}</span><strong>{isProvider ? mine.length : favorites.length}</strong></div><div><span>{isProvider ? 'New enquiries' : 'Enquiries sent'}</span><strong>{myEnquiries.length}</strong></div><div><span>Account type</span><strong>{isProvider ? 'Provider' : 'Resident'}</strong></div></div>
    {isProvider ? <section className="dashboard-panel"><div className="panel-heading"><div><h2>Your service listings</h2><p>Update the information neighbours see.</p></div><Button onClick={() => onEditProvider(null)}>+ Add service</Button></div>{mine.length ? <div className="dashboard-list">{mine.map(p => <div className="dashboard-list-item" key={p.id}><div className="mini-provider-art">{p.category.slice(0, 1)}</div><div className="dashboard-list-copy"><strong>{p.businessName}</strong><span>{p.category} · {p.area}</span><small>{p.verified ? 'Verified' : 'Pending verification'} · {p.active ? 'Published in demo directory' : 'Inactive'}</small></div><button className="small-outline" onClick={() => onEditProvider(p)}>Edit</button><button className="small-outline" onClick={() => onToggleActive(p.id)}>{p.active ? 'Deactivate' : 'Activate'}</button></div>)}</div> : <div className="empty-inline"><h3>Your provider profile starts here</h3><p>Create a listing to showcase your services to nearby residents.</p><Button onClick={() => onEditProvider(null)}>Create your first listing</Button></div>}</section> : <section className="dashboard-panel"><div className="panel-heading"><div><h2>Your saved providers</h2><p>Quick access to the services you want to remember.</p></div><Button variant="secondary" onClick={() => onNavigate('providers')}>Find services</Button></div>{favorites.length ? <div className="dashboard-list">{providers.filter(p => favorites.includes(p.id)).map(p => <div className="dashboard-list-item" key={p.id}><div className="mini-provider-art">{p.category.slice(0, 1)}</div><div className="dashboard-list-copy"><strong>{p.businessName}</strong><span>{p.category} · {p.area}</span></div><button className="small-outline" onClick={() => onNavigate('provider-details', { providerId: p.id })}>View</button></div>)}</div> : <div className="empty-inline"><h3>No saved providers yet</h3><p>Save a provider from the directory and it will appear here.</p><Button onClick={() => onNavigate('providers')}>Explore services</Button></div>}</section>}
    <section className="dashboard-panel"><div className="panel-heading"><div><h2>{isProvider ? 'Incoming enquiries' : 'Your enquiries'}</h2><p>{isProvider ? 'Requests from residents interested in your services.' : 'Enquiries you have submitted in this demo browser.'}</p></div></div>{myEnquiries.length ? <div className="dashboard-list">{myEnquiries.map((e, i) => <div className="dashboard-list-item" key={e.createdAt + i}><div className="mini-provider-art"><Icon name="message" /></div><div className="dashboard-list-copy"><strong>{e.providerName}</strong><span>{e.name} · {e.phone}</span><small>{e.message}</small></div><span className="status-pill">{e.status || 'New'}</span></div>)}</div> : <div className="empty-inline"><p>No enquiries yet. Once a resident submits an enquiry, it will appear here in the demo.</p><Button variant="secondary" onClick={() => onNavigate('providers')}>Browse providers</Button></div>}</section>
  </main>
}

function ListingEditor({ session, existing, onSave, onCancel }) {
  const [form, setForm] = useState(existing || { businessName: '', category: 'Plumbing', description: '', area: 'Pune', priceFrom: '299', hours: 'Mon–Sat, 9:00 AM–6:00 PM', servicesText: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const submit = event => {
    event.preventDefault()
    if (!form.businessName.trim() || !form.description.trim() || !form.area.trim()) { setError('Please complete the required fields.'); return }
    onSave({ ...form, id: existing?.id || `p-${Date.now()}`, ownerName: session.name, ownerEmail: session.email, phone: session.phone || '', services: (form.servicesText || form.services?.join(', ') || form.category).split(',').map(s => s.trim()).filter(Boolean), priceFrom: Number(form.priceFrom) || 0, rating: existing?.rating || 0, reviewCount: existing?.reviewCount || 0, verified: existing?.verified || false, active: existing?.active ?? true })
  }
  return <main className="page-shell editor-shell"><button className="back-link" onClick={onCancel}>← Back to dashboard</button><div className="editor-heading"><div className="eyebrow">YOUR BUSINESS, YOUR DETAILS</div><h1>{existing ? 'Edit your listing' : 'Create a service listing'}</h1><p>Keep your profile accurate so neighbours know how you can help.</p></div><form className="editor-card form-stack" onSubmit={submit}>{error && <div className="form-alert error-alert">{error}</div>}<div className="form-row"><div className="form-field"><label>Business or service name *</label><input required value={form.businessName} onChange={e => update('businessName', e.target.value)} placeholder="e.g. NeatNest Home Cleaning" /></div><div className="form-field"><label>Service category *</label><select value={form.category} onChange={e => update('category', e.target.value)}>{categories.map(c => <option key={c.name}>{c.name}</option>)}<option>Other</option></select></div></div><div className="form-field"><label>Service description *</label><textarea required rows="4" value={form.description} onChange={e => update('description', e.target.value)} placeholder="Describe your experience and the work you offer." /></div><div className="form-row"><div className="form-field"><label>Service area *</label><input required value={form.area} onChange={e => update('area', e.target.value)} placeholder="Neighbourhood, city" /></div><div className="form-field"><label>Starting price (₹)</label><input type="number" min="0" value={form.priceFrom} onChange={e => update('priceFrom', e.target.value)} /></div></div><div className="form-row"><div className="form-field"><label>Working hours</label><input value={form.hours} onChange={e => update('hours', e.target.value)} /></div><div className="form-field"><label>Services offered (comma-separated)</label><input value={form.servicesText ?? form.services?.join(', ') ?? ''} onChange={e => update('servicesText', e.target.value)} placeholder="Repairs, installations, maintenance" /></div></div><div className="editor-note"><Icon name="check" size={17} /><p>New listings start unverified in this prototype. Admin verification will be connected when the backend is implemented.</p></div><div className="editor-actions"><Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button><Button type="submit">Save listing <Icon name="arrow" size={16} /></Button></div></form></main>
}

function Footer({ onNavigate }) {
  return <footer className="site-footer"><div className="footer-top"><div><Brand onClick={() => onNavigate('home')} /><p>Helping good neighbours find good people.</p></div><div className="footer-links"><button onClick={() => onNavigate('providers')}>Explore services</button><button onClick={() => onNavigate('provider-signup')}>List your business</button><button onClick={() => onNavigate('resident-login')}>Resident sign in</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Neighbrly</span><span>Community-first local discovery</span></div></footer>
}

export default function App() {
  const [page, setPage] = useState('home')
  const [routeData, setRouteData] = useState({})
  const [providers, setProviders] = useState(() => { const saved = readStorage(STORAGE_KEYS.providers, null); return saved ? [...initialProviders.filter(seed => !saved.some(item => item.id === seed.id)), ...saved] : initialProviders })
  const [users, setUsers] = useState(() => readStorage(STORAGE_KEYS.users, []))
  const [enquiries, setEnquiries] = useState(() => readStorage(STORAGE_KEYS.enquiries, []))
  const [favorites, setFavorites] = useState(() => readStorage(STORAGE_KEYS.favorites, []))
  const [session, setSession] = useState(() => readStorage(STORAGE_KEYS.session, null))
  const [locationName, setLocationName] = useState('Pune')
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')

  useEffect(() => {
    let cancelled = false

    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/providers`)
      .then(response => {
        if (!response.ok) throw new Error('Provider API is unavailable')
        return response.json()
      })
      .then(payload => {
        if (cancelled || !payload.success || !Array.isArray(payload.data) || payload.data.length === 0) return
        const apiProviders = payload.data.map(provider => ({
          id: provider._id,
          businessName: provider.businessName,
          ownerName: provider.user?.name || 'Local professional',
          ownerEmail: provider.user?.email || '',
          category: provider.category,
          description: provider.description,
          phone: provider.phone || '',
          area: `${provider.locality}, ${provider.city}`,
          priceFrom: provider.priceFrom,
          rating: provider.rating || 0,
          reviewCount: provider.reviewCount || 0,
          hours: provider.workingHours,
          verified: provider.isVerified,
          active: provider.isActive,
          services: provider.services || [],
          image: provider.images?.[0] || '',
          fromApi: true,
        }))
        setProviders(current => {
          const browserManaged = current.filter(provider => !provider.fromApi && provider.ownerEmail)
          return [...apiProviders, ...browserManaged]
        })
      })
      .catch(() => {
        // Keep the bundled sample directory available when the API or Atlas is offline.
      })

    return () => { cancelled = true }
  }, [])

  useEffect(() => writeStorage(STORAGE_KEYS.providers, providers), [providers])
  useEffect(() => writeStorage(STORAGE_KEYS.users, users), [users])
  useEffect(() => writeStorage(STORAGE_KEYS.enquiries, enquiries), [enquiries])
  useEffect(() => writeStorage(STORAGE_KEYS.favorites, favorites), [favorites])
  useEffect(() => writeStorage(STORAGE_KEYS.session, session), [session])

  const navigate = (nextPage, data = {}) => {
    setPage(nextPage)
    setRouteData(data)
    setAuthError('')
    setAuthSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (data.scrollTo) window.setTimeout(() => document.getElementById(data.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
  }

  const openProvider = provider => navigate('provider-details', { providerId: provider.id })
  const selectedProvider = providers.find(p => p.id === routeData.providerId)

  const handleAuth = (form, mode) => {
    setAuthError('')
    const email = form.email.trim().toLowerCase()
    const isSignup = mode.endsWith('signup')
    const role = mode.startsWith('provider') ? 'provider' : 'resident'
    if (isSignup) {
      if (users.some(u => u.email === email)) {
        setAuthError('An account with this email already exists in this browser. Please sign in instead.')
        return
      }
      const user = { id: `u-${Date.now()}`, name: form.name.trim(), email, phone: form.phone.trim(), password: form.password, role, community: form.community || '', createdAt: new Date().toISOString() }
      const nextUsers = [...users, user]
      setUsers(nextUsers)
      if (role === 'provider') {
        const profile = {
          id: `p-${Date.now()}`, businessName: form.businessName.trim(), ownerName: form.name.trim(), ownerEmail: email,
          category: form.category, description: form.description.trim(), phone: form.phone.trim(), area: form.area.trim(),
          priceFrom: Number(form.priceFrom) || 0, rating: 0, reviewCount: 0, hours: form.hours, verified: false, active: true,
          services: [form.category],
        }
        setProviders(prev => [...prev, profile])
      }
      const safeSession = { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, community: user.community }
      setSession(safeSession)
      navigate(role === 'provider' ? 'provider-dashboard' : 'resident-dashboard')
      return
    }
    const found = users.find(u => u.email === email && u.password === form.password && u.role === role)
    if (!found) {
      setAuthError('We could not find a matching demo account. Register first in this browser, then sign in.')
      return
    }
    setSession({ id: found.id, name: found.name, email: found.email, phone: found.phone, role: found.role, community: found.community })
    navigate(role === 'provider' ? 'provider-dashboard' : 'resident-dashboard')
  }

  const toggleFavorite = providerId => {
    if (!session) {
      navigate('resident-login')
      setAuthSuccess('Sign in to save providers to your favourites.')
      return
    }
    if (session.role !== 'resident') {
      navigate('provider-dashboard')
      return
    }
    setFavorites(prev => prev.includes(providerId) ? prev.filter(id => id !== providerId) : [...prev, providerId])
  }

  const saveEnquiry = enquiry => setEnquiries(prev => [enquiry, ...prev])

  const saveListing = listing => {
    setProviders(prev => {
      const exists = prev.some(p => p.id === listing.id)
      return exists ? prev.map(p => p.id === listing.id ? listing : p) : [...prev, listing]
    })
    navigate('provider-dashboard')
  }

  const toggleActive = providerId => setProviders(prev => prev.map(p => p.id === providerId ? { ...p, active: !p.active } : p))
  const logout = () => { setSession(null); navigate('home') }

  let content
  if (page === 'home') content = <HomePage onNavigate={navigate} providers={providers} onCategory={name => navigate('providers', { category: name })} onOpenProvider={openProvider} favorites={favorites} onFavorite={toggleFavorite} locationName={locationName} onChooseLocation={setLocationName} />
  else if (page === 'providers') content = <ProviderDirectory key={`${routeData.search || ''}-${routeData.category || ''}`} providers={providers} onOpenProvider={openProvider} onNavigate={navigate} favorites={favorites} onFavorite={toggleFavorite} initialSearch={routeData.search || routeData.category || ''} initialArea={routeData.area || ''} />
  else if (page === 'provider-details') content = <ProviderDetails provider={selectedProvider} onNavigate={navigate} onEnquiry={saveEnquiry} />
  else if (['resident-login', 'resident-signup', 'provider-login', 'provider-signup'].includes(page)) content = <AuthPage key={page} mode={page} onNavigate={navigate} onSubmit={handleAuth} error={authError} success={authSuccess} />
  else if (page === 'resident-dashboard' || page === 'provider-dashboard') {
    if (!session) content = <main className="page-shell"><div className="empty-state"><h2>Sign in to continue</h2><p>Your dashboard is available after you sign in.</p><Button onClick={() => navigate(page === 'provider-dashboard' ? 'provider-login' : 'resident-login')}>Sign in</Button></div></main>
    else content = <Dashboard session={session} providers={providers} enquiries={enquiries} favorites={favorites} onNavigate={navigate} onEditProvider={p => navigate('listing-editor', { listingId: p?.id || null })} onToggleActive={toggleActive} />
  }
  else if (page === 'listing-editor') {
    const existing = providers.find(p => p.id === routeData.listingId) || null
    content = session?.role === 'provider' ? <ListingEditor session={session} existing={existing} onSave={saveListing} onCancel={() => navigate('provider-dashboard')} /> : <main className="page-shell"><div className="empty-state"><h2>Provider sign-in required</h2><Button onClick={() => navigate('provider-login')}>Provider sign in</Button></div></main>
  }
  else content = <HomePage onNavigate={navigate} providers={providers} onCategory={name => navigate('providers', { category: name })} onOpenProvider={openProvider} favorites={favorites} onFavorite={toggleFavorite} locationName={locationName} onChooseLocation={setLocationName} />

  const authPage = ['resident-login', 'resident-signup', 'provider-login', 'provider-signup'].includes(page)
  return <div className="app-shell">{!authPage && <Header onNavigate={navigate} session={session} onLogout={logout} locationName={locationName} />}{content}{!authPage && <Footer onNavigate={navigate} />}</div>
}
