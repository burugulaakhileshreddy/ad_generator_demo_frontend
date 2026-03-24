export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">

      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Ad Generator
            </h3>

            <p className="mt-4 text-sm text-gray-400">
              Turn your website into video ads
              in seconds.
            </p>
          </div>


          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Product
            </h4>

            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">API</li>
              <li className="hover:text-white cursor-pointer">Integrations</li>
            </ul>
          </div>


          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Company
            </h4>

            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>


          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Legal
            </h4>

            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Cookies</li>
            </ul>
          </div>

        </div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} Ad Generator. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
            <span className="hover:text-white cursor-pointer">YouTube</span>
          </div>

        </div>

      </div>

    </footer>
  )
}