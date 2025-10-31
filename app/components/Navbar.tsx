"use client"

import { useState } from "react"
import { Moon, Sun, User, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  return (
    <nav className="flex items-center justify-between px-5 py-3 border-b bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
        <Image
          src="/images/logo.png"
          alt=""
          width={20}
          height={20}
          className="rounded-md"
        />
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
          Buyside
        </h1>
      </div>

      {/* Center Nav Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link href="/admin/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
        <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
        <Link href="/admin" className="hover:text-gray-900 transition-colors">Admin</Link>
        <Link href="/settings" className="hover:text-gray-900 transition-colors">Settings</Link>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-md border hover:bg-gray-100 transition"
        >
          {darkMode ? (
            <Sun className="size-4 text-gray-700" />
          ) : (
            <Moon className="size-4 text-gray-700" />
          )}
        </button>

        {/* Profile */}
        <button
          className="flex items-center gap-2 border rounded-md px-3 py-1.5 hover:bg-gray-100 transition"
          onClick={() => router.push("/profile")}
        >
          <User className="size-4 text-gray-700" />
          <span className="hidden sm:inline text-sm font-medium text-gray-700">Profile</span>
        </button>

        {/* Mobile Menu */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-100 border transition">
          <Menu className="size-4 text-gray-700" />
        </button>
      </div>
    </nav>
  )
}
