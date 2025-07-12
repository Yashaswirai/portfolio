import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const LoadingSpinner = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.4, 1, 0.4],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            transition={{
              delay: Math.random() * 2,
              duration: 2 + Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Animated Logo with Glow Effect */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 relative"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className="text-5xl md:text-6xl font-bold gradient-text relative"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Portfolio
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent blur-sm opacity-50"
              animate={isHovered ? { opacity: 0.8 } : { opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            >
              Portfolio
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Interactive Multi-Layer Spinner */}
        <div
          className="relative w-32 h-32 mx-auto mb-8 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer Pulsing Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-500/30"
            variants={pulseVariants}
            animate="animate"
          />

          {/* Middle Orbiting Ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-purple-500/50 border-dashed"
            variants={orbitVariants}
            animate="animate"
            style={{ transformOrigin: "center" }}
          />

          {/* Inner Spinning Core */}
          <motion.div
            className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
            animate={{
              rotate: 360,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.3 }
            }}
          />

          {/* Central Glowing Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-white rounded-full shadow-lg"
            animate={{
              boxShadow: [
                "0 0 10px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(147, 51, 234, 0.8)",
                "0 0 10px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Orbiting Satellites */}
          {[0, 120, 240].map((angle, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0"
              }}
              animate={{
                rotate: 360,
                x: Math.cos((angle * Math.PI) / 180) * 50,
                y: Math.sin((angle * Math.PI) / 180) * 50,
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                x: { duration: 4, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-64 mx-auto mb-6"
        >
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.p
            className="text-sm text-gray-400 mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(Math.min(loadingProgress, 100))}% Complete
          </motion.p>
        </motion.div>

        {/* Interactive Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <motion.p
            className="text-lg text-gray-300 font-medium"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(90deg, #9CA3AF, #60A5FA, #A855F7, #9CA3AF)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Crafting Amazing Experiences
          </motion.p>

          <motion.div
            className="flex justify-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[".", ".", "."].map((dot, index) => (
              <motion.span
                key={index}
                className="text-2xl text-blue-400"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {dot}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingSpinner
