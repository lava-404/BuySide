'use client'
import { useRouter } from "next/navigation"
import Navbar from "./components/Navbar"
import KitchenLayout from "./components/KitchenLayout"
import { Instrument_Serif } from 'next/font/google'
import Footer from "./components/Footer"
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'], // optional: can add '700' if you want bold
})

export default function Home() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/auth')  // 👈 redirects to /auth page
  }
  const handleBrowse = () => {
    router.push('/products')  // 👈 redirects to /auth page
  }

  return (
    <div className="min-h-screen bg-neutral-100">

      <div className="min-h-screen bg-white font-sans mt-10 h-[30rem] mx-50">
        {/* Hero Section */}
        <div className="w-full bg-[#e3d8b7] flex items-center justify-between pl-50 rounded-xl mt-30 shadow-lg ">
          
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center max-w-lg h-full">
            <h1 className="text-[5rem] text-gray-900 mb-6 leading-tight font-instrument">
              Your Home Essentials, Delivered Fresh 
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover quality household products that make life smoother.
              From kitchenware to decor — we’ve got you covered.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={handleSignIn} 
                className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
              >
                Sign in as Admin
              </button>
              <button 
                onClick={handleBrowse} 
                className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
              >
                Browse as Shopper
              </button>
            </div>
            
          </div>

          {/* Right Side - Image */}
          <div className="w-[700px] h-[40rem] right-0">
            <img 
              src="/images/homessentials.png" 
              alt="Home essentials"
              className="w-full h-full rounded-lg  drop-shadow-lg"
            />
          </div>
          

        </div>
        <div className="flex flex-col gap-0 justify-center items-center my-20">
            <div className="text-[5rem] font-instrument">
              “Redefine comfort. Redefine your space.”
            </div>
            <div className="text-sm">
              Curated home essentials that whisper luxury in every corner.
            </div>

          </div>
        <KitchenLayout />
        <Footer />
      </div>
      
    </div>
  );
}
