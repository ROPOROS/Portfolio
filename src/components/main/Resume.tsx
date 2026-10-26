'use client'

import { motion } from 'framer-motion'
import { FaDownload, FaEye } from 'react-icons/fa6'

// The final CV PDFs are served from /public under these names.
const resumes = [
  { label: 'English', file: '/CHEBBIRaed_CV_en.pdf' },
  { label: 'Français', file: '/CHEBBIRaed_CV_fr.pdf' },
]

const ResumeSection = () => {
  return (
    <section id="resume" className="bg-background text-foreground px-6 py-16 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">Resume</h2>
        <p className="mt-2 text-muted-foreground text-sm italic">
          My CV in English and French.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-6">
        {resumes.map((resume) => (
          <div
            key={resume.file}
            className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card px-8 py-6 shadow"
          >
            <span className="text-lg font-semibold">{resume.label}</span>
            <div className="flex gap-3">
              <motion.a
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-background text-sm font-medium shadow hover:shadow-md transition-all"
                aria-label={`View CV (${resume.label})`}
              >
                <FaEye className="text-primary" />
                View
              </motion.a>
              <motion.a
                href={resume.file}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium shadow-md hover:shadow-lg transition-all"
                aria-label={`Download CV (${resume.label})`}
              >
                <FaDownload />
                Download
              </motion.a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ResumeSection
