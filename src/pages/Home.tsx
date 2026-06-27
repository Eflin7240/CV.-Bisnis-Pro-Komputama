import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const WA_NUMBER = '6282348437157'

const partnerLogos = [
  { src: '/Asus.png', alt: 'ASUS' },
  { src: '/epson.png', alt: 'Epson' },
  { src: '/Canon.png', alt: 'Canon' },
  { src: '/Samsung.png', alt: 'Samsung' },
  { src: '/Brother.png', alt: 'Brother' },
  { src: '/Acer.png', alt: 'Acer' },
  { src: '/LG.png', alt: 'LG' },
  { src: '/Telkom.png', alt: 'Telkom' },
]

type Product = {
  id: string
  name: string
  category: string
  brand: string
  selling_price: number
  photo_url: string | null
  in_stock: boolean
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestProducts()
  }, [])

  const fetchLatestProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('web_products')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(6)

    if (error) {
      console.error('Error:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)

  const waMessage = (name: string, price: number) =>
    `https://wa.me/${WA_NUMBER}?text=Halo,%20saya%20tertarik%20dengan%20produk%20*${encodeURIComponent(name)}*%20seharga%20${encodeURIComponent(formatPrice(price))}.%20Apakah%20masih%20tersedia?`

  return (
    <main>
      {/* HERO */}
      <section
        className="px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[320px] md:min-h-[380px] relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, #18181B 40%, rgba(13,26,42,0.5) 70%, transparent 100%), url('/hero-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex-1 w-full">
          <div className="inline-flex items-center gap-2 bg-[#0D1A2A] border border-[#1B6CA8] rounded-full px-3 py-1.5 text-[#F5B800] text-xs mb-4">
            Solusi Elektronik dan Komputer Terpercaya
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-2">
            CV. BISNIS PRO
            <br />
            <span className="text-[#F5B800]">KOMPUTAMA</span>
          </h1>
          <p className="text-[#F5B800] italic text-sm mb-3">Support All of Your Needs</p>
          <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6 max-w-md">
            Kami menyediakan berbagai kebutuhan elektronik, komputer, laptop, printer, dan
            aksesoris. Harga terbaik, kualitas terjamin, layanan service profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/produk"
              className="bg-[#1B6CA8] hover:bg-[#2A82C8] text-white text-sm font-medium px-5 h-10 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Lihat Produk
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="border border-[#3F3F46] hover:border-[#71717A] text-white text-sm px-5 h-10 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        {/* Stat cards — hidden di mobile kecil */}
        <div className="hidden sm:flex flex-shrink-0 w-full md:w-72 flex-row md:flex-col gap-3">
          <div className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-3 md:p-4 flex items-center gap-3 flex-1 md:flex-none">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#0D1A2A] flex items-center justify-center text-base md:text-lg">
              📦
            </div>
            <div>
              <div className="text-white font-semibold text-base md:text-lg">
                {loading ? '...' : `${products.length}+`}
              </div>
              <div className="text-[#71717A] text-xs">Produk tersedia</div>
            </div>
          </div>
          <div className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-3 md:p-4 flex items-center gap-3 flex-1 md:flex-none">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#0D1A2A] flex items-center justify-center text-base md:text-lg">
              🔧
            </div>
            <div>
              <div className="text-white font-semibold text-base md:text-lg">Service</div>
              <div className="text-[#71717A] text-xs">Alat elektronik profesional</div>
            </div>
          </div>
          <div className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-3 md:p-4 flex items-center gap-3 flex-1 md:flex-none">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#0D1A2A] flex items-center justify-center text-base md:text-lg">
              📍
            </div>
            <div>
              <div className="text-white font-semibold text-base md:text-lg">Makassar</div>
              <div className="text-[#71717A] text-xs">Sulawesi Selatan</div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#2E2E33] mx-6 md:mx-12" />

      {/* PRODUK TERBARU */}
      <section className="px-6 md:px-12 py-10 md:py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">Produk Terbaru</h2>
            <p className="text-[#71717A] text-xs mt-1">
              Elektronik dan gadget pilihan yang tersedia di toko kami
            </p>
          </div>
          <Link
            to="/produk"
            className="border border-[#F5B800] text-[#F5B800] text-xs px-3 md:px-4 h-8 rounded-md flex items-center gap-1 hover:bg-[#1F1F23] transition-colors whitespace-nowrap"
          >
            Lihat semua
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-[#71717A] text-sm">Memuat produk...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#52525B]">
            <div className="text-4xl mb-3">📦</div>
            <div className="text-sm">Belum ada produk tersedia</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl overflow-hidden hover:border-[#3F3F46] transition-colors"
              >
                <div className="h-40 bg-[#27272A] flex items-center justify-center relative overflow-hidden">
                  {product.photo_url ? (
                    <img
                      src={product.photo_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">🖥️</span>
                  )}
                  <span
                    className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      product.in_stock
                        ? 'bg-[#1B6CA8] text-white'
                        : 'bg-[#3F3F46] text-[#A1A1AA]'
                    }`}
                  >
                    {product.in_stock ? 'Tersedia' : 'Stok Habis'}
                  </span>
                </div>
                <div className="p-3">
                  <div className="text-[#71717A] text-[10px] uppercase tracking-wider mb-1">
                    {product.category}
                  </div>
                  <div className="text-white text-sm font-medium mb-0.5 truncate">
                    {product.name}
                  </div>
                  <div className="text-[#52525B] text-xs mb-2">{product.brand}</div>
                  <div className="text-[#F5B800] font-semibold text-base mb-3">
                    {formatPrice(product.selling_price)}
                  </div>
                  {product.in_stock ? (
                    <a
                      href={waMessage(product.name, product.selling_price)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full h-9 rounded-md text-xs font-medium flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20BD5C] text-white transition-colors"
                    >
                      Buy via WhatsApp
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full h-9 rounded-md text-xs font-medium flex items-center justify-center bg-[#2E2E33] text-[#52525B] cursor-not-allowed"
                    >
                      Stok Habis
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="h-px bg-[#2E2E33] mx-6 md:mx-12" />

      {/* MITRA */}
<section className="px-6 md:px-12 py-10 overflow-hidden">
  <div className="text-[#71717A] text-xs font-medium uppercase tracking-widest text-center mb-5">
    Mitra Kami
  </div>
  <div className="relative overflow-hidden rounded-xl border border-[#2E2E33] bg-[#111113] py-6">
    <div className="marquee-track flex w-max items-center gap-4 md:gap-6">
      {[...partnerLogos, ...partnerLogos].map((logo, index) => (
        <div
          key={`${logo.alt}-${index}`}
          className="flex h-30 min-w-[220px] items-center justify-center rounded-xl border border-[#2E2E33] bg-white px-6 py-4"
        >
          <img src={logo.src} alt={logo.alt} className="max-h-22 w-auto object-contain" />
        </div>
      ))}
    </div>
  </div>
</section>
    </main>
  )
}
