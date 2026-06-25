import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
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

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjTCTzTTH1mG8YJI0_7var8hMM_s69Uc8nAwyfYJqaJ0nuGsEiRrXRSnsD4c0oUzaf/exec'

export default function ProductDetail({ product }) {
  const [showForm, setShowForm] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
  })

  if (!product) return null

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.zip) {
      alert('Please fill all fields!')
      return
    }
    setSubmitting(true)
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          product: `${product.name} - ${selectedSize}`
        })
      })
    } catch(e) {}
    setSubmitting(false)
    setSubmitted(true)
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

              <button onClick={() => setShowForm(true)}
                className="w-full py-4 rounded-full font-bold text-white text-lg mb-4 transition-all active:scale-95"
                style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
                🛒 Buy Now — ${product.price}
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          style={{background:'rgba(0,0,0,0.85)'}}>
          <div className="w-full md:max-w-lg rounded-t-3xl md:rounded-2xl overflow-hidden"
            style={{background:'#0f172a', maxHeight:'95vh', overflowY:'auto'}}>
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-white/10"
              style={{background:'#0f172a'}}>
              <div>
                <h3 className="text-white font-bold text-lg">Complete Your Order</h3>
                <p style={{color:'#f59e0b'}} className="text-sm font-semibold">{product.name} · {selectedSize} · ${product.price}</p>
              </div>
              <button onClick={() => {setShowForm(false); setSubmitted(false)}}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition"
                style={{background:'rgba(255,255,255,0.05)'}}>✕</button>
            </div>
            <div className="px-6 py-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Order Placed!</h3>
                  <p className="text-gray-400 mb-6">Thank you! We'll confirm your order via email within 24 hours.</p>
                  <button onClick={() => {setShowForm(false); setSubmitted(false)}}
                    className="px-8 py-3 rounded-full font-bold text-white"
                    style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    {name:'name', label:'Full Name', placeholder:'John Smith', type:'text'},
                    {name:'email', label:'Email', placeholder:'john@email.com', type:'email'},
                    {name:'phone', label:'Phone', placeholder:'+1 (555) 000-0000', type:'tel'},
                    {name:'address', label:'Street Address', placeholder:'123 Main Street', type:'text'},
                    {name:'city', label:'City', placeholder:'New York', type:'text'},
                    {name:'state', label:'State', placeholder:'NY', type:'text'},
                    {name:'zip', label:'ZIP Code', placeholder:'10001', type:'text'},
                  ].map(field => (
                    <div key={field.name}>
                      <label className="text-gray-400 text-xs block mb-1.5">{field.label} *</label>
                      <input name={field.name} value={form[field.name]} onChange={handleChange}
                        placeholder={field.placeholder} type={field.type}
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none"
                        style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)'}}/>
                    </div>
                  ))}

                  <div className="rounded-xl p-4" style={{background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)'}}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Product</span>
                      <span className="text-white">{product.name}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Size</span>
                      <span className="text-white">{selectedSize}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Shipping</span>
                      <span style={{color:'#10b981'}}>FREE</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-bold">
                      <span className="text-white">Total</span>
                      <span style={{color:'#f59e0b'}}>${product.price}</span>
                    </div>
                  </div>

                  <button onClick={handleSubmit} disabled={submitting}
                    className="w-full py-4 rounded-full font-bold text-white text-lg active:scale-95 disabled:opacity-70"
                    style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
                    {submitting ? '⏳ Placing Order...' : `🛒 Place Order — $${product.price}`}
                  </button>
                  <p className="text-center text-gray-600 text-xs">🔒 Secure & Safe · Free shipping · 5–8 days delivery</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}
