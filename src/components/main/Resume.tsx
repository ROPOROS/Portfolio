'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FaDownload, FaArrowRightArrowLeft } from 'react-icons/fa6'

const Document = dynamic(() => import('react-pdf').then((mod) => mod.Document), { ssr: false })
const Page = dynamic(() => import('react-pdf').then((mod) => mod.Page), { ssr: false })

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

const ResumeSection = () => {
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<'en' | 'fr'>('en')

  useEffect(() => {
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc =
        'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.3.31/build/pdf.worker.min.mjs'
    })
  }, [])

  const onDocumentLoadError = (error: Error) => {
    setError(error.message)
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'))
  }

  const resumeFile = language === 'en' ? '/CHEBBIRaed_CV_en.pdf' : '/CHEBBIRaed_CV_fr.pdf'
  const resumeLabel = language === 'en' ? 'English' : 'Français'

  return (
    <section
      id="resume"
      className="bg-background text-foreground px-6 py-16 flex flex-col items-center min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
          My Resume ({resumeLabel})
        </h2>
        <p className="mt-2 text-muted-foreground text-sm italic">
          View my professional qualifications and experience in DevOps Engineering.
        </p>
      </motion.div>

      {/* Language Switcher Button */}
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-card text-sm font-medium shadow hover:shadow-md transition-all"
      >
        <FaArrowRightArrowLeft className="text-primary" />
        Switch to {language === 'en' ? 'French' : 'English'}
      </motion.button>

      {/* Resume PDF Viewer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl bg-card border border-border rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative w-full overflow-y-auto">
          {error ? (
            <p className="text-destructive text-center text-lg p-4">Failed to load PDF: {error}</p>
          ) : (
            <Document
              file={resumeFile}
              onLoadError={onDocumentLoadError}
              className="flex justify-center w-full"
            >
              <Page
                pageNumber={1}
                className="flex justify-center"
                renderTextLayer
                renderAnnotationLayer
                width={Math.min(890, typeof window !== 'undefined' ? window.innerWidth - 20 : 1200)}
                scale={1}
              />
            </Document>
          )}
        </div>
      </motion.div>

      {/* Download Button */}
      <motion.a
        href={resumeFile}
        download
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all"
      >
        <FaDownload className="text-base" />
        Download {resumeLabel} Resume
      </motion.a>
    </section>
  )
}

export default ResumeSection
