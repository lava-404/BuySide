'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = async () => {
    const ADMIN_PASSWORD = "1234"

    if (password !== ADMIN_PASSWORD) {
      alert("Access Denied 🚫 Wrong password!")
      return
    }

    try {
      console.log("Admin logged in:", email)
      localStorage.setItem("admin", JSON.stringify(email))
      router.push('/admin')
    } catch (err) {
      console.error(err)
      alert("Something went wrong ")
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-white text-gray-800">
      
      {/* Left Section - Login Form */}
      <div className="flex flex-col gap-6 p-8 md:p-14">
        {/* Logo / Brand */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-semibold text-gray-800">
            <div className="bg-violet-600 text-white flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            BuySide Admin
          </a>
        </div>

        {/* Form Section */}
        <div className="flex flex-1 items-center justify-center">
          <form
            className="flex flex-col w-full max-w-sm gap-6 border border-gray-200 bg-white rounded-xl shadow-lg px-8 py-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-3xl font-bold text-center">Admin Login</h2>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="1234"
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <button
              type="button"
              onClick={handleSignIn}
              className="w-full bg-violet-600 text-white py-2 rounded-md font-semibold hover:bg-violet-700 transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="relative hidden lg:block bg-[#FEC947]">
        <img
          src="/images/admin-bg.png"
          alt="Home essentials background"
          className="absolute inset-0 h-full z-10 w-full object-contain brightness-100"
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      </div>
    </div>
  )
}
