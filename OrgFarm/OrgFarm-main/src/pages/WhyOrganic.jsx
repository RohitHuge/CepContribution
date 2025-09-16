import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Placeholder images
const HERO_IMG = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";
const HEALTH_IMG = "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80";
const FARMER_IMG = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut"
    }
  })
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-green-100 overflow-hidden">
    <img
      src={HERO_IMG}
      alt="Organic Farm Field"
      className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-600/40" />
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center text-center px-4"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 rounded-2xl bg-green-900/30 px-4 py-2">
        Why Go Organic?
      </h1>
      <p className="text-xl md:text-2xl text-green-100 font-medium bg-green-800/30 px-4 py-2 rounded-xl">
        Discover the benefits of sustainable farming
      </p>
    </motion.div>
  </section>
);

const HealthBenefits = () => (
  <section className="py-20 bg-green-50">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="flex-1"
      >
        <img
          src={HEALTH_IMG}
          alt="Organic Vegetables"
          className="rounded-3xl shadow-lg w-full object-cover max-h-96"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={2}
        className="flex-1"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-6">Healthier Food, Healthier You</h2>
        <ul className="space-y-5 text-lg text-green-700">
          <li className="flex items-start gap-3">
            <span className="text-2xl">🥦</span>
            <span>No synthetic pesticides or chemicals</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">💊</span>
            <span>Richer in nutrients</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🧒</span>
            <span>Better for children and long-term health</span>
          </li>
        </ul>
      </motion.div>
    </div>
  </section>
);

const envCards = [
  {
    icon: "🌾",
    title: "Soil Health Improvement",
    desc: "Organic farming enriches soil fertility and structure, supporting healthy crops year after year."
  },
  {
    icon: "💧",
    title: "Water Conservation",
    desc: "Reduces water pollution and conserves water through natural irrigation and composting."
  },
  {
    icon: "🐝",
    title: "Biodiversity Preservation",
    desc: "Encourages diverse ecosystems, protecting pollinators and wildlife."
  }
];

const EnvironmentalImpact = () => (
  <section className="py-20 bg-gradient-to-b from-green-100 to-green-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Protecting Our Planet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {envCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(46,139,87,0.15)" }}
            className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-xl"
          >
            <span className="text-4xl mb-4">{card.icon}</span>
            <h3 className="text-xl font-semibold text-green-700 mb-2">{card.title}</h3>
            <p className="text-green-600 text-base">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FarmerEmpowerment = () => (
  <section className="py-20 bg-green-50">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Empowering Local Farmers</h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8"
      >
        <img
          src={FARMER_IMG}
          alt="Farmer Success Story"
          className="w-32 h-32 rounded-full object-cover border-4 border-green-200 shadow-md mb-4 md:mb-0"
        />
        <div className="flex-1">
          <blockquote className="italic text-green-700 text-lg mb-2">
            “Switching to organic farming gave me independence and a better income. My crops are healthier, and my land is thriving.”
          </blockquote>
          <div className="text-green-800 font-semibold mb-1">Ramesh Patil</div>
          <div className="text-green-600 text-sm mb-2">Nashik, Maharashtra</div>
          <p className="text-green-700 text-base">
            Organic methods empower small farmers by reducing dependency on expensive chemicals and increasing profitability through premium markets and sustainable practices.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const comparisonData = [
  {
    category: "Farming Method",
    organic: "Natural compost, crop rotation",
    conventional: "Synthetic fertilizers, monoculture"
  },
  {
    category: "Chemical Use",
    organic: "No synthetic chemicals",
    conventional: "Pesticides, herbicides"
  },
  {
    category: "Soil Impact",
    organic: "Improves soil health",
    conventional: "Depletes soil nutrients"
  },
  {
    category: "Cost vs. Value",
    organic: "Higher value, premium market",
    conventional: "Lower cost, mass market"
  },
  {
    category: "Health Benefits",
    organic: "Nutrient-rich, safer food",
    conventional: "Potential residues, less nutrients"
  }
];

const ComparisonSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Organic vs. Conventional</h2>
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full text-left text-green-800">
          <thead>
            <tr className="bg-green-100">
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold text-green-700">Organic</th>
              <th className="py-3 px-4 font-semibold text-red-700">Conventional</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, i) => (
              <tr key={row.category} className={i % 2 === 0 ? "bg-green-50" : "bg-green-100"}>
                <td className="py-3 px-4 font-medium">{row.category}</td>
                <td className="py-3 px-4 text-green-700">{row.organic}</td>
                <td className="py-3 px-4 text-red-700">{row.conventional}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none">
          Explore Organic Solutions
        </button>
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="py-16 bg-green-100 flex flex-col items-center justify-center">
    <h2 className="text-3xl font-bold text-green-800 mb-4">Ready to Go Organic?</h2>
    <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none">
      View Innovations
    </button>
  </section>
);

const WhyOrganic = () => {
  return (
    <div className="bg-[#f4fff4] min-h-screen font-sans scroll-smooth">
      <Header />
      {/* Sticky Navigation */}
      {/* <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur shadow-md py-3 px-6 flex items-center justify-between rounded-b-2xl">
        <div className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <span role="img" aria-label="leaf">🌿</span> Why Organic?
        </div>
        <a href="/" className="text-green-600 font-medium hover:underline">Home</a>
      </nav> */}
      <main className="pt-20">
        <HeroSection />
        <HealthBenefits />
        <EnvironmentalImpact />
        <FarmerEmpowerment />
        <ComparisonSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default WhyOrganic; 