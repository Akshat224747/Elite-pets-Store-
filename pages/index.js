import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PRODUCTS } from '../data/products'

export default function Home() {
  return (
    <>
      <Head>
        <title>ElitePets — Premium Pet Products</title>
        <meta name="description" content="Premium pet products for the pets you love. Shop cooling mats, water bottles, and more. Fast US shipping." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="pt-16">

        {/* HERO */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden"
          style={{background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.12) 0%, transparent 70%), #0a0f1e'}}>
          <div className="absolute top-20 right-8 w-64 h-64 rounded-full opacity-5"
            style={{background: 'radial-gradient(circle, #f59e0b, transparent)'}} />
          <div className="max-w-6xl mx-auto px-4 py-20 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-xs font-medium tracking-wider uppercase"
                style={{borderColor: 'rgba(245,158,11,0.3)', color: '#f59e0b', background: 'rgba(245,158,11,0.05)'}}>
                🐾 Free US Shipping on Orders $35+
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
                Your Pet Deserves{' '}
                <span style={{background:'linear-gradient(135deg,#f59e0b,#f97316)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                  The Best.
                </span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                Premium quality pet products trusted by thousands of US pet owners. Built to last, priced to love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="px-8 py-4 rounded-full font-bold text-white text-center text-lg transition-all active:scale-95"
                  style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
                  Shop Now →
                </Link>
                <Link href="#products" className="px-8 py-4 rounded-full font-semibold text-white text-center text-lg border border-white/10 hover:border-white/30 transition-all">
                  View Products
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-12">
                {['⭐ 4.9/5 Rating','🚚 Fast Shipping','🔒 Secure Checkout'].map(b => (
                  <span key={b} className="text-gray-400 text-sm">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="py-20 bg-[#0a0f1e]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#f59e0b'}}>Our Products</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Loved By Pets, Trusted By Owners</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PRODUCTS.map(product => (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#0f172a] hover:border-amber-500/30 transition-all duration-300">
                    <div className="relative overflow-hidden h-64">
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(10,15,30,0.7) 0%, transparent 60%)'}} />
                      {product.badge && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{background:product.badgeColor}}>{product.badge}</span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{product.shortDesc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold" style={{color:'#f59e0b'}}>${product.price}</span>
                          <span className="text-gray-500 text-sm line-through">${product.originalPrice}</span>
                        </div>
                        <span className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                          style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-20" style={{background:'linear-gradient(180deg,#0a0f1e 0%,#0d1526 100%)'}}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#f59e0b'}}>Why ElitePets</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">We Go Above & Beyond</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {icon:'🚚',title:'Fast US Shipping',desc:'Orders ship within 24 hours. Delivered in 5–8 business days with full tracking.'},
                {icon:'✅',title:'Quality Guaranteed',desc:'Every product is rigorously tested. Non-toxic, pet-safe materials on every item.'},
                {icon:'💬',title:'24/7 Support',desc:'Our team is always here. Email us anytime and we respond within 6 hours.'},
              ].map(f => (
                <div key={f.title} className="rounded-2xl p-8 border border-white/5 bg-[#0f172a] text-center">
                  <div className="text-5xl mb-5">{f.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-20 bg-[#0a0f1e]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#f59e0b'}}>Reviews</p>
              <h2 className="text-4xl font-bold text-white">Happy Pets, Happy Owners</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {name:'Sarah M.',location:'Texas',text:"My golden retriever LOVES the cooling mat. She refuses to sleep anywhere else now. Worth every penny!"},
                {name:'James K.',location:'California',text:"The water bottle is genius. Used it on a 10-mile hike with my lab. Zero spills, easy to use."},
                {name:'Emily R.',location:'Florida',text:"Fast shipping, great quality. My cat sleeps on the cooling mat all day. Amazing product!"},
              ].map(r => (
                <div key={r.name} className="rounded-2xl p-6 border border-white/5 bg-[#0f172a]">
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_,i)=><span key={i} style={{color:'#f59e0b'}}>★</span>)}</div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">"{r.text}"</p>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-gray-500 text-xs">{r.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{background:'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(249,115,22,0.1))'}}>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Spoil Your Pet?</h2>
            <p className="text-gray-400 mb-8">Join thousands of happy pet owners. Free shipping on orders $35+.</p>
            <Link href="/products" className="inline-block px-10 py-4 rounded-full font-bold text-white text-lg active:scale-95"
              style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
              Shop All Products →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
