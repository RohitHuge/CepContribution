import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [innovations, setInnovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("innovations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setInnovations(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setToast({ type: "error", message: "Failed to load innovations." });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#f4fff4] min-h-screen flex flex-col font-sans scroll-smooth">
      <Header />
      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-green-800 text-center mb-10"
        >
          🌱 Admin Dashboard — Submitted Innovations
        </motion.h1>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full"
            ></motion.div>
          </div>
        )}

        {/* Table */}
        {!loading && innovations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto bg-white rounded-3xl shadow-md p-6"
          >
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl">
                  <th className="p-4 rounded-tl-xl">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Date</th>
                  {/* <th className="p-4 rounded-tr-xl">Image</th> */}
                </tr>
              </thead>
              <tbody>
                {innovations.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-green-50 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
                    tabIndex={0}
                  >
                    <td className="p-4 font-semibold text-green-800">{item.name}</td>
                    <td className="p-4 text-green-700">{item.email}</td>
                    <td className="p-4 font-medium text-green-700">{item.title}</td>
                    <td className="p-4 text-green-600 max-w-[250px] truncate">{item.description}</td>
                    <td className="p-4 text-green-500">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    {/* <td className="p-4">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover shadow-sm border border-green-200 hover:scale-110 transition-transform duration-200"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No image</span>
                      )}
                    </td> */}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && innovations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-3xl shadow-md"
          >
            <p className="text-green-700 text-lg font-medium">
              No innovations submitted yet 🌾
            </p>
          </motion.div>
        )}

        {/* Toast Message */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white font-medium ${
                toast.type === "error"
                  ? "bg-red-500"
                  : "bg-gradient-to-r from-green-600 to-green-400"
              }`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
