import { useEffect, useState } from 'react'

const ChevronLeft = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const WA_NUMBER = '6282348437157'

type Product = {
  id: string
  name: string
  category: string
  brand: string
  selling_price: number
  photos: string[]
  in_stock: boolean
  description: string | null
}

type Props = {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)

  const waMessage = (name: string, price: number) =>
    `https://wa.me/${WA_NUMBER}?text=Halo,%20saya%20tertarik%20dengan%20produk%20*${encodeURIComponent(name)}*%20seharga%20${encodeURIComponent(formatPrice(price))}.%20Apakah%20masih%20tersedia?`

  // Tutup modal kalau tekan Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Cegah scroll background
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [product])

  // Reset ke foto pertama tiap kali produk yang ditampilkan berganti
  useEffect(() => {
    setPhotoIndex(0)
  }, [product?.id])

  if (!product) return null

  const photos = product.photos && product.photos.length > 0 ? product.photos : []
  const hasMultiplePhotos = photos.length > 1

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors text-[#1a1a18]"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Foto produk */}
          <div className="w-full md:w-[320px] h-64 md:h-auto bg-[#f7f7f5] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            {photos.length > 0 ? (
              <img
                src={photos[photoIndex]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-6xl">🖥️</span>
            )}

            {/* Navigasi geser foto — cuma muncul kalau foto lebih dari satu */}
            {hasMultiplePhotos && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors z-10"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors z-10"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>

                {/* Dots indikator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setPhotoIndex(idx) }}
                      className={`w-2 h-2 rounded-full transition-colors ${idx === photoIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info produk */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Kategori & brand */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#EEEDFE] text-[#3C3489]">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-[11px] text-[#71717A]">{product.brand}</span>
              )}
            </div>

            {/* Nama */}
            <h2 className="text-xl font-bold text-[#18181B] leading-tight mb-3">
              {product.name}
            </h2>

            {/* Deskripsi */}
            <p className="text-[13px] text-[#71717A] leading-relaxed flex-1 mb-4">
              {product.description || 'Tidak ada deskripsi tersedia untuk produk ini.'}
            </p>

            {/* Status stok */}
            <div className="mb-4">
              <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                product.in_stock
                  ? 'bg-[#E1F5EE] text-[#085041]'
                  : 'bg-[#FCEBEB] text-[#791F1F]'
              }`}>
                {product.in_stock ? 'Stok tersedia' : 'Stok habis'}
              </span>
            </div>

            {/* Harga */}
            <div className="text-2xl font-bold text-[#F5B800] mb-5">
              {formatPrice(product.selling_price)}
            </div>

            {/* Tombol WA */}
            {product.in_stock ? (
              <a
                href={waMessage(product.name, product.selling_price)}
                target="_blank"
                rel="noreferrer"
                className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                Buy via WhatsApp
              </a>
            ) : (
              <button
                disabled
                className="w-full h-11 rounded-xl bg-[#2E2E33] text-[#52525B] font-medium text-sm cursor-not-allowed"
              >
                Stok Habis
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
