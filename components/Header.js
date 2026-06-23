import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="font-bold text-xl tracking-tight">
            <span className="text-white">Elite</span>
            <span className="text-gold-400" style={{color:'#f59e0b'}}>Pets</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Home</Link>
          <Link href="/products" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Products</Link>
          <Link href="/#features" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">About</Link>
          <Link href="/#contact" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Contact</Link>
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="hidden md:inline-block px-5 py-2 rounded-full text-sm font-semibold text-white transition-all btn-glow"
            style={{background: 'linear-gradient(135deg, #f59e0b, #f97316)'}}
          >
            Shop Now
          </Link>
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f172a] border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-gray-300 hover:text-white font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" className="text-gray-300 hover:text-white font-medium" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/#features" className="text-gray-300 hover:text-white font-medium" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/#contact" className="text-gray-300 hover:text-white font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link
            href="/products"
            className="w-full text-center py-3 rounded-full font-semibold text-white"
            style={{background: 'linear-gradient(135deg, #f59e0b, #f97316)'}}
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </Link>
        </div>
      )}
    </header>
  )
}
