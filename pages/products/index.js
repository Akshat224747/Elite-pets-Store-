import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { PRODUCTS } from '../../data/products'

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>Products — ElitePets</title>
        <meta name="description" content="Shop premium pet products — cooling mats, water bottles & more." />
      </Head>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-[#0a0f1e]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#f59e0b'}}>All Products</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Shop ElitePets</h1>
            <p className="text-gray-400 mt-4 text-lg">Premium products for happy, healthy pets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map(product => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#0f172a] hover:border-amber-500/30 transition-all duration-300">
                  <div className="relative overflow-hidden h-72">
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(10,15,30,0.7) 0%,transparent 60%)'}}/>
                    {product.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{background:product.badgeColor}}>{product.badge}</span>
                    )}
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-black/40 backdrop-blur">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{product.shortDesc}</p>
                    <ul className="space-y-1 mb-5">
                      {product.features.slice(0,3).map(f => (
                        <li key={f} className="text-gray-500 text-xs">{f}</li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold" style={{color:'#f59e0b'}}>${product.price}</span>
                        <span className="text-gray-500 text-sm line-through ml-2">${product.originalPrice}</span>
                      </div>
                      <span className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition group-hover:opacity-90"
                        style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
                        Buy Now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
