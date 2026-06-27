import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const WA_NUMBER = '6282348437157'

type DropdownKey = 'info' | 'market' | null
type SubMenuKey = 'sosmed' | 'offline' | null

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileInfo, setMobileInfo] = useState(false)
  const [mobileSosmed, setMobileSosmed] = useState(false)
  const [mobileOffline, setMobileOffline] = useState(false)
  const [mobileMarket, setMobileMarket] = useState(false)

  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const subMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  const openDropdown = (key: DropdownKey) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(key)
    if (key !== 'info') setActiveSubMenu(null)
  }

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null)
      setActiveSubMenu(null)
    }, 200)
  }

  const openSubMenu = (key: SubMenuKey) => {
    if (subMenuTimeout.current) clearTimeout(subMenuTimeout.current)
    setActiveSubMenu(key)
  }

  const closeSubMenu = () => {
    subMenuTimeout.current = setTimeout(() => {
      setActiveSubMenu(null)
    }, 150)
  }

  const cancelClose = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    if (subMenuTimeout.current) clearTimeout(subMenuTimeout.current)
  }

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileInfo(false)
    setMobileSosmed(false)
    setMobileOffline(false)
    setMobileMarket(false)
  }

  return (
    <nav className="bg-[#18181B] border-b border-[#2E2E33] sticky top-0 z-50">
      <div className="px-6 md:px-12 h-[60px] flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/Logo.png"
            alt="CV. Bisnis Pro Komputama"
            className="h-9 w-auto object-contain"
          />
        </Link>
        <div>
    <div className="text-white font-bold text-sm leading-tight">CV. BISNIS PRO KOMPUTAMA</div>
    <div className="text-[#F5B800] text-[10px] italic">Support All of Your Needs</div>
  </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 ml-auto">

          {/* Beranda */}
          <Link
            to="/"
            className={`text-sm px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/'
                ? 'text-white font-medium'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#1F1F23]'
            }`}
          >
            Beranda
          </Link>

          <Link
            to="/tentang"
            className={`text-sm px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/tentang'
                ? 'text-white font-medium'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#1F1F23]'
            }`}
          >
            Tentang Kami
          </Link>

          {/* Informasi dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown('info')}
            onMouseLeave={closeDropdown}
          >
            <button
              className={`text-sm px-4 py-2 rounded-md flex items-center gap-1 transition-colors ${
                activeDropdown === 'info'
                  ? 'text-white bg-[#1F1F23]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-[#1F1F23]'
              }`}
            >
              Informasi
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'info' ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Informasi */}
            <div
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
              className={`absolute top-full left-0 mt-2 bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-1.5 min-w-[190px] shadow-xl transition-all duration-200 ${
                activeDropdown === 'info'
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              {/* Sosial Media — dengan submenu */}
              <div
                className="relative"
                onMouseEnter={() => openSubMenu('sosmed')}
                onMouseLeave={closeSubMenu}
              >
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSubMenu === 'sosmed'
                      ? 'bg-[#27272A] text-white'
                      : 'text-[#A1A1AA] hover:bg-[#27272A] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">📱 Sosial Media</span>
                  <svg className="w-3 h-3 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Submenu Sosial Media */}
                <div
                  onMouseEnter={() => { cancelClose(); openSubMenu('sosmed') }}
                  onMouseLeave={closeSubMenu}
                  className={`absolute top-0 left-full ml-2 bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-1.5 min-w-[160px] shadow-xl transition-all duration-150 ${
                    activeSubMenu === 'sosmed'
                      ? 'opacity-100 translate-x-0 pointer-events-auto'
                      : 'opacity-0 -translate-x-2 pointer-events-none'
                  }`}
                >
                  <a
                    href="https://www.instagram.com/makassar_infojualbeli?igsh=ZHExb2F1MHV0YzBp"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors"
                  >
                    📸 Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/share/1EcbYHiiJP/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors"
                  >
                    👤 Facebook
                  </a>
                  <div className="h-px bg-[#2E2E33] my-1" />
                  <a
                    href={`https://wa.me/${WA_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>

              {/* Toko Offline — dengan submenu */}
              <div
                className="relative"
                onMouseEnter={() => openSubMenu('offline')}
                onMouseLeave={closeSubMenu}
              >
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSubMenu === 'offline'
                      ? 'bg-[#27272A] text-white'
                      : 'text-[#A1A1AA] hover:bg-[#27272A] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">🏪 Toko Offline</span>
                  <svg className="w-3 h-3 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Submenu Toko Offline */}
                <div
                  onMouseEnter={() => { cancelClose(); openSubMenu('offline') }}
                  onMouseLeave={closeSubMenu}
                  className={`absolute top-0 left-full ml-2 bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-1.5 min-w-[160px] shadow-xl transition-all duration-150 ${
                    activeSubMenu === 'offline'
                      ? 'opacity-100 translate-x-0 pointer-events-auto'
                      : 'opacity-0 -translate-x-2 pointer-events-none'
                  }`}
                >
                  <a
                    href="https://maps.app.goo.gl/c38KRiVrf1j7NwPs7"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors"
                  >
                    📍 Pusat
                  </a>
                  <a
                    href="https://maps.app.goo.gl/r7FMuh5xVdRTpw867"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors"
                  >
                    📍 Cabang
                  </a>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:bisnisprokomputama@gmail.com"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors"
              >
                📧 Email
              </a>

              <div className="h-px bg-[#2E2E33] my-1" />

              {/* Kritik & Saran */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Halo,%20saya%20ingin%20menyampaikan%20kritik%20dan%20saran`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors"
              >
                💬 Kritik & Saran
              </a>
            </div>
          </div>

          {/* Daftar Produk */}
          <Link
            to="/produk"
            className={`text-sm px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/produk'
                ? 'text-white font-medium'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#1F1F23]'
            }`}
          >
            Daftar Produk
          </Link>

          {/* Marketplace dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown('market')}
            onMouseLeave={closeDropdown}
          >
            <button
              className={`text-sm px-4 py-2 rounded-md flex items-center gap-1 transition-colors ${
                activeDropdown === 'market'
                  ? 'text-white bg-[#1F1F23]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-[#1F1F23]'
              }`}
            >
              Marketplace
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'market' ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
              className={`absolute top-full right-0 mt-2 bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-1.5 min-w-[160px] shadow-xl transition-all duration-200 ${
                activeDropdown === 'market'
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <a href="https://tokopedia.link/0Ht3Li1Ii4b" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors">
                🛍️ Tokopedia
              </a>
              <a href="https://s.shopee.co.id/1qZz7532OR?share_channel_code=1" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors">
                🛒 Shopee
              </a>
              <div className="h-px bg-[#2E2E33] my-1" />
              <a href="https://siplahtelkom.com/store/240512-cv-bisnis-pro-komputama" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors">
                📱 Sipla
              </a>
            </div>
          </div>

          {/* Hubungi Kami */}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="ml-2 bg-[#1B6CA8] hover:bg-[#2A82C8] text-white text-sm font-medium px-4 h-8 rounded-md flex items-center gap-2 transition-colors"
          >
            Hubungi Kami
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden ml-auto w-9 h-9 flex flex-col items-center justify-center gap-1.5"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2E2E33] bg-[#18181B] px-6 py-4 flex flex-col gap-1">
          <Link to="/" onClick={closeMobile} className="text-sm text-[#A1A1AA] hover:text-white py-2.5 border-b border-[#2E2E33]">
            Beranda
          </Link>

          <Link to="/tentang" onClick={closeMobile} className="text-sm text-[#A1A1AA] hover:text-white py-2.5 border-b border-[#2E2E33]">
            Tentang Kami
          </Link>

          {/* Informasi accordion */}
          <div className="border-b border-[#2E2E33]">
            <button
              onClick={() => setMobileInfo(!mobileInfo)}
              className="w-full flex items-center justify-between text-sm text-[#A1A1AA] hover:text-white py-2.5"
            >
              Informasi
              <svg className={`w-3 h-3 transition-transform ${mobileInfo ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileInfo && (
              <div className="pl-3 pb-2 flex flex-col gap-1">

                {/* Sosial Media accordion */}
                <button
                  onClick={() => setMobileSosmed(!mobileSosmed)}
                  className="flex items-center justify-between text-sm text-[#71717A] hover:text-white py-2"
                >
                  📱 Sosial Media
                  <svg className={`w-3 h-3 transition-transform ${mobileSosmed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileSosmed && (
                  <div className="pl-4 flex flex-col gap-1 mb-1">
                    <a href="https://instagram.com/GANTI_USERNAME_IG" target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#52525B] hover:text-white py-1.5">📸 Instagram</a>
                    <a href="https://facebook.com/GANTI_URL_FB" target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#52525B] hover:text-white py-1.5">👤 Facebook</a>
                    <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#52525B] hover:text-white py-1.5">💬 WhatsApp</a>
                  </div>
                )}

                {/* Toko Offline accordion */}
                <button
                  onClick={() => setMobileOffline(!mobileOffline)}
                  className="flex items-center justify-between text-sm text-[#71717A] hover:text-white py-2"
                >
                  🏪 Toko Offline
                  <svg className={`w-3 h-3 transition-transform ${mobileOffline ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileOffline && (
                  <div className="pl-4 flex flex-col gap-1 mb-1">
                    <a href="https://maps.google.com/?q=GANTI_LINK_MAPS_PUSAT" target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#52525B] hover:text-white py-1.5">📍 Pusat</a>
                    <a href="https://maps.google.com/?q=GANTI_LINK_MAPS_CABANG" target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#52525B] hover:text-white py-1.5">📍 Cabang</a>
                  </div>
                )}

                <a href="mailto:bisnisprokomputama@gmail.com" onClick={closeMobile} className="text-sm text-[#71717A] hover:text-white py-2">📧 Email</a>
                <a href={`https://wa.me/${WA_NUMBER}?text=Halo,%20saya%20ingin%20menyampaikan%20kritik%20dan%20saran`} target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#71717A] hover:text-white py-2">💬 Kritik & Saran</a>
              </div>
            )}
          </div>

          <Link to="/produk" onClick={closeMobile} className="text-sm text-[#A1A1AA] hover:text-white py-2.5 border-b border-[#2E2E33]">
            Daftar Produk
          </Link>

          {/* Marketplace accordion */}
          <div className="border-b border-[#2E2E33]">
            <button
              onClick={() => setMobileMarket(!mobileMarket)}
              className="w-full flex items-center justify-between text-sm text-[#A1A1AA] hover:text-white py-2.5"
            >
              Marketplace
              <svg className={`w-3 h-3 transition-transform ${mobileMarket ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileMarket && (
              <div className="pl-4 pb-2 flex flex-col gap-1">
                <a href="https://tokopedia.link/0Ht3Li1Ii4b" target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#71717A] hover:text-white py-1.5">🛍️ Tokopedia</a>
                <a href="https://s.shopee.co.id/1qZz7532OR?share_channel_code=1" target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#71717A] hover:text-white py-1.5">🛒 Shopee</a>
                <a href="https://siplahtelkom.com/store/240512-cv-bisnis-pro-komputama" target="_blank" rel="noreferrer" onClick={closeMobile} className="text-sm text-[#71717A] hover:text-white py-1.5">📱 Sipla</a>
              </div>
            )}
          </div>

          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 bg-[#1B6CA8] text-white text-sm font-medium px-4 h-10 rounded-md flex items-center justify-center gap-2"
          >
            Hubungi Kami
          </a>
        </div>
      )}
    </nav>
  )
}
