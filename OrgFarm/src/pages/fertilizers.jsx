import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Hero image
const HERO_IMG = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80";

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

// Hero Section
const HeroSection = () => (
  <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-green-100 overflow-hidden">
    <img
      src={HERO_IMG}
      alt="Organic Fertilizers"
      className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-600/40" />
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center text-center px-4"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 rounded-2xl bg-green-900/30 px-4 py-2">
        🌱 Organic Fertilizers in India
      </h1>
      <p className="text-xl md:text-2xl text-green-100 font-medium bg-green-800/30 px-4 py-2 rounded-xl">
        Natural nutrients for sustainable farming
      </p>
    </motion.div>
  </section>
);

// Introduction Section
const IntroductionSection = () => (
  <section className="py-16 bg-[#f4fff4]">
    <div className="max-w-4xl mx-auto px-4">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-3xl font-bold text-green-800 mb-6 text-center"
      >
        What are Organic Fertilizers?
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={2}
        className="text-lg text-green-700 text-center bg-white/70 p-6 rounded-xl shadow-sm"
      >
        Organic fertilizers are natural substances derived from plant, animal, or mineral sources that provide essential nutrients to plants. Unlike synthetic fertilizers, they improve soil structure, enhance water retention, and promote beneficial microbial activity while being environmentally sustainable.
      </motion.p>
    </div>
  </section>
);

// Famous Organic Fertilizers in India
const fertilizers = [
  {
    name: "Vermicompost",
    icon: "🪱",
    description: "Rich compost made by earthworms, containing high levels of nitrogen, phosphorus, and potassium.",
    benefits: ["Improves soil structure", "Enhances water retention", "Promotes beneficial microbes"],
    usage: "Apply 2-3 kg per square meter before planting"
  },
  {
    name: "Farm Yard Manure (FYM)",
    icon: "🐄",
    description: "Traditional organic fertilizer made from decomposed animal dung, urine, and bedding material.",
    benefits: ["Slow-release nutrients", "Improves soil fertility", "Cost-effective"],
    usage: "Apply 10-15 tons per hectare annually"
  },
  {
    name: "Neem Cake",
    icon: "🌿",
    description: "Byproduct of neem oil extraction, rich in nitrogen and natural pest-repellent properties.",
    benefits: ["Natural pest control", "High nitrogen content", "Soil conditioning"],
    usage: "Mix 100-200 kg per hectare with soil"
  },
  {
    name: "Jeevamrutha",
    icon: "💧",
    description: "Traditional liquid fertilizer made from cow dung, cow urine, jaggery, and gram flour.",
    benefits: ["Quick nutrient absorption", "Promotes soil health", "Cost-effective"],
    usage: "Apply 200 liters per acre every 15 days"
  },
  {
    name: "Panchagavya",
    icon: "🥛",
    description: "Ancient organic preparation using five cow products: milk, curd, ghee, urine, and dung.",
    benefits: ["Complete nutrition", "Plant growth promoter", "Disease resistance"],
    usage: "Spray 3% solution every 15 days"
  },
  {
    name: "Compost",
    icon: "🍂",
    description: "Decomposed organic matter including kitchen waste, leaves, and agricultural residues.",
    benefits: ["Improves soil structure", "Recycles waste", "Sustainable"],
    usage: "Apply 5-10 tons per hectare before planting"
  }
];

const FertilizersSection = () => (
  <section className="py-20 bg-green-50">
    <div className="max-w-6xl mx-auto px-4">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-3xl font-bold text-green-800 mb-10 text-center"
      >
        Famous Organic Fertilizers in India
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fertilizers.map((fertilizer, i) => (
          <motion.div
            key={fertilizer.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={i + 1}
            whileHover={{ y: -8, boxShadow: "0 8px 32px 0 rgba(46,139,87,0.15)" }}
            className="bg-white rounded-3xl shadow-md p-6 transition-all duration-300 cursor-pointer hover:shadow-xl"
          >
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">{fertilizer.icon}</span>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{fertilizer.name}</h3>
            </div>
            <p className="text-green-600 text-sm mb-4">{fertilizer.description}</p>
            <div className="mb-4">
              <h4 className="text-green-700 font-medium mb-2">Benefits:</h4>
              <ul className="text-green-600 text-sm space-y-1">
                {fertilizer.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <h4 className="text-green-700 font-medium mb-1">Usage:</h4>
              <p className="text-green-600 text-sm">{fertilizer.usage}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Benefits Section
const benefits = [
  {
    icon: "🌱",
    title: "Soil Health",
    description: "Improves soil structure, water retention, and microbial activity for long-term fertility."
  },
  {
    icon: "🌍",
    title: "Environmental Safety",
    description: "No harmful chemicals, reduces pollution, and protects groundwater quality."
  },
  {
    icon: "💰",
    title: "Cost Effective",
    description: "Made from locally available materials, reducing dependency on expensive inputs."
  },
  {
    icon: "🍎",
    title: "Better Produce",
    description: "Results in healthier, more nutritious crops with better taste and shelf life."
  }
];

const BenefitsSection = () => (
  <section className="py-20 bg-[#f4fff4]">
    <div className="max-w-6xl mx-auto px-4">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-3xl font-bold text-green-800 mb-10 text-center"
      >
        Benefits of Organic Fertilizers
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <h3 className="text-lg font-semibold text-green-700 mb-2">{benefit.title}</h3>
            <p className="text-green-600 text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Application Methods Section
const applicationMethods = [
  {
    method: "Broadcasting",
    description: "Spread fertilizer evenly across the field before planting or during growth.",
    icon: "🌾"
  },
  {
    method: "Side Dressing",
    description: "Apply fertilizer in bands alongside plant rows for targeted nutrition.",
    icon: "📏"
  },
  {
    method: "Foliar Spray",
    description: "Spray liquid fertilizers directly on leaves for quick nutrient absorption.",
    icon: "💧"
  },
  {
    method: "Soil Incorporation",
    description: "Mix fertilizer into soil during tillage for better distribution.",
    icon: "🔧"
  }
];

const ApplicationSection = () => (
  <section className="py-20 bg-green-50">
    <div className="max-w-6xl mx-auto px-4">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-3xl font-bold text-green-800 mb-10 text-center"
      >
        Application Methods
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {applicationMethods.map((method, i) => (
          <motion.div
            key={method.method}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={i + 1}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300"
          >
            <span className="text-3xl">{method.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">{method.method}</h3>
              <p className="text-green-600 text-sm">{method.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Call to Action Section
const CallToActionSection = () => (
  <section className="py-16 bg-gradient-to-r from-green-600 via-green-500 to-green-400 flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center text-white"
    >
      <h2 className="text-3xl font-bold mb-4">Ready to Go Organic?</h2>
      <p className="text-xl mb-6 text-green-100">Start your sustainable farming journey today</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-xl shadow hover:bg-green-50 transition-all duration-200 focus:outline-none">
          Learn More
        </button>
        <button className="px-8 py-3 bg-green-700 text-white font-semibold rounded-xl shadow hover:bg-green-800 transition-all duration-200 focus:outline-none">
          Get Started
        </button>
      </div>
    </motion.div>
  </section>
);

const Fertilizers = () => {
  return (
    <div className="bg-[#f4fff4] min-h-screen font-sans scroll-smooth">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <IntroductionSection />
        <FertilizersSection />
        <BenefitsSection />
        <ApplicationSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Fertilizers;
