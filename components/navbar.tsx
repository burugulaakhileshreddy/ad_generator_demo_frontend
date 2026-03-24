"use client"

export default function Navbar() {

  const handleClick = () => {
    const input = document.getElementById("hero-input")
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" })
      setTimeout(() => {
        input.focus()
        input.classList.add("focus-animate")

        setTimeout(() => {
          input.classList.remove("focus-animate")
        }, 1500)

      }, 500)
    }
  }

  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 bg-black border-b border-white/10">

      {/* LOGO */}
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text tracking-wide">
        Ad Generator
      </div>

      {/* BUTTON */}
      <button
        onClick={handleClick}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20"
      >
        Get Started
      </button>

    </nav>
  )
}