import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { Code, Database, Palette, Users } from 'lucide-react'
import profile from '../assets/profile.jpg' // Placeholder for your profile image
const About = () => {
  const aboutRef = useRef()
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.about-content',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
        )
      }, aboutRef)

      return () => ctx.revert()
    }
  }, [inView])

  const highlights = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces with modern frameworks'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Building robust server-side applications and database architectures'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Designing intuitive and visually appealing user experiences'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Working effectively in agile development environments'
    }
  ]

  return (
    <section id="about" ref={ref} className="section-padding bg-gray-800">
      <div ref={aboutRef} className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="about-content"
          >
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                {/* Placeholder for professional photo */}
                <div className="aspect-square bg-gradient-to-br from-primary-400 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-white text-6xl font-bold">
                    <img src={profile} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-800 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-800 rounded-full opacity-50"></div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="about-content fade-in"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  I'm a passionate full-stack developer with expertise in creating 
                  exceptional digital experiences. With a strong foundation in both 
                  frontend and backend technologies, I bring ideas to life through 
                  clean, efficient code and thoughtful design.
                </p>
                
                <p>
                  My journey in web development has equipped me with a comprehensive 
                  understanding of modern development practices, from responsive design 
                  principles to scalable backend architectures. I'm constantly learning 
                  and adapting to new technologies to deliver cutting-edge solutions.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open-source projects, or sharing knowledge with 
                  the developer community.
                </p>
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="about-content grid sm:grid-cols-2 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="about-content"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Let's Work Together
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
