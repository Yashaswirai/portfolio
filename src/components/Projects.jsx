import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { ExternalLink, Github, Award, Smartphone, ShoppingCart } from 'lucide-react'
import os from '../assets/VanillaOS.png' // Placeholder for project images
import recepie from '../assets/Recpie-App.png'
import lumina from '../assets/Lumina.png'

const Projects = () => {
  const projectsRef = useRef()
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.project-card',
          { opacity: 0, y: 50, rotationY: 15 },
          { 
            opacity: 1, 
            y: 0, 
            rotationY: 0,
            duration: 1, 
            stagger: 0.3, 
            ease: 'power3.out' 
          }
        )
      }, projectsRef)

      return () => ctx.revert()
    }
  }, [inView])

  const projects = [
    {
      title: 'Vanilla Desktop OS',
      description: 'A fully functional desktop-like environment built entirely with vanilla HTML, CSS, and JavaScript. Experience a complete operating system interface in your browser with no frameworks, no canvas - just pure DOM manipulation and modern web technologies.',
      image: os,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      liveLink: 'https://vanilla-desktop-os.onrender.com/',
      githubLink: 'https://github.com/Yashaswirai/vanilla-desktop-os',
      icon: Award,
      category: 'Frontend Development',
      featured: true
    },
    {
      title: 'Recepie App',
      description: 'A modern, responsive recipe management application built with React and Vite. Create, manage, and favorite your culinary masterpieces with a beautiful dark-themed interface featuring dynamic statistics, engaging animations, and seamless user experience.',
      image: recepie,
      technologies: ['React', 'Tailwind CSS', 'Vite'],
      liveLink: 'https://recipe-app-518v.onrender.com/',
      githubLink: 'https://github.com/Yashaswirai/recipe-App',
      icon: Smartphone,
      category: 'Frontend Development',
      featured: false
    },
    {
      title: 'Lumina Store',
      description: 'This project was completed as part of an intensive internship and training program with Euphoria GenX. It demonstrates advanced proficiency in full-stack development using the MERN stack.',
      image: lumina,
      technologies: ['React', 'Node.js', 'MongoDB', 'Express JS', 'Razorpay API'],
      liveLink: 'https://lumina-store.onrender.com/',
      githubLink: 'https://github.com/Yashaswirai/MERN-LUMINA',
      icon: ShoppingCart,
      category: 'Full Stack Development',
      featured: false
    }
  ]

  return (
    <section id="projects" ref={ref} className="section-padding">
      <div ref={projectsRef} className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating expertise in modern web development 
            technologies and creative problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`project-card group ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex gap-8 items-center`}
            >
              <div className="lg:w-1/2">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                      <motion.a
                        href={project.liveLink}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={project.githubLink}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:w-1/2 space-y-6">
                {/* Category */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-900 text-blue-400 text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    View Live
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Github size={18} />
                    View Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Want to See More?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Check out my GitHub profile for more projects and contributions to the open-source community.
            </p>
            <motion.a
              href="https://github.com/Yashaswirai"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Github size={20} />
              View GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
