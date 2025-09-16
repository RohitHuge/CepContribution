import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";


const benefits = [
  {
    icon: "🌱",
    title: "Soil Health",
    desc: "Promotes rich, living soil with natural nutrients."
  },
  {
    icon: "💧",
    title: "Water Conservation",
    desc: "Reduces water usage through sustainable practices."
  },
  {
    icon: "🌍",
    title: "Eco-Friendly",
    desc: "Minimizes pollution and protects biodiversity."
  },
  {
    icon: "💪",
    title: "Nutrient-Rich Food",
    desc: "Produces healthier, more nutritious crops."
  },
//   {
//     icon: "🌾",
//     title: "Resilient Farms",
//     desc: "Builds resilience against pests and climate change."
//   }
];

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

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <>
    <Header />
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-400 py-12 px-4 text-center rounded-b-3xl shadow-lg">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-3 flex items-center justify-center gap-2"
        >
          <span role="img" aria-label="leaf">🌿</span> Organic Farming Innovations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-2xl text-green-100 font-medium"
        >
          Explore modern solutions through natural methods
        </motion.p>
      </header>

      {/* Introduction */}
      <section className="max-w-3xl mx-auto mt-12 px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-bold text-green-800 mb-3"
        >
          Introduction to Organic Farming
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={2}
          className="text-green-700 text-base md:text-lg rounded-xl bg-white/70 p-4 shadow-sm"
        >
          Organic farming embraces eco-friendly methods that nurture the soil, conserve water, and protect the environment. By avoiding synthetic chemicals and focusing on natural processes, it ensures healthier food and a sustainable future for generations to come.
        </motion.p>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-bold text-green-800 mb-8 text-center"
        >
          Benefits
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={i + 1}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-4xl mb-3">{benefit.icon}</span>
              <h3 className="text-lg font-semibold text-green-700 mb-1">{benefit.title}</h3>
              <p className="text-green-600 text-sm">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="flex-1 flex flex-col items-center justify-center mt-16 mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md bg-white/80 rounded-2xl shadow-md p-8 flex flex-col items-center"
        >
          <h2 className="text-xl font-bold text-green-800 mb-4">Search Organic Solutions</h2>
          <form
            className="w-full flex gap-2"
            onSubmit={e => {
              e.preventDefault();
              // Implement search logic here
            }}
          >
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search topics, methods, or tips..."
              className="flex-1 px-4 py-2 rounded-l-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 text-green-800 bg-white shadow-sm"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-r-xl shadow hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none"
            >
              Search
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-green-900 text-white text-center py-5 mt-auto rounded-t-2xl">
        © 2025 | Created by Sumit Mate| Guidance by Rohit H.| Organic Farming Project
      </footer>
    </div>
    <Footer />
    </>
  );
};

export default Home;
