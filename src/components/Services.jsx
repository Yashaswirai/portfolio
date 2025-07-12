import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { Server, Code, Palette, Shield, Database, Smartphone } from 'lucide-react'

const Services = () => {
  const servicesRef = useRef()
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.service-card',
          { opacity: 0, y: 50, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.8, 
            stagger: 0.2, 
            ease: 'power3.out' 
          }
        )
      }, servicesRef)

      return () => ctx.revert()
    }
  }, [inView])

  const services = [
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Robust server-side programming with modern frameworks, API development, database design, and security implementation.',
      features: ['RESTful APIs', 'Database Design', 'Authentication', 'Performance Optimization'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Software Development',
      description: 'Full-cycle application development from concept to deployment, including design, coding, testing, and maintenance.',
      features: ['Custom Applications', 'Code Review', 'Testing & QA', 'Maintenance'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Frontend Development',
      description: 'Modern, responsive user interfaces with cutting-edge technologies and exceptional user experience design.',
      features: ['Responsive Design', 'Modern Frameworks', 'UI/UX Design', 'Performance'],
      color: 'from-green-500 to-teal-500'
    }
  ]

  return (
    <section id="services" ref={ref} className="section-padding">
      <div ref={servicesRef} className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 fade-in"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I offer comprehensive development services to bring your ideas to life 
            with modern technologies and best practices.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="service-card group"
            >
              <div className="relative h-full p-8 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3 flex-shrink-0`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Let's discuss how I can help bring your vision to life with cutting-edge technology.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
