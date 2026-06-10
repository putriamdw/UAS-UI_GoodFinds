const articlesData = {
  'style-guide': {
    id: 'style-guide',
    title: '5 Cara Mix & Match Outfit Thrift untuk Tampil Coquette & Effortlessly Chic',
    category: 'Style Guide',
    categoryBadge: 'badge-pink',
    date: '5 Mei 2026',
    readTime: '8 menit baca',
    author: {
      name: 'Rara Putri',
      role: 'Style Editor · GoodFinds',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      bio: 'Obsesi dengan fashion berkelanjutan dan membantu semua orang tampil stylish tanpa harus beli baru.'
    },
    heroImage: 'https://i.pinimg.com/736x/b3/0e/33/b30e33d7927fa1e54dd46e7528ea9be3.jpg',
    sections: [
      {
        type: 'text',
        content: 'Thrifting bukan sekadar soal harga murah — ini soal menemukan item unik yang bisa mengekspresikan kepribadianmu. Dan kalau kamu sedang jatuh cinta sama aesthetic <strong>coquette</strong> yang girly, feminine, dan sedikit mysterious, kamu ada di tempat yang tepat.'
      },
      {
        type: 'heading-image-text',
        heading: '1. The Classic Blazer Oversize + Lace Dress',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2628a5?w=800&h=500&fit=crop',
        text: 'Blazer oversized dari thrift store adalah senjata utama untuk tampilan coquette yang effortless. Padukan dengan lace dress atau slip dress untuk kontras maskulin-feminin yang chef\'s kiss. Tambahkan loafers atau mary janes untuk sentuhan akhir yang manis.'
      },
      {
        type: 'heading-text',
        heading: '2. Floral Midi Dress + Knit Cardigan',
        text: 'Siapa bilang bunga-bunga hanya untuk musim semi? Di Indonesia, floral midi dress bisa dipakai sepanjang tahun. Layering dengan knit cardigan tipis memberikan kesan cozy yang tetap stylish. Tips: pilih floral dengan warna dasar pastel atau putih.'
      },
      {
        type: 'blockquote',
        content: '"Fashion is what you\'re offered four times a year by designers. Style is what you choose." — Lauren Hutton'
      },
      {
        type: 'heading-text',
        heading: '3. Vintage Denim + Lace Top',
        text: 'Denim vintage selalu jadi andalan. High-waist jeans dari thrift store dipadu dengan lace top yang feminine menciptakan kombinasi yang timeless. Lengkapi dengan small crossbody bag dan sepatu boots untuk look yang sedikit edgy tapi tetap cute.'
      },
      {
        type: 'heading-text',
        heading: '4. Pleated Skirt + Varsity Jacket',
        text: 'Preppy meets coquette! Pleated skirt mini atau midi adalah signature piece aesthetic ini. Padukan dengan varsity jacket dari thrift untuk twist yang unexpected tapi sangat Instagrammable.'
      },
      {
        type: 'heading-text',
        heading: '5. Silk-like Slip Dress + Chunky Knit Sweater',
        text: 'Layer slip dress dengan chunky knit sweater oversized — tren yang tak pernah mati. Tambahkan knee-high socks dan platform shoes, dan kamu siap menjadi main character.'
      }
    ],
    cta: {
      label: '✨ Temukan Item yang Disebutkan di Artikel Ini',
      title: 'Cari blazer oversize, floral dress, dan lebih banyak lagi di GoodFinds',
      buttonText: 'Belanja Sekarang →'
    },
    related: ['sustainability', 'tips']
  },

  'sustainability': {
    id: 'sustainability',
    title: 'Kenapa Belanja Thrift Itu Tindakan Nyata untuk Bumi',
    category: 'Sustainability',
    categoryBadge: 'badge-green',
    date: '2 Mei 2026',
    readTime: '6 menit baca',
    author: {
      name: 'Dito Arya',
      role: 'Sustainability Writer · GoodFinds',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Penulis dan environmentalist yang percaya bahwa fashion berkelanjutan bukan tren, tapi kebutuhan.'
    },
    heroImage: 'https://i.pinimg.com/1200x/15/61/86/15618642472d07906da7b4b042318767.jpg',
    sections: [
      {
        type: 'text',
        content: 'Fast fashion menghasilkan 10% emisi karbon global — lebih dari semua penerbangan internasional dan maritim digabungkan. Setiap tahun, 92 juta ton tekstil limbah dibuang ke landfill. Angka yang menakutkan, tapi bukan berarti kita tidak berdaya.'
      },
      {
        type: 'heading-image-text',
        heading: 'Apa Dampak Satu Item Thrift?',
        image: 'https://i.pinimg.com/736x/36/bc/4a/36bc4a49159d112e4488190ec4bbc376.jpg',
        text: 'Setiap item thrift yang kamu beli mengurangi emisi CO₂ rata-rata 3.6 kg. Itu setara dengan 166 km berkendara! Belanja thrifting bukan sekadar hemat uang — ini tindakan nyata untuk mengurangi jejak karbonmu.'
      },
      {
        type: 'heading-text',
        heading: 'Mengapa Fast Fashion Bermasalah?',
        text: 'Industri fast fashion memproduksi 52 micro-collections per tahun — jauh dari tradisi 2 collections per tahun. Hasilnya? Kualitas menurun, limbah meningkat, dan pekerja garment sering dieksploitasi. Thrifting adalah cara bilang "tidak" pada sistem ini.'
      },
      {
        type: 'blockquote',
        content: '"Bukan seberapa banyak yang kamu beli, tapi bagaimana kamu membelinya." — Prinsip slow fashion'
      },
      {
        type: 'heading-text',
        heading: 'Tips Belanja Thrift yang Lebih Ramah Lingkungan',
        text: 'Pilih item yang benar-benar kamu butuhkan, bukan sekadar murah. Cek kualitas jahitan dan bahan. Pikirkan apakah item ini bisa kamu pakai minimal 30 kali. Kalau jawabannya ya, itu pembelian yang bijak.'
      }
    ],
    cta: {
      label: '🌿 Mulai Perjalanan Sustainable Kamu',
      title: 'Temukan item berkualitas tinggi yang sudah ada — bukan yang baru diproduksi',
      buttonText: 'Lihat Katalog Thrift →'
    },
    related: ['style-guide', 'tips']
  },

  'tips': {
    id: 'tips',
    title: 'Panduan Lengkap Belanja Thrift Online bagi Pemula',
    category: 'Tips & Trik',
    categoryBadge: 'badge-orange',
    date: '28 Apr 2026',
    readTime: '5 menit baca',
    author: {
      name: 'Sari Lestari',
      role: 'Shopping Expert · GoodFinds',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      bio: 'Seasoned thrift shopper dengan pengalaman 7+ tahun berburu barang preloved berkualitas.'
    },
    heroImage: 'https://i.pinimg.com/1200x/f6/b0/bc/f6b0bc9e8db03e3e0dd08af64e32bb59.jpg',
    sections: [
      {
        type: 'text',
        content: 'Belanja thrift online bisa jadi pengalaman yang seru sekaligus menantang. Tanpa bisa melihat dan menyentuh barang langsung, kamu perlu strategi khusus. Panduan ini akan membantumu berbelanja dengan percaya diri.'
      },
      {
        type: 'heading-image-text',
        heading: '1. Cek Kondisi Item dengan Teliti',
        image: 'https://i.pinimg.com/1200x/a6/03/7c/a6037cc7eab864dd7f59788a692b31e3.jpg',
        text: 'Baca deskripsi dengan saksama. Cek apakah ada mention tentang defect, stain, atau tear. Kalau tidak ada foto close-up di area yang rawan (sepeti ketiak, hem, dan kancing), jangan ragu untuk minta seller kirim foto tambahan.'
      },
      {
        type: 'heading-text',
        heading: '2. Kenali Ukuran dan Standar Seller',
        text: 'Setiap seller punya standar ukuran berbeda. Minta pengukuran actual: panjang baju, lebar dada, panjang lengan. Bandingkan dengan baju yang sudah kamu punya yang pas. Jangan asal pegang ke label size — S dari satu brand bisa beda dengan S dari brand lain.'
      },
      {
        type: 'heading-text',
        heading: '3. Cek Reputasi Seller',
        text: 'Lihat review dan rating seller. Seller yang reliable akan dengan jujur menjelaskan kondisi item, termasuk minus-nya. Kalau review banyak yang complain tentang deskripsi tidak match, better skip.'
      },
      {
        type: 'blockquote',
        content: '"Thrift shopping is 70% inspection, 30% serendipity." — Sari Lestari'
      },
      {
        type: 'heading-text',
        heading: '4. Tanya Kebijakan Return',
        text: 'Sebelum transfer, tanya apakah seller menerima return kalau barang tidak sesuai deskripsi. Catat bukti chat dan transaksi untuk keamanan. Di GoodFinds, semua transaksi dilindungi garansi.'
      }
    ],
    cta: {
      label: '💰 Siap Berburu?',
      title: 'Cari item yang sudah terkurasi dan terverifikasi kondisinya',
      buttonText: 'Mulai Belanja →'
    },
    related: ['style-guide', 'sustainability']
  },

  'brand': {
    id: 'brand',
    title: 'Zara Archive: Kenapa Koleksi Lama Justru Lebih Bernilai',
    category: 'Brand Spotlight',
    categoryBadge: 'badge-purple',
    date: '20 Apr 2026',
    readTime: '4 menit baca',
    author: {
      name: 'Mia Hartono',
      role: 'Fashion Historian · GoodFinds',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Collector vintage fashion dan penikmat sejarah desain industri fashion.'
    },
    heroImage: 'https://i.pinimg.com/1200x/eb/02/9f/eb029f6d181d6258fa03665608ceaa49.jpg',
    sections: [
      {
        type: 'text',
        content: 'Di dunia fashion, "archive" bukan sekadar kata lain untuk secondhand. Ini merujuk pada koleksi yang berasal dari era spesifik — sering kali dengan desain ikonik atau dari runway show tertentu. Dan Zara Archive? Ini kategori yang semakin dicari kolektor.'
      },
      {
        type: 'heading-image-text',
        heading: 'Apa itu Zara Archive?',
        image: 'https://i.pinimg.com/1200x/f8/0e/38/f80e38645f047516bc05c9f18cc65d0c.jpg',
        text: 'Zara Archive merujuk pada koleksi Zara dari era 90-an hingga mid-2010-an — masa ketika desainnya lebih eksperimental, cutting lebih unik, dan kualitas sering kali lebih superior daripada produksi masa kini. Item-item ini tidak lagi diproduksi, jadi ketersediaannya sangat terbatas.'
      },
      {
        type: 'heading-text',
        heading: 'Kenapa Harganya Lebih Mahal?',
        text: 'Kombinasi kelangkaan dan desain ikonik. Sepatu ankle boots dengan cut-out unik dari koleksi 2010? Jakker bomber dengan detail yang tidak lagi diproduksi? Ini item yang tidak akan kamu temukan di store Zara manapun hari ini. Pada dasarnya, kamu membeli piece of fashion history.'
      },
      {
        type: 'blockquote',
        content: '"Fast fashion terbaik bukan yang diproduksi hari ini — tapi yang bertahan dari masa lalu." — Mia Hartono'
      }
    ],
    cta: {
      label: '✨ Cari Brand Favorit Kamu',
      title: 'Dari Zara Archive hingga H&M vintage — temukan brand yang kamu cari',
      buttonText: 'Lihat Katalog →'
    },
    related: ['style-guide', 'tips']
  },

  'coquette': {
    id: 'coquette',
    title: 'Aesthetic Coquette: Panduan Lengkap untuk Pemula',
    category: 'Style Guide',
    categoryBadge: 'badge-pink',
    date: '15 Apr 2026',
    readTime: '7 menit baca',
    author: {
      name: 'Rara Putri',
      role: 'Style Editor · GoodFinds',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      bio: 'Obsesi dengan fashion berkelanjutan dan membantu semua orang tampil stylish tanpa harus beli baru.'
    },
    heroImage: 'https://i.pinimg.com/736x/11/fe/a9/11fea99c92383cd99d90e23ed67c7980.jpg',
    sections: [
      {
        type: 'text',
        content: 'Aesthetic coquette sedang viral di TikTok dan Instagram — tapi ini sebenarnya style yang sudah lama ada. Coquette menggabungkan elemen feminine, playful, dan sedikit mysterious. Bayangkan Lana Del Rey meets twee era meets modern romanticism.'
      },
      {
        type: 'heading-image-text',
        heading: 'Elemen Kunci Coquette Aesthetic',
        image: 'https://i.pinimg.com/1200x/b7/3c/ed/b73ced0756a19c3464456df8d6efe050.jpg',
        text: 'Ribbons, lace, bows, dan warna pastel — ini DNA dari coquette. Tapi bukan berarti kamu harus memakai semuanya sekaligus. Mulai dari satu statement piece: ribbon di leher, lace dress, atau bow hair accessory. Less is more, tapi make it count.'
      },
      {
        type: 'heading-text',
        heading: 'Color Palette yang Perlu Kamu Tahu',
        text: 'Soft pink, cream, white, lavender, baby blue — ini base colors coquette. Tapi jangan lupa hitam untuk contrast. Balenciagaaga black oversized blazer dengan white lace dress di bawah? Perpaduan perfect yang unexpected tapi Instagrammable.'
      },
      {
        type: 'blockquote',
        content: '"Coquette is not about being girly — it\'s about reclaiming femininity on your own terms." — Fashion commentary'
      },
      {
        type: 'heading-text',
        heading: 'Item Thrift yang Wajib Dicari',
        text: 'Lace slip dress, oversized blazer, pleated skirt, Mary Jane shoes, dan ribbon accessories. Thrifting adalah cara terbaik membangun aesthetic ini karena vintage items often have the romantic quality yang sulit ditemukan di fast fashion modern.'
      }
    ],
    cta: {
      label: '🎀 Bangun Coquette Wardrobe Kamu',
      title: 'Cari lace dresses, blazer oversized, dan coquette essentials di GoodFinds',
      buttonText: 'Belanja Sekarang →'
    },
    related: ['style-guide', 'brand']
  },

  'news': {
    id: 'news',
    title: 'GoodFinds Luncurkan Fitur Instant Drop — Perburuan Thrift Makin Seru!',
    category: 'Berita',
    categoryBadge: 'badge-blue',
    date: '10 Apr 2026',
    readTime: '3 menit baca',
    author: {
      name: 'Tim GoodFinds',
      role: 'Official Announcement',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      bio: 'Update terbaru dari GoodFinds untuk pengalaman thrifting yang lebih seru.'
    },
    heroImage: 'https://i.pinimg.com/736x/6e/28/f6/6e28f6bd19fa2b7acc7984aab42b0369.jpg',
    sections: [
      {
        type: 'text',
        content: 'Kabar gembira untuk para thrift hunter! GoodFinds memperkenalkan <strong>Instant Drop</strong> — fitur baru yang mengubah cara kamu berburu item thrift. Ratusan item baru akan dirilis serentak pada waktu yang sudah dijadwalkan. Siapa cepat, dia dapat!'
      },
      {
        type: 'heading-image-text',
        heading: 'Apa itu Instant Drop?',
        image: 'https://i.pinimg.com/1200x/d1/04/7f/d1047f7b5a885267bef119913bf928c4.jpg',
        text: 'Instant Drop adalah sistem rilis terjadwal. Setiap minggu, kami akan mengumumkan kapan drop berikutnya akan terjadi. Pada jam tersebut, ratusan item baru akan live di website. Pengguna bisa langsung membeli — sistem first come, first served dengan proses checkout yang super cepat.'
      },
      {
        type: 'heading-text',
        heading: 'Kenapa Instant Drop?',
        text: 'Feedback dari komunitas kami jelas: kalian ingin pengalaman yang lebih seru dan kompetitif. Instant Drop memberikan sensasi seperti "hunting" real — ada adrenaline rush saat countdown dan kepuasan saat berhasil dapat item yang diincar.'
      },
      {
        type: 'blockquote',
        content: '"Thrifting should feel like treasure hunting — and Instant Drop makes that happen." — GoodFinds Team'
      },
      {
        type: 'heading-text',
        heading: 'Jadwal Drop Pertama: 15 Mei 2026',
        text: 'Tandai kalendermu! Drop perdana akan menghadirkan koleksi special: vintage leather jackets, designer bags archive, dan limited edition items. Notification akan dikirim 24 jam dan 1 jam sebelum drop. Pastikan notifikasi aktif!'
      }
    ],
    cta: {
      label: '🚀 Siap untuk Drop Pertama?',
      title: 'Aktifkan notifikasi dan jadwalkan kalendermu',
      buttonText: 'Set Reminder →'
    },
    related: ['style-guide', 'tips']
  },

  'carbon': {
    id: 'carbon',
    title: 'Hitung Jejak Karbonmu: Seberapa Besar Dampak Thrifting?',
    category: 'Sustainability',
    categoryBadge: 'badge-green',
    date: '5 Apr 2026',
    readTime: '5 menit baca',
    author: {
      name: 'Dito Arya',
      role: 'Sustainability Writer · GoodFinds',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Penulis dan environmentalist yang percaya bahwa fashion berkelanjutan bukan tren, tapi kebutuhan.'
    },
    heroImage: 'https://i.pinimg.com/1200x/29/7a/3b/297a3b56abc377a1c12c9382c934ee7d.jpg',
    sections: [
      {
        type: 'text',
        content: 'Kita sering dengar tentang jejak karbon — tapi pernahkah kamu berpikir berapa emisi yang dihasilkan oleh satu baju baru? Dan seberapa besar perbedaan yang kamu buat dengan memilih thrifting? Mari kita hitung bersama.'
      },
      {
        type: 'heading-image-text',
        heading: 'Emisi per Satu Item Fashion',
        image: 'https://i.pinimg.com/736x/e2/e8/43/e2e8439d399510021d86ee6487eaa53f.jpg',
        text: 'Satu t-shirt baru menghasilkan rata-rata 5.5 kg CO₂. Satu pair of jeans? 33.4 kg. Itu setara dengan 111 km berkendara! Dengan membeli thrift, kamu menghilangkan emisi produksi baru sepenuhnya — dan satu item thrift yang dipilih daripada baru mengurangi emisi hingga 3.6 kg CO₂.'
      },
      {
        type: 'heading-text',
        heading: 'Kalkulator Sederhana',
        text: 'Kalau dalam setahun kamu biasa membeli 10 item fashion baru dan menggantinya dengan 10 item thrift, kamu sudah mengurangi jejak karbon sebesar 36 kg CO₂. Itu setara dengan mematikan 4 lampu LED yang menyala 24/7 selama setahun penuh. Impact yang real, bukan sekadar feel-good.'
      },
      {
        type: 'blockquote',
        content: '"Every thrift purchase is a vote for a different system — one where existing resources are valued, not wasted." — Dito Arya'
      },
      {
        type: 'heading-text',
        heading: 'Tantangan 30-Day Thrift Only',
        text: 'Challenge: selama 30 hari, beli hanya thrift atau secondhand. Document setiap pembelian dan hitung estimasi CO₂ yang kamu hemat. Share di social media dengan hashtag #ThriftingForEarth. Komunitas GoodFinds akan memilih pemenang dengan impact paling besar!'
      }
    ],
    cta: {
      label: '🌊 Mulai Hemat Karbon Hari Ini',
      title: 'Setiap pembelian thrift adalah langkah kecil menuju perubahan besar',
      buttonText: 'Lihat Katalog →'
    },
    related: ['sustainability', 'tips']
  }
};

// Helper function untuk mendapatkan artikel dari ID
function getArticle(id) {
  return articlesData[id] || articlesData['style-guide']; // fallback ke style guide kalau ID tidak ditemukan
}