export default function KitchenLayout() {
  const items = [
    {
      title: "Dinnerware from Rs. 69",
      image: "/images/dinnerware.png",
    },
    {
      title: "Food Storage and organising from Rs.19",
      image: "/images/foodstorage.png",
    },
    {
      title: "Glassware from Rs.49",
      image: "/images/glassware.png",
    },
    {
      title: "Trolleys from Rs.949",
      image: "/images/trolleys.png",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-white px-4 md:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[90vh]">
        {/* Left Feature Image */}
        <div className="relative md:col-span-2 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
          <img
            src="/images/kitchen.png"
            alt="Kitchen setup"
            className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
          />
          <div className="absolute bottom-6 left-6 text-white font-semibold text-lg md:text-xl bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
            <a
              href="#"
              className="underline underline-offset-4 decoration-white hover:opacity-80"
            >
              Everything your kitchen setup needs →
            </a>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-rows-2 gap-4">
          {/* Top Row */}
          <div className="grid grid-cols-2 gap-4">
            {items.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
                />
                <div className="absolute bottom-4 left-4 text-white text-sm md:text-base font-semibold bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
                  {item.title} →
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-4">
            {items.slice(2, 4).map((item, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
                />
                <div className="absolute bottom-4 left-4 text-white text-sm md:text-base font-semibold bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
                  {item.title} →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
