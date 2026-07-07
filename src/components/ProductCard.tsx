import { useState } from 'react'

type Product = {
  id: string
  name: string
  category: string
  brand: string
  selling_price: number
  photo_url: string | null
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
        {product.photo_url ? (
          <img
            src={product.photo_url}
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
