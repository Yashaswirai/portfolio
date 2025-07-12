import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Download, ArrowDown } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'

// Optimized animated particles background with device-based performance
function Stars(props) {
  const ref = useRef()
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile devices for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [sphere] = useState(() => {
    // Reduce particle count on mobile devices for better performance
    const particleCount = isMobile ? 1500 : 3000
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  })

  useFrame((_, delta) => {
    if (ref.current && !isMobile) {
      // Reduce animation intensity on mobile
      const speed = isMobile ? 0.3 : 1
      ref.current.rotation.x -= (delta / 10) * speed
      ref.current.rotation.y -= (delta / 15) * speed
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={true} {...props}>
        <PointMaterial
          transparent
          color="#0ea5e9"
          size={isMobile ? 0.003 : 0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile devices and screen size changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Optimized animation variants with reduced motion support
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : (isMobile ? 0.15 : 0.2),
        delayChildren: prefersReducedMotion ? 0 : 0.1,
        duration: prefersReducedMotion ? 0.3 : 0.6
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : (isMobile ? 30 : 60),
      scale: prefersReducedMotion ? 1 : 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : (isMobile ? 0.6 : 0.8),
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  }

  const socialVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : (isMobile ? -15 : -30),
      scale: prefersReducedMotion ? 1 : 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: "easeOut"
      }
    }
  }

  const socialLinks = [
    {
      icon: MessageCircle,
      href: 'https://wa.me/+919062950674',
      color: 'hover:text-green-500',
      label: 'WhatsApp'
    },
    {
      icon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      href: 'https://www.instagram.com/_rahul_yash_/',
      color: 'hover:text-pink-500',
      label: 'Instagram'
    },
    {
      icon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: 'https://x.com/Yash_Rahul3',
      color: 'hover:text-blue-500',
      label: 'X (Twitter)'
    },
    {
      icon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: 'https://www.linkedin.com/in/yashaswi-rai-real/',
      color: 'hover:text-blue-700',
      label: 'LinkedIn'
    },
  ]

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Three.js Background with fallback */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 1] }}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
            performance={{ min: 0.5 }}
            fallback={<div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900" />}
          >
            <Stars />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 z-10"></div>

      {/* Content */}
      <motion.div
        className="relative z-20 container-custom px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: isMobile ? 0.2 : 0.3,
          margin: isMobile ? "-50px 0px -50px 0px" : "-100px 0px -100px 0px"
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Main Title - Improved responsive scaling */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-shadow leading-tight"
            variants={itemVariants}
          >
            Hi, I'm{' '}
            <span className="gradient-text block sm:inline">
              Yashaswi Rai
            </span>
          </motion.h1>

          {/* Subtitle - Better mobile scaling */}
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-gray-300"
            variants={itemVariants}
          >
            Full-Stack Developer
          </motion.h2>

          {/* Description - Improved mobile readability */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
            variants={itemVariants}
          >
            Passionate about creating exceptional digital experiences through innovative
            web development solutions. Specializing in modern technologies and user-centric design.
          </motion.p>

          {/* Action Buttons - Enhanced mobile layout */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0"
            variants={itemVariants}
          >
            <motion.button
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center min-w-[160px]"
            >
              Get In Touch
            </motion.button>

            <motion.button
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center min-w-[160px]"
            >
              <Download size={20} />
              Download CV
            </motion.button>
          </motion.div>

          {/* Social Links - Improved mobile spacing and touch targets */}
          <motion.div
            className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4 sm:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3
            }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                variants={socialVariants}
                whileHover={!isMobile ? { scale: 1.2, y: -5 } : { scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`text-gray-400 ${social.color} transition-all duration-300 p-3 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 min-w-[48px] min-h-[48px] flex items-center justify-center`}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </div>

      </motion.div>

      {/* Scroll Indicator - Positioned at the very bottom of the section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: prefersReducedMotion ? 0 : (isMobile ? 0.8 : 1.2),
          duration: prefersReducedMotion ? 0.3 : 0.6
        }}
        animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
        onClick={scrollToAbout}
      >
        <motion.div
          className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2"
          whileHover={!isMobile ? { scale: 1.1 } : {}}
        >
          <span className="text-xs sm:text-sm mb-1 sm:mb-2">Scroll Down</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={isMobile ? 18 : 20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
