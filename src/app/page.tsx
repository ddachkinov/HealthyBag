import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="font-heading text-5xl sm:text-6xl font-extrabold tracking-tight text-primary-500">
            Healthy
            <span className="text-secondary-500">Bag</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 font-body leading-relaxed">
            Яж здравословно за по-малко.
            <br />
            <span className="text-gray-400 text-lg">
              Research-backed meal plans from discounted eBag.bg groceries.
            </span>
          </p>

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🥗</div>
              <h3 className="font-heading font-bold text-primary-600 mb-1">
                Science-Backed
              </h3>
              <p className="text-sm text-gray-500">
                TDEE-based meal plans tailored to your body, goals &amp; activity
                level
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-heading font-bold text-secondary-600 mb-1">
                Save Money
              </h3>
              <p className="text-sm text-gray-500">
                Plans built around eBag.bg discounts — eat better and spend less
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🛒</div>
              <h3 className="font-heading font-bold text-accent-700 mb-1">
                One-Click Shop
              </h3>
              <p className="text-sm text-gray-500">
                Auto-generated shopping list sent straight to your eBag.bg cart
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <Link
              href="/onboarding"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-heading font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Започни сега — безплатно
            </Link>
            <p className="text-sm text-gray-400 mt-3">
              Start eating healthy for less. No credit card required.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400">
        HealthyBag &copy; {new Date().getFullYear()} &middot; Powered by
        nutrition science &amp; eBag.bg deals
      </footer>
    </div>
  );
}
