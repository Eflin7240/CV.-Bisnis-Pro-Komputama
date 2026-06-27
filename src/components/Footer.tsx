import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      {/* Footer Main */}
      <div className="bg-[#0F0F11] border-t border-[#2E2E33] px-6 md:px-12 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="text-white font-bold text-sm">CV. BISNIS PRO KOMPUTAMA</div>
          <div className="text-[#F5B800] text-xs italic mt-1">Support All of Your Needs</div>
          <div className="text-[#A1A1AA] text-xs mt-3 leading-relaxed max-w-[220px]">
            Solusi elektronik dan komputer terpercaya di Makassar, Sulawesi Selatan. <br />
            Jl. Je'nemadinging & Jl. Urip Sumoharjo Kec. Panakukang, Makassar
            <br />
            Telp: 0823-4843-7157
            <br />
            Email: bisnisprokomputama@gmail.com
          </div>
        </div>

        {/* Navigasi */}
        <div>
          <div className="text-[#71717A] text-[11px] font-medium uppercase tracking-widest mb-3">Navigasi</div>
          <Link to="/" className="block text-[#A1A1AA] text-xs mb-2 hover:text-white transition-colors">Beranda</Link>
                    <Link to="/tentang" className="block text-[#A1A1AA] text-xs mb-2 hover:text-white transition-colors">Tentang Kami</Link>
<Link to="/produk" className="block text-[#A1A1AA] text-xs mb-2 hover:text-white transition-colors">Daftar Produk</Link>
        </div>

        {/* Hubungi */}
        <div>
          <div className="text-[#71717A] text-[11px] font-medium uppercase tracking-widest mb-3">Hubungi Kami</div>
          <a href="https://wa.me/6282348437157" className="block text-[#A1A1AA] text-xs mb-2 hover:text-white transition-colors">WhatsApp</a>
          <a href="https://www.instagram.com/makassar_infojualbeli?igsh=ZHExb2F1MHV0YzBp" className="block text-[#A1A1AA] text-xs mb-2 hover:text-white transition-colors">Instagram</a>
          <a href="https://www.facebook.com/share/1EcbYHiiJP/" className="block text-[#A1A1AA] text-xs mb-2 hover:text-white transition-colors">Facebook</a>
          <div className="flex gap-2 mt-3">
            <a href="https://www.facebook.com/share/1EcbYHiiJP/" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-[#27272A] border border-[#2E2E33] flex items-center justify-center text-[#71717A] hover:text-[#1877F2] transition-colors">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/makassar_infojualbeli?igsh=ZHExb2F1MHV0YzBp" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-[#27272A] border border-[#2E2E33] flex items-center justify-center text-[#71717A] hover:text-[#E4405F] transition-colors">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/6282348437157"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#27272A] border border-[#2E2E33] flex items-center justify-center text-[#71717A] hover:text-[#25D366] transition-all duration-300"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#0A0A0C] border-t border-[#1F1F23] px-6 md:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-[#3F3F46] text-[11px] text-center sm:text-left">
          © 2024 CV. BISNIS PRO KOMPUTAMA. All rights reserved.
        </span>
        <span className="text-[#3F3F46] text-[11px]">Support All of Your Needs</span>
      </div>
    </footer>
  )
}
