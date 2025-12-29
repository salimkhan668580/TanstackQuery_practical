

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">MyApp</h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-indigo-600">Home</a>
            <a href="#" className="hover:text-indigo-600">Features</a>
            <a href="#" className="hover:text-indigo-600">Pricing</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </nav>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Build modern web apps <br /> faster with confidence
          </h2>
          <p className="text-gray-600 mb-8">
            A simple, scalable platform to manage users, payments,
            and everything your product needs to grow.
          </p>
          <div className="flex gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
              Start Free Trial
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="h-48 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-semibold">
            Hero Illustration
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-12">
            Why choose our platform?
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-md transition">
              <h4 className="font-semibold mb-2">Fast Setup</h4>
              <p className="text-sm text-gray-600">
                Get started in minutes with minimal configuration.
              </p>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-md transition">
              <h4 className="font-semibold mb-2">Secure</h4>
              <p className="text-sm text-gray-600">
                Industry-standard security and authentication built-in.
              </p>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-md transition">
              <h4 className="font-semibold mb-2">Scalable</h4>
              <p className="text-sm text-gray-600">
                Designed to scale as your user base grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to launch your product?
          </h3>
          <p className="mb-8 text-indigo-100">
            Join thousands of developers building faster and smarter.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default HomePage
