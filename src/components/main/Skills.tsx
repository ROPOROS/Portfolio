'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Define Skill type directly here since we're not importing from '@/constants'
export interface Skill {
  skill_name: string
  Image: string
  width?: number
  height?: number
}

// All logos should be in /public/tech/
const skills: Skill[] = [
  { skill_name: 'Docker', Image: '/docker.png' },
  { skill_name: 'Kubernetes', Image: '/kubernetes.png' },
  { skill_name: 'Ansible', Image: '/ansible.png' },
  { skill_name: 'Git', Image: '/git.png' },
  { skill_name: 'GitLab', Image: '/gitlab.png' },
  { skill_name: 'Jenkins', Image: '/jenkins.png' },
  { skill_name: 'Junit', Image: '/junit.png' },
  { skill_name: 'SonarQube', Image: '/sonarqube.png' },
  { skill_name: 'Prometheus', Image: '/prometheus.png' },
  { skill_name: 'Grafana', Image: '/grafana.png' },
  { skill_name: 'Terraform', Image: '/terraform.png' },
  { skill_name: 'New Relic', Image: '/newrelic.png' },
  { skill_name: 'Proxmox', Image: '/proxmox.png' },
  { skill_name: 'AWS', Image: '/aws.png' },
  { skill_name: 'Azure', Image: '/azure.png' },
  { skill_name: 'OpenStack', Image: '/openstack.png' },
  { skill_name: 'Linux', Image: '/linux.png' },
  { skill_name: 'Spring Boot', Image: '/spring-boot.png' },
  { skill_name: 'Angular', Image: '/angular.png' },
  { skill_name: 'PfSense', Image: '/pfsense.png' },
  { skill_name: 'OpenVPN', Image: '/openvpn.png' },
  { skill_name: 'Symfony', Image: '/symfony.png' },
  { skill_name: 'Nexus', Image: '/nexus.png' },
  { skill_name: 'Apache JMeter', Image: '/jmeter.png' },
]

const uniqueSkills: Skill[] = Array.from(
  skills
    .reduce((map, skill) => {
      if (!map.has(skill.skill_name)) {
        map.set(skill.skill_name, { ...skill, width: 50, height: 50 })
      }
      return map
    }, new Map<string, Skill>())
    .values(),
).sort((a, b) => a.skill_name.localeCompare(b.skill_name))

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center gap-10 py-16 px-4 sm:px-8 min-h-[600px] bg-gradient-to-br from-background via-muted to-background"
      aria-labelledby="skills-heading"
    >
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Heading */}
      <div className="text-center max-w-3xl">
        <h2
          id="skills-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
        >
          Technical Expertise
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
          A refined selection of my proficiency in modern development tools and technologies
        </p>
      </div>

      {/* Skills Grid */}
      <motion.div
        className="w-full max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.05 }}
      >
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-4 sm:gap-6">
          {uniqueSkills.map((skill, index) => (
            <motion.div
              key={skill.skill_name}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group relative flex flex-col items-center justify-center p-3 rounded-md hover:bg-white/5 dark:hover:bg-black/10 transition-all duration-200"
              whileHover={{ scale: 1.07 }}
              role="listitem"
              aria-label={skill.skill_name}
            >
              {/* Logo */}
              <Image
                src={skill.Image}
                alt={skill.skill_name}
                width={skill.width}
                height={skill.height}
                className="relative z-10 transition-transform duration-200 group-hover:scale-110 object-contain"
              />

              {/* Label */}
              <span className="relative z-10 mt-2 text-xs font-medium text-foreground text-center tracking-tight">
                {skill.skill_name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-muted-foreground font-medium">
        Continuously expanding and refining my DevOps skillset
      </p>
    </section>
  )
}

export default Skills
