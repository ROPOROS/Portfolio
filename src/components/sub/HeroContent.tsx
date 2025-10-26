'use client'

import { Badge } from '@/components/ui/badge'
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FC, useEffect, useState } from 'react'
import { TbCloudComputing } from 'react-icons/tb'
import { PointerHighlight } from '../ui/pointer-highlight'
import { NavbarButton } from '../ui/resizable-navbar'

const HeroContent: FC = () => {
  const titles = [
    'DevOps & Cloud Engineer',
    'Full-Stack Developer',
    'SRE Advocate',
    'Automation Enthusiast',
  ]

  const [currentTitle, setCurrentTitle] = useState(titles[0])
  const [index, setIndex] = useState(0)

  // Cycle through the titles at a smoother pace
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [titles.length])

  useEffect(() => {
    setCurrentTitle(titles[index])
  }, [index, titles])

  // Smooth scrolling to the contact section
  function smoothScrollTo(element: HTMLElement, duration = 1000) {
    const start = window.scrollY
    const end = element.getBoundingClientRect().top + start
    const distance = end - start
    const startTime = performance.now()

    function scroll(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      window.scrollTo(0, start + distance * ease)
      if (elapsed < duration) requestAnimationFrame(scroll)
    }
    requestAnimationFrame(scroll)
  }

  const handleConnectClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) smoothScrollTo(contactSection, 4200)
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center gap-8 px-4 sm:px-8 lg:px-16 lg:pt-5 w-full min-h-[calc(100vh-80px)] bg-background"
    >
      <motion.div variants={slideInFromTop} className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-blue-600 text-white dark:bg-blue-600 font-extrabold">
          <TbCloudComputing /> The DevOps Engineer
        </Badge>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="flex flex-col items-center justify-between gap-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
      >
        <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Raed Chebbi
        </span>

        <PointerHighlight rectangleClassName="rounded-none">
          <motion.span
            initial={{ opacity: 0 }} // Start invisible
            animate={{ opacity: 1 }} // Fade in
            transition={{
              delay: 1, // Start fading in after 1 second
              duration: 2, // Make the fade-in slower
              ease: 'easeInOut', // Smooth ease in and out
            }}
            className="text-primary p-3 text-3xl lg:text-6xl"
          >
            {currentTitle}
          </motion.span>
        </PointerHighlight>

        <span className="text-base text-muted-foreground italic max-w-[550px] mx-auto">
          Where Dev meets Ops — and everything is monitored.
        </span>
      </motion.div>

      <motion.div variants={slideInFromRight(0.8)} className="mt-4 flex flex-row items-center justify-between gap-2">
        <NavbarButton
          variant="primary"
          className="flex items-center gap-2 shadow"
          aria-label="Scroll Down"
          onClick={handleConnectClick}
        >
          <span className="w-2 h-2 bg-destructive rounded-full"></span> Let&apos;s Connect ↓
        </NavbarButton>

        <NavbarButton
          variant="dark"
          className="flex items-center gap-2 shadow outline"
          aria-label="github"
          href="https://github.com/ROPOROS"
        >
          <FaGithub className="mr-1" /> <span>GitHub</span>
        </NavbarButton>

        <NavbarButton
          variant="dark"
          className="flex items-center gap-2 shadow outline"
          aria-label="linkedin"
          href="https://www.linkedin.com/in/raed-chebbi-272226211/"
        >
          <FaLinkedin className="mr-1" /> <span>LinkedIn</span>
        </NavbarButton>
      </motion.div>
    </motion.section>
  )
}

export default HeroContent
