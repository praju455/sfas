import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[260px] rounded-xl overflow-hidden shadow"
    >
      <img
  src="https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg"
  className="absolute inset-0 w-full h-full object-cover"
  alt="Smart farming"
/>

      <div className="absolute inset-0 bg-black/40 flex items-center px-6">
        <div className="text-white max-w-lg">
          <h2 className="text-3xl font-bold mb-2">
            Data-Driven Smart Farming
          </h2>
          <p className="text-sm">
            Personalized crop, soil & weather-based advisory for Indian farmers
          </p>
        </div>
      </div>
    </motion.section>
  );
}

