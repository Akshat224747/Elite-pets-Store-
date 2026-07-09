import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { PRODUCTS, getProduct } from '../../data/products'

export async function getStaticPaths() {
  return {
    paths: PRODUCTS.map(p => ({ params: { id: p.id } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const product = getProduct(params.id)
  return { props: { product } }
}

export default function ProductDetail({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  if (!product) return null

  const handlePayPal = () => {
    const returnUrl = `https://elite-pets-store.vercel.app/thank-you?product=${encodeURIComponent(product.name)}&size=${encodeURIComponent(selectedSize)}&price=${product.price}`
    const cancelUrl = `https://elite-pets-store.vercel.app/products/${product.id}`
    
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=adityapanwar0403@gmail.com&item_name=${encodeURIComponent(product.name + ' - ' + selectedSize)}&amount=${product.price}&currency_code=USD&return=${encodeURIComponent(returnUrl)}&cancel_return=${encodeURIComponent(cancelUrl)}`
    
    window.location.href = paypalUrl
  }

  return (
    <>
      <Head>
        <title>{product.name} — ElitePets</title>
        <meta name="description" content={product.shortDesc} />
      </Head>
      <Header />

      <main className="pt-24 pb-20 min-h-screen bg-[#0a0f1e]">
        <div className="max-w-6xl mx-auto px-4">

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-gray-300">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0f172a]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{background:product.badgeColor}}>{product.badge}</span>
              )}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-500">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">{[...Array(5)].map((_,i)=><span key={i} style={{color:'#f59e0b'}}>★</span>)}</div>
                <span className="text-gray-400 text-sm">4.9 · 128 reviews</span>
              </div>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold" style={{color:'#f59e0b'}}>${product.price}</span>
                <span className="text-gray-500 text-xl line-through">${product.originalPrice}</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold text-white bg-red-500">
                  SAVE ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.shortDesc}</p>

              <div className="mb-6">
                <p className="text-sm font-semibold text-white mb-3">Select Size:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        selectedSize === size ? 'border-amber-500 text-white' : 'border-white/10 text-gray-400'
                      }`}
                      style={selectedSize === size ? {background:'rgba(245,158,11,0.15)'} : {}}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4 mb-4" style={{background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)'}}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Product</span>
                  <span className="text-white font-medium">{product.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Size</span>
                  <span className="text-white font-medium">{selectedSize}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Shipping</span>
                  <span style={{color:'#10b981'}} className="font-medium">FREE</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span style={{color:'#f59e0b'}}>${product.price}</span>
                </div>
              </div>

              {/* PayPal Buy Now Button */}
              <button onClick={handlePayPal}
                className="w-full py-4 rounded-full font-bold text-white text-lg mb-3 transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{background:'#0070ba'}}>
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-5"/>
                Pay with PayPal — ${product.price}
              </button>

              <p className="text-center text-gray-500 text-xs mb-6">{product.shipping}</p>

              <div className="grid grid-cols-3 gap-3">
                {[{icon:'🔒',label:'Secure Order'},{icon:'🚚',label:'Free Shipping'},{icon:'💰',label:'Best Price'}].map(b => (
                  <div key={b.label} className="rounded-xl p-3 text-center border border-white/5 bg-[#0f172a]">
                    <div className="text-xl mb-1">{b.icon}</div>
                    <div className="text-gray-400 text-xs">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Product Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map(f => (
                <div key={f} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{f.split(' ')[0]}</span>
                  <span className="text-gray-300 text-sm leading-relaxed">{f.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">About This Product</h2>
            {product.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed mb-4">{para}</p>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRODUCTS.filter(p => p.id !== product.id).map(p => (
                <Link key={p.id} href={`/products/${p.id}`} className="group">
                  <div className="flex gap-4 rounded-2xl border border-white/5 bg-[#0f172a] p-4 hover:border-amber-500/30 transition-all">
                    <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0"/>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{p.name}</h3>
                      <p className="text-gray-400 text-xs mb-2">{p.shortDesc}</p>
                      <span className="font-bold" style={{color:'#f59e0b'}}>${p.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
  }
