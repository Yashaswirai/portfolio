import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'

const Skills = () => {
  const skillsRef = useRef()
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [animatedValues, setAnimatedValues] = useState({})

  useEffect(() => {
    if (inView) {
      const ctx = gsap.context(() => {
        // Animate technical skills bars
        technicalSkills.forEach((skill, index) => {
          gsap.to(`.progress-bar-${index}`, {
            width: `${skill.percentage}%`,
            duration: 1.5,
            delay: index * 0.2,
            ease: 'power3.out'
          })
        })

        // Animate circular progress for professional skills
        professionalSkills.forEach((skill, index) => {
          gsap.to({}, {
            duration: 1.5,
            delay: index * 0.2,
            ease: 'power3.out',
            onUpdate: function() {
              const progress = this.progress()
              const value = Math.round(progress * skill.percentage)
              setAnimatedValues(prev => ({
                ...prev,
                [`professional-${index}`]: value
              }))
            }
          })
        })
      }, skillsRef)

      return () => ctx.revert()
    }
  }, [inView])

  const technicalSkills = [
    { name: 'HTML5', percentage: 90, color: 'bg-orange-500' },
    { name: 'CSS3', percentage: 85, color: 'bg-blue-500' },
    { name: 'JavaScript', percentage: 85, color: 'bg-yellow-500' },
    { name: 'React', percentage: 75, color: 'bg-cyan-500' },
    { name: 'Node.js', percentage: 80, color: 'bg-green-500' },
    { name: 'Python', percentage: 70, color: 'bg-blue-600' },
    { name: 'MongoDB', percentage: 75, color: 'bg-green-600' },
    { name: 'Git', percentage: 85, color: 'bg-red-500' }
  ]

  const professionalSkills = [
    { name: 'Creativity', percentage: 80, color: 'text-purple-500' },
    { name: 'Communication', percentage: 75, color: 'text-blue-500' },
    { name: 'Problem Solving', percentage: 75, color: 'text-green-500' },
    { name: 'Teamwork', percentage: 75, color: 'text-orange-500' }
  ]

  const CircularProgress = ({ percentage, color, name, index }) => {
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const animatedPercentage = animatedValues[`professional-${index}`] || 0
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={color}
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {animatedPercentage}%
            </span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white text-center">
          {name}
        </h3>
      </div>
    )
  }

  return (
    <section id="skills" ref={ref} className="section-padding bg-gray-800">
      <div ref={skillsRef} className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and professional capabilities 
            developed through years of experience and continuous learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-white">
              Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`progress-bar-${index} h-full ${skill.color} rounded-full transition-all duration-300 shadow-sm`}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Professional Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-white">
              Professional Skills
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {professionalSkills.map((skill, index) => (
                <CircularProgress
                  key={index}
                  percentage={skill.percentage}
                  color={skill.color}
                  name={skill.name}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-white">
              Continuous Learning
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              I'm constantly expanding my skill set and staying up-to-date with the latest 
              technologies and industry best practices. Currently exploring AI/ML integration, 
              cloud architecture, and advanced React patterns.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
