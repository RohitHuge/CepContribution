import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Section 1: Hero Banner
const HERO_IMG = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

const heroFade = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const HeroBanner = () => (
  <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-green-100 overflow-hidden">
    <img
      src={HERO_IMG}
      alt="Farm Tech"
      className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-600/40" />
    <motion.div
      initial="hidden"
      animate="visible"
      variants={heroFade}
      className="relative z-10 flex flex-col items-center text-center px-4"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 rounded-2xl bg-green-900/30 px-4 py-2">
        Revolutionizing Organic Farming
      </h1>
      <p className="text-xl md:text-2xl text-green-100 font-medium bg-green-800/30 px-4 py-2 rounded-xl mb-6">
        Explore tech-driven and nature-based solutions
      </p>
      <button className="px-8 py-3 bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] text-white font-semibold rounded-xl shadow hover:from-[#4CAF50] hover:to-[#2e8b57] transition-all duration-200 focus:outline-none">
        Suggest Your Idea
      </button>
    </motion.div>
  </section>
);

// Section 2: Featured Innovations
const innovations = [
  {
    icon: "🤖",
    title: "Smart Compost Dispenser",
    desc: "Automated composting system using AI to optimize nutrient cycles."
  },
  {
    icon: "📡",
    title: "IoT Soil Sensors",
    desc: "Real-time soil health monitoring for precision organic farming."
  },
  {
    icon: "🔗",
    title: "Blockchain Traceability",
    desc: "Transparent supply chain for organic produce verification."
  },
  {
    icon: "🪱",
    title: "Vermicompost Tech",
    desc: "Efficient worm-based composting for nutrient-rich soil."
  },
  {
    icon: "🌦️",
    title: "Climate Smart Irrigation",
    desc: "Weather-adaptive irrigation systems for water conservation."
  },
  {
    icon: "🦠",
    title: "Biofertilizer Drones",
    desc: "Drones dispersing natural biofertilizers for eco-friendly growth."
  }
];

const FeaturedInnovations = () => (
  <section className="py-20 bg-[#f4fff4]">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Top Organic Farming Innovations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {innovations.map((item, i) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -8, boxShadow: "0 8px 32px 0 rgba(46,139,87,0.15)" }}
            className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-xl"
          >
            <span className="text-4xl mb-4">{item.icon}</span>
            <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
            <p className="text-green-600 text-base">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Section 3: Categories of Innovation
const categories = [
  {
    icon: "🌱",
    title: "Soil & Fertility",
    desc: "Innovations to enrich and sustain healthy soil."
  },
  {
    icon: "💧",
    title: "Water Management",
    desc: "Efficient irrigation and water-saving solutions."
  },
  {
    icon: "🌿",
    title: "Plant Health",
    desc: "Natural pest control and disease resistance."
  },
  {
    icon: "🔗",
    title: "Verification",
    desc: "Ensuring organic authenticity and traceability."
  },
  {
    icon: "🌍",
    title: "Climate & Sustainability",
    desc: "Adapting to climate change and promoting sustainability."
  }
];

const CategoriesSection = () => (
  <section className="py-20 bg-green-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Innovations by Category</h2>
      <div className="flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-8 md:overflow-x-visible">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="min-w-[220px] md:min-w-0 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            <span className="text-3xl mb-2">{cat.icon}</span>
            <h3 className="text-lg font-semibold text-green-700 mb-1">{cat.title}</h3>
            <p className="text-green-600 text-sm">{cat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Section 4: Visual Timeline
const timeline = [
  { year: 2015, title: "Organic Drones", desc: "Drones introduced for crop monitoring and spraying natural solutions." },
  { year: 2018, title: "IoT Soil Sensors", desc: "Widespread adoption of real-time soil health monitoring." },
  { year: 2020, title: "Blockchain Traceability", desc: "Supply chain transparency for organic produce." },
  { year: 2022, title: "AI Composting", desc: "AI-driven composting systems optimize nutrient cycles." },
  { year: 2024, title: "Climate Smart Irrigation", desc: "Weather-adaptive irrigation for water conservation." }
];

const TimelineSection = () => (
  <section className="py-20 bg-[#f4fff4]">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">How Innovation Has Evolved</h2>
      <div className="relative border-l-4 border-green-200 ml-4">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="mb-10 ml-6"
          >
            <div className="absolute -left-5 top-2 w-4 h-4 bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] rounded-full border-2 border-white shadow"></div>
            <div className="bg-white rounded-xl shadow p-5">
              <div className="text-green-700 font-bold text-lg mb-1">{item.year} – {item.title}</div>
              <div className="text-green-600 text-base">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Section 5: Submit Your Innovation
const SubmitInnovation = () => {
  const [form, setForm] = useState({ name: "", email: "", title: "", desc: "", image: null });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Valid email required.";
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.desc.trim()) errs.desc = "Description is required.";
    return errs;
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setForm({ name: "", email: "", title: "", desc: "", image: null });
    }
  };

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-lg mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Have an Idea?</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">
          <div>
            <label className="block text-green-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-xl border ${errors.name ? "border-red-400" : "border-green-200"} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 text-green-800 bg-white shadow-sm`}
            />
            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
          </div>
          <div>
            <label className="block text-green-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-xl border ${errors.email ? "border-red-400" : "border-green-200"} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 text-green-800 bg-white shadow-sm`}
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="block text-green-700 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-xl border ${errors.title ? "border-red-400" : "border-green-200"} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 text-green-800 bg-white shadow-sm`}
            />
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
          </div>
          <div>
            <label className="block text-green-700 font-medium mb-1">Description</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 rounded-xl border ${errors.desc ? "border-red-400" : "border-green-200"} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 text-green-800 bg-white shadow-sm`}
            />
            {errors.desc && <div className="text-red-500 text-sm mt-1">{errors.desc}</div>}
          </div>
          <div>
            <label className="block text-green-700 font-medium mb-1">Image (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 text-green-800 bg-white shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] text-white font-semibold rounded-xl shadow hover:from-[#4CAF50] hover:to-[#2e8b57] transition-all duration-200 focus:outline-none"
          >
            Submit Innovation
          </button>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-700 text-center font-semibold mt-2"
            >
              Thank you for your idea! 🌱
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
};

const Innovations = () => {
  return (
    <div className="bg-[#f4fff4] min-h-screen font-sans scroll-smooth">
      <Header />
      <HeroBanner />
      <FeaturedInnovations />
      <CategoriesSection />
      <TimelineSection />
      <SubmitInnovation />
      <Footer />
    </div>
  );
};

export default Innovations; 