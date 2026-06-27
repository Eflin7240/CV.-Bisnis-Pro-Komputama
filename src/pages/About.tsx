export default function About() {
  const services = [
    {
      icon: '✏️',
      title: 'ATK',
      desc: 'Menyediakan berbagai kebutuhan alat tulis kantor lengkap pulpen, buku, kertas, stapler, dan perlengkapan kantor lainnya dengan harga terjangkau.',
    },
    {
      icon: '🖥️',
      title: 'Elektronik & Komputer',
      desc: 'Aksesoris dan perangkat komputer lengkap mouse, keyboard, flashdisk, kabel, printer, dan berbagai perangkat elektronik pendukung kerja.',
    },
    {
      icon: '📱',
      title: 'Gadget',
      desc: 'Laptop, smartphone, tablet, dan gadget terkini dari brand terpercaya dengan garansi resmi dan harga kompetitif.',
    },
    {
      icon: '🎟️',
      title: 'Voucher',
      desc: 'Voucher data internet dan token listrik tersedia untuk berbagai provider Telkomsel, Indosat, XL, PLN, dan lainnya.',
    },
    {
      icon: '🔧',
      title: 'Service',
      desc: 'Layanan perbaikan alat elektronik profesional laptop, printer, HP, dan perangkat elektronik lainnya ditangani oleh teknisi berpengalaman.',
    },
    {
      icon: '🤝',
      title: 'Gadai & Jual Beli',
      desc: 'Solusi cepat untuk kebutuhan dana maupun penjualan barang bekas. Kami membantu Anda gadai barang bernilai atau menjual perangkat elektronik dan perlengkapan kantor dengan proses yang praktis, aman, dan transparan.',
    },
    {
  icon: '🖨️',
  title: 'Percetakan',
  desc: 'Cetak dokumen, brosur, spanduk, kartu nama, dan undangan. Tersedia juga layanan desain grafis untuk kebutuhan branding dan pemasaran.',
},
{
  icon: '💻',
  title: 'Pembuatan Website & Aplikasi',
  desc: 'Pengembangan website bisnis, e-commerce, website personal, dan aplikasi software sesuai kebutuhan pelanggan secara profesional.',
},
  ]

  return (
    <main>
      {/* HERO */}
      <section className="px-6 md:px-12 py-12 md:py-16 bg-gradient-to-b from-[#0D1A2A] to-[#18181B]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-2xl bg-white flex items-center justify-center p-4 shadow-xl">
              <img
                src={`${import.meta.env.BASE_URL}Logo.png`}
                alt="CV. Bisnis Pro Komputama"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#0D1A2A] border border-[#1B6CA8] rounded-full px-3 py-1.5 text-[#F5B800] text-xs mb-4">
              Tentang Kami
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-2">
              CV. BISNIS PRO
              <br />
              <span className="text-[#F5B800]">KOMPUTAMA</span>
            </h1>
            <p className="text-[#F5B800] italic text-sm mb-4">Support All of Your Needs</p>
            <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-lg">
              CV. Bisnis Pro Komputama atau dikenal dengan merek dagang Business Pro Indonesia, merupakan badan usaha yang bergerak di bidang penjualan produk komputer, elektronik, dan jasa digital. Berdiri sejak 24 April 2020, berlokasi di Makassar, Sulawesi Selatan.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#2E2E33] mx-6 md:mx-12" />

      {/* SEJARAH */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
            Sejarah Kami
          </h2>
          <div className="w-12 h-1 bg-[#F5B800] rounded-full mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder sejarah — ganti teks ini dengan sejarah toko yang sebenarnya */}
            <div className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-6">
              <div className="text-[#F5B800] text-sm font-medium mb-2">Awal Berdiri</div>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
               Business Pro Indonesia berdiri sejak 24 April 2020, dikelola oleh Ir. Rahmaniar, S.Kom M.Kom sebagai Direktur dan Nindhi Meyna S, S.H M.Pd sebagai Komanditer. Saat ini telah memiliki lebih dari 7 karyawan.
              </p>
            </div>
            <div className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-6">
              <div className="text-[#F5B800] text-sm font-medium mb-2">Perkembangan</div>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Dari satu store, Business Pro Indonesia kini telah membuka cabang di Makassar dan Gowa, melayani individu, UKM, hingga perusahaan besar dengan berbagai layanan teknologi dalam satu tempat.
              </p>
            </div>
            <div className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-6">
              <div className="text-[#F5B800] text-sm font-medium mb-2">Komitmen</div>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Motto kami: "One Team One Vision" keberhasilan usaha dicapai dengan satu tekad yang sama melalui kerja sama terbaik. Semua produk yang dijual adalah produk resmi dari vendor dan distributor di Indonesia.
              </p>
            </div>
            <div className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-6">
              <div className="text-[#F5B800] text-sm font-medium mb-2">Visi & Misi</div>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Visi: Menjadi perusahaan unggul dalam penyediaan layanan elektronik, komputer, percetakan, dan digital dengan kualitas terbaik serta harga bersaing. <br />
                Misi: Menyediakan produk berkualitas kompetitif, layanan gadai aman dan transparan, servis cepat dan terpercaya, serta pengembangan website dan aplikasi profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#2E2E33] mx-6 md:mx-12" />

      {/* LAYANAN */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
            Layanan Kami
          </h2>
          <div className="w-12 h-1 bg-[#F5B800] rounded-full mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-5 hover:border-[#3F3F46] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0D1A2A] flex items-center justify-center text-xl mb-4">
                  {service.icon}
                </div>
                <div className="text-white font-medium text-sm mb-2">{service.title}</div>
                <p className="text-[#71717A] text-xs leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-[#2E2E33] mx-6 md:mx-12" />

      {/* STATS */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '200+', label: 'Produk lainnya di Toko Offline' },
            { val: '8', label: 'Jenis layanan' },
            { val: '2', label: 'Lokasi toko' },
            { val: '100%', label: 'Kepuasan pelanggan' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1F1F23] border border-[#2E2E33] rounded-xl p-5 text-center"
            >
              <div className="text-2xl font-bold text-[#F5B800] mb-1">{stat.val}</div>
              <div className="text-[#71717A] text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
