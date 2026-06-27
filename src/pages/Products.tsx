import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const WA_NUMBER = '6282348437157'

type Product = {
  id: string
  name: string
  category: string
  brand: string
  selling_price: number
  photo_url: string | null
  in_stock: boolean
}

const categories = ['Semua', 'Elektronik', 'Gadget']

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [sortBy, setSortBy] = useState('terbaru')
  const [onlyStock, setOnlyStock] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('web_products')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  const filtered = products
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      const matchCat = activeCategory === 'Semua' || p.category === activeCategory
      const matchStock = onlyStock ? p.in_stock : true
      const matchMin = minPrice ? p.selling_price >= parseInt(minPrice) : true
      const matchMax = maxPrice ? p.selling_price <= parseInt(maxPrice) : true
      return matchSearch && matchCat && matchStock && matchMin && matchMax
    })
    .sort((a, b) => {
      if (sortBy === 'harga-asc') return a.selling_price - b.selling_price
      if (sortBy === 'harga-desc') return b.selling_price - a.selling_price
      if (sortBy === 'nama') return a.name.localeCompare(b.name)
      return 0
    })

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
      {/* PAGE HEADER */}
      <div className="px-6 md:px-12 pt-8 pb-0 bg-gradient-to-b from-[#0D1A2A] to-[#18181B]">
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1">Daftar Produk</h1>
        <p className="text-[#71717A] text-sm mb-5">Temukan produk elektronik dan gadget yang kamu butuhkan</p>

        {/* Search + Category + Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-5 flex-wrap">
          <div className="flex items-center gap-2 bg-[#1F1F23] border border-[#2E2E33] rounded-lg px-3 h-10 flex-1">
            <span className="text-[#52525B] text-sm">🔍</span>
            <input
              type="text"
              placeholder="Cari produk atau merek..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-white text-sm placeholder-[#52525B] w-full"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#1B6CA8] border-[#1B6CA8] text-white font-medium'
                    : 'border-[#2E2E33] bg-[#1F1F23] text-[#A1A1AA] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 bg-[#1F1F23] border border-[#2E2E33] rounded-lg px-3 text-sm text-[#A1A1AA] outline-none cursor-pointer"
          >
            <option value="terbaru">Terbaru</option>
            <option value="harga-asc">Harga Terendah</option>
            <option value="harga-desc">Harga Tertinggi</option>
            <option value="nama">Nama A-Z</option>
          </select>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col md:flex-row">

        {/* SIDEBAR — desktop */}
        <div className="hidden md:block w-52 flex-shrink-0 px-6 py-6 border-r border-[#2E2E33]">
          <div className="mb-6">
            <div className="text-[#71717A] text-[11px] font-medium uppercase tracking-widest mb-3">Ketersediaan</div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyStock}
                onChange={(e) => setOnlyStock(e.target.checked)}
                className="accent-[#1B6CA8] w-3.5 h-3.5"
              />
              <span className="text-[#A1A1AA] text-sm">Tersedia saja</span>
            </label>
          </div>
          <div>
            <div className="text-[#71717A] text-[11px] font-medium uppercase tracking-widest mb-3">Rentang Harga</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[#71717A] text-xs w-6">Min</span>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-1 h-8 bg-[#27272A] border border-[#2E2E33] rounded-md px-2 text-xs text-white outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#71717A] text-xs w-6">Max</span>
                <input
                  type="number"
                  placeholder="10000000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-1 h-8 bg-[#27272A] border border-[#2E2E33] rounded-md px-2 text-xs text-white outline-none"
                />
              </div>
              <button
                onClick={() => { setMinPrice(''); setMaxPrice('') }}
                className="h-8 rounded-md bg-[#27272A] border border-[#2E2E33] text-[#A1A1AA] text-xs hover:text-white transition-colors mt-1"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* FILTER MOBILE — collapsible */}
        <div className="md:hidden px-6 py-3 border-b border-[#2E2E33]">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white"
          >
            <span>Filter</span>
            <svg className={`w-3 h-3 transition-transform ${filterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {filterOpen && (
            <div className="mt-3 flex flex-col gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyStock}
                  onChange={(e) => setOnlyStock(e.target.checked)}
                  className="accent-[#1B6CA8] w-3.5 h-3.5"
                />
                <span className="text-[#A1A1AA] text-sm">Tersedia saja</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Harga min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-1 h-9 bg-[#27272A] border border-[#2E2E33] rounded-md px-3 text-xs text-white outline-none"
                />
                <input
                  type="number"
                  placeholder="Harga max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-1 h-9 bg-[#27272A] border border-[#2E2E33] rounded-md px-3 text-xs text-white outline-none"
                />
                <button
                  onClick={() => { setMinPrice(''); setMaxPrice('') }}
                  className="h-9 px-3 rounded-md bg-[#27272A] border border-[#2E2E33] text-[#A1A1AA] text-xs hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PRODUCT GRID */}
        <div className="flex-1 px-6 md:px-8 py-6">
          <div className="text-[#71717A] text-xs mb-4">
            Menampilkan <span className="text-white font-medium">{filtered.length}</span> produk
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-[#71717A] text-sm">Memuat produk...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#52525B]">
              <div className="text-4xl mb-3">🔍</div>
              <div className="text-sm">Produk tidak ditemukan</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((product) => (
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
        </div>
      </div>
    </main>
  )
}
