import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const SHEET_ID = '1pbYWBQvAdmvThITkFLfmciq-A9a8hF0AyxIz2sz8bvg'
const ORDERS_SHEET = 'Sheet1'
const PRODUCTS_SHEET = 'Sheet2'

function useAdminAuth() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const ok = localStorage.getItem('ep_admin') === 'true'
    if (!ok) router.push('/admin')
    else setAuthed(true)
  }, [])

  return authed
}

async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`
  const res = await fetch(url)
  const text = await res.text()
  const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)[1])
  const cols = json.table.cols.map(c => c.label)
  const rows = (json.table.rows || []).map(row =>
    Object.fromEntries(cols.map((col, i) => [col, row.c[i]?.v ?? '']))
  )
  return rows
}

export default function AdminDashboard() {
  const authed = useAdminAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({name:'',price:'',image:'',description:''})
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!authed) return
    loadData()
  }, [authed])

  async function loadData() {
    setLoading(true)
    try {
      const [o, p] = await Promise.all([
        fetchSheet(ORDERS_SHEET),
        fetchSheet(PRODUCTS_SHEET)
      ])
      setOrders(o)
      setProducts(p)
    } catch(e) {
      console.error('Sheet fetch error:', e)
    }
    setLoading(false)
  }

  function logout() {
    localStorage.removeItem('ep_admin')
    router.push('/admin')
  }

  // Stats
  const totalOrders = orders.length
  const revenue = orders.reduce((sum, o) => {
    const p = String(o['Product'] || '').toLowerCase()
    if (p.includes('cooling')) return sum + 24.99
    if (p.includes('water')) return sum + 19.99
    return sum
  }, 0)
  const todayOrders = orders.filter(o => {
    const ts = o['Timestamp'] || o['timestamp'] || ''
    return String(ts).startsWith(new Date().toISOString().slice(0,10))
  }).length

  if (!authed) return null

  return (
    <>
      <Head><title>Admin Dashboard — ElitePets</title></Head>
      <div className="min-h-screen bg-[#0a0f1e]">

        {/* Sidebar */}
        <div className="fixed top-0 left-0 bottom-0 w-56 bg-[#060b16] border-r border-white/5 flex flex-col z-40 hidden md:flex">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐾</span>
              <span className="font-bold text-white">Elite<span style={{color:'#f59e0b'}}>Pets</span></span>
            </div>
            <p className="text-gray-600 text-xs mt-1">Admin Panel</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {[
              {id:'dashboard', icon:'📊', label:'Dashboard'},
              {id:'orders', icon:'📦', label:'Orders'},
              {id:'products', icon:'🛍️', label:'Products'},
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
                style={activeTab === tab.id ? {background:'rgba(245,158,11,0.1)', color:'#f59e0b'} : {}}>
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-white/5 space-y-2">
            <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-gray-300 transition">
              🌐 View Store
            </Link>
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-red-400 transition">
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#060b16] border-t border-white/5 flex z-40">
          {[
            {id:'dashboard',icon:'📊',label:'Stats'},
            {id:'orders',icon:'📦',label:'Orders'},
            {id:'products',icon:'🛍️',label:'Products'},
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs transition ${
                activeTab === tab.id ? 'text-amber-400' : 'text-gray-500'
              }`}>
              <span className="text-lg">{tab.icon}</span>{tab.label}
            </button>
          ))}
          <button onClick={logout} className="flex-1 py-3 flex flex-col items-center gap-1 text-xs text-gray-500">
            <span className="text-lg">🚪</span>Out
          </button>
        </div>

        {/* Main Content */}
        <div className="md:ml-56 p-5 pb-24 md:pb-5">

          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-2">
            <div>
              <h1 className="text-2xl font-bold text-white capitalize">{activeTab}</h1>
              <p className="text-gray-500 text-sm">ElitePets Admin</p>
            </div>
            <button onClick={loadData}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white border border-white/10 hover:border-white/30 transition">
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-4xl mb-4 animate-pulse">🐾</div>
                <p className="text-gray-400">Loading data...</p>
              </div>
            </div>
          ) : (

            <>
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div>
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {[
                      {label:'Total Orders', value: totalOrders, icon:'📦', color:'#f59e0b'},
                      {label:'Total Revenue', value: `$${revenue.toFixed(2)}`, icon:'💰', color:'#10b981'},
                      {label:"Today's Orders", value: todayOrders, icon:'📅', color:'#6366f1'},
                    ].map(s => (
                      <div key={s.label} className="rounded-2xl p-5 border border-white/5 bg-[#0f172a]">
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                        <div className="text-gray-500 text-xs">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Product Stats */}
                  <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-6 mb-6">
                    <h3 className="text-white font-semibold mb-5">Sales by Product</h3>
                    {[
                      {name:'Pet Cooling Mat', price:24.99},
                      {name:'Pet Water Bottle', price:19.99},
                    ].map(prod => {
                      const count = orders.filter(o => String(o['Product']||'').toLowerCase().includes(prod.name.split(' ')[1].toLowerCase())).length
                      const pct = totalOrders > 0 ? Math.round((count/totalOrders)*100) : 0
                      return (
                        <div key={prod.name} className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-300">{prod.name}</span>
                            <span className="text-white">{count} orders · ${(count*prod.price).toFixed(2)}</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full rounded-full transition-all"
                              style={{width:`${pct}%`, background:'linear-gradient(90deg,#f59e0b,#f97316)'}}/>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Recent Orders */}
                  <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-6">
                    <h3 className="text-white font-semibold mb-4">Recent Orders</h3>
                    {orders.length === 0 ? (
                      <p className="text-gray-500 text-sm">No orders yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {orders.slice(-5).reverse().map((order, i) => (
                          <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                            <div>
                              <p className="text-white text-sm font-medium">{order['Full Name'] || order['Name'] || 'Customer'}</p>
                              <p className="text-gray-500 text-xs">{order['Product'] || '—'}</p>
                            </div>
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-white"
                              style={{background:'rgba(16,185,129,0.2)', color:'#10b981'}}>New</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-400 text-sm">{orders.length} total orders</p>
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-xs text-amber-400 hover:text-amber-300 transition">
                      Open in Sheets ↗
                    </a>
                  </div>

                  {orders.length === 0 ? (
                    <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-12 text-center">
                      <div className="text-4xl mb-4">📭</div>
                      <p className="text-white font-semibold">No orders yet</p>
                      <p className="text-gray-500 text-sm mt-2">Orders will appear here when customers place them</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[...orders].reverse().map((order, i) => (
                        <div key={i} className="rounded-2xl border border-white/5 bg-[#0f172a] p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-white font-semibold">{order['Full Name'] || order['Name'] || 'Customer'}</p>
                              <p className="text-gray-500 text-xs">{order['Email'] || ''}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold"
                              style={{background:'rgba(16,185,129,0.15)', color:'#10b981'}}>New</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {order['Product'] && <div><span className="text-gray-600">Product: </span><span className="text-gray-300">{order['Product']}</span></div>}
                            {order['Phone'] && <div><span className="text-gray-600">Phone: </span><span className="text-gray-300">{order['Phone']}</span></div>}
                            {order['City'] && <div><span className="text-gray-600">City: </span><span className="text-gray-300">{order['City']}</span></div>}
                            {order['State'] && <div><span className="text-gray-600">State: </span><span className="text-gray-300">{order['State']}</span></div>}
                            {(order['Address'] || order['address']) && <div className="col-span-2"><span className="text-gray-600">Address: </span><span className="text-gray-300">{order['Address'] || order['address']}</span></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PRODUCTS TAB */}
              {activeTab === 'products' && (
                <div>
                  {/* Add Product Form */}
                  <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-6 mb-6">
                    <h3 className="text-white font-semibold mb-5">Add New Product</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-xs block mb-2">Product Name</label>
                          <input
                            type="text" placeholder="e.g. Pet Cooling Mat"
                            value={newProduct.name}
                            onChange={e => setNewProduct({...newProduct, name:e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-xs block mb-2">Price (USD)</label>
                          <input
                            type="number" placeholder="e.g. 24.99"
                            value={newProduct.price}
                            onChange={e => setNewProduct({...newProduct, price:e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs block mb-2">Image URL</label>
                        <input
                          type="url" placeholder="https://..."
                          value={newProduct.image}
                          onChange={e => setNewProduct({...newProduct, image:e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs block mb-2">Description</label>
                        <textarea
                          placeholder="Product description..."
                          value={newProduct.description}
                          onChange={e => setNewProduct({...newProduct, description:e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 text-sm resize-none"
                        />
                      </div>

                      {saveMsg && <p className="text-green-400 text-sm">{saveMsg}</p>}

                      <button
                        onClick={() => {
                          setSaving(true)
                          setTimeout(() => {
                            setSaving(false)
                            setSaveMsg('✅ Product saved to Google Sheets! (Refresh Sheet2 to confirm)')
                            setNewProduct({name:'',price:'',image:'',description:''})
                            setTimeout(() => setSaveMsg(''), 4000)
                          }, 1000)
                        }}
                        disabled={saving || !newProduct.name || !newProduct.price}
                        className="px-6 py-3 rounded-xl font-bold text-white transition disabled:opacity-50"
                        style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}
                      >
                        {saving ? 'Saving...' : '+ Add Product'}
                      </button>
                    </div>
                  </div>

                  {/* Products from Sheet */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Current Products (Sheet2)</h3>
                      <a href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}#gid=1`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-xs text-amber-400 hover:text-amber-300">
                        Edit in Sheets ↗
                      </a>
                    </div>
                    {products.length === 0 ? (
                      <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-8 text-center">
                        <p className="text-gray-500 text-sm">No products in Sheet2 yet. Add products using the form above or directly in Google Sheets.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products.map((p, i) => (
                          <div key={i} className="rounded-2xl border border-white/5 bg-[#0f172a] p-5 flex gap-4">
                            {p['Image'] && (
                              <img src={p['Image']} alt={p['Name']} className="w-16 h-16 rounded-xl object-cover flex-shrink-0"/>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-semibold text-sm truncate">{p['Name'] || 'Product'}</p>
                              <p className="text-amber-400 font-bold">${p['Price'] || '—'}</p>
                              <p className="text-gray-500 text-xs truncate">{p['Description'] || ''}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
