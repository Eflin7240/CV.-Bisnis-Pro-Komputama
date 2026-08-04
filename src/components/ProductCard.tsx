import { useState } from 'react'

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
  product: Product
  onView: (product: Product) => void
  formatPrice: (price: number) => string
  waMessage: (name: string, price: number) => string
}

export default function ProductCard({ product, onView, formatPrice, waMessage }: Props) {
  const [hovered, setHovered] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

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
      className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl overflow-hidden hover:border-[#3F3F46] transition-colors"
    >
      {/* Gambar dengan overlay View */}
      <div
        className="h-40 bg-[#27272A] flex items-center justify-center relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onView(product)}
      >
        {photos.length > 0 ? (
          <img
            src={photos[photoIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">🖥️</span>
        )}

        {/* Overlay View saat hover */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="bg-white text-[#18181B] text-sm font-semibold px-5 py-2 rounded-full shadow-lg">
            View
          </span>
        </div>

        {/* Badge stok */}
        <span className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${
          product.in_stock ? 'bg-[#1B6CA8] text-white' : 'bg-[#3F3F46] text-[#A1A1AA]'
        }`}>
          {product.in_stock ? 'Tersedia' : 'Stok Habis'}
        </span>

        {/* Navigasi geser foto — cuma muncul kalau foto lebih dari satu */}
        {hasMultiplePhotos && (
          <>
            <button
              onClick={goPrev}
              className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-opacity duration-200 z-10 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <ChevronLeft size={14} className="text-white" />
            </button>
            <button
              onClick={goNext}
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-opacity duration-200 z-10 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <ChevronRight size={14} className="text-white" />
            </button>

            {/* Dots indikator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setPhotoIndex(idx) }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === photoIndex ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
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
  )
}
