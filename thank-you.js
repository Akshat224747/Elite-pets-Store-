import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Order Confirmed — ElitePets</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
            style={{background:'rgba(245,158,11,0.1)', border:'2px solid rgba(245,158,11,0.3)'}}>
            🎉
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Order Received!</h1>
          <p className="text-gray-400 mb-2">
            Thank you for your order. We've received your details and our team will confirm via email within 24 hours.
          </p>
          <p className="text-gray-500 text-sm mb-8">Expected delivery: 5–8 business days</p>
          <Link href="/products"
            className="inline-block px-8 py-3 rounded-full font-bold text-white"
            style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
            Continue Shopping →
          </Link>
        </div>
      </main>
    </>
  )
}
