import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#060b16] border-t border-white/5 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="font-bold text-xl">
                <span className="text-white">Elite</span>
                <span style={{color:'#f59e0b'}}>Pets</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium pet products for the pets you love. Quality you can trust, delivered fast.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">Products</Link></li>
              <li><Link href="/products/pet-cooling-mat" className="text-gray-400 hover:text-white text-sm transition-colors">Pet Cooling Mat</Link></li>
              <li><Link href="/products/pet-water-bottle" className="text-gray-400 hover:text-white text-sm transition-colors">Pet Water Bottle</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">📧 support@elitepets.store</li>
              <li className="text-gray-400 text-sm">⏰ Mon–Fri, 9am–6pm EST</li>
              <li className="text-gray-400 text-sm">🚚 Free shipping on orders $35+</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all text-sm">ig</a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all text-sm">tt</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">© 2025 ElitePets. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Made with ❤️ for pet lovers</p>
        </div>
      </div>
    </footer>
  )
}
