'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Certification {
  id: number
  title: string
  issuer: string
  link: string
  imageURL: string
  description: string
}

const certifications: Certification[] = [
  {
    id: 1,
    issuer: 'AWS',
    title: 'Certified Cloud Practitioner',
    link: 'https://www.credly.com/badges/ed3afc59-ee40-47cf-9bc6-cdc9e1da83ae',
    imageURL: '/aws-cloud-practitioner-badge.png', // replace with your badge image
    description: `This certification demonstrates foundational knowledge of AWS cloud concepts, services, security, pricing, and support.`,
  },
  // add more certifications here with unique id & imageURL
]

export function BlogsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)

  const prevCert = () => {
    setSelectedIndex((prev) => (prev === 0 ? certifications.length - 1 : prev - 1))
  }

  const nextCert = () => {
    setSelectedIndex((prev) => (prev === certifications.length - 1 ? 0 : prev + 1))
  }

  const selectedCert = certifications[selectedIndex]

  return (
    <section id="certifications" className="w-full py-12 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-3xl font-bold text-center text-zinc-800 dark:text-zinc-100">
          Certifications
        </h2>

        <div className="relative flex items-center justify-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={prevCert}
            className="p-2 rounded-full bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 absolute left-0 z-10"
          >
            <FaChevronLeft />
          </button>

          {/* Badge Image */}
          <div
            className="cursor-pointer w-40 h-40 md:w-48 md:h-48 rounded-lg shadow-lg overflow-hidden flex items-center justify-center bg-white dark:bg-neutral-900"
            onClick={() => setOpenDialog(true)}
          >
            <img
              src={selectedCert.imageURL}
              alt={selectedCert.title}
              className="object-contain w-full h-full p-4"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextCert}
            className="p-2 rounded-full bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 absolute right-0 z-10"
          >
            <FaChevronRight />
          </button>
        </div>

        <p className="mt-4 text-center text-zinc-600 dark:text-zinc-300">
          {selectedCert.title} - {selectedCert.issuer}
        </p>
      </div>

      {/* Dialog for detailed info */}
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] max-h-[90vh] overflow-y-auto p-6 rounded-lg bg-white dark:bg-neutral-900">
          <DialogHeader className="sticky top-0 bg-white dark:bg-neutral-900 z-10 pb-4 border-b border-zinc-200 dark:border-zinc-700">
            <DialogTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
              {selectedCert.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6 prose prose-zinc dark:prose-invert max-w-none">
            <img
              src={selectedCert.imageURL}
              alt={selectedCert.title}
              className="object-contain w-64 h-64 md:w-80 md:h-80 mx-auto"
            />
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">{selectedCert.description}</p>
            <p className="mt-4 text-center">
              <a
                href={selectedCert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                View Certification Badge
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
export default BlogsSection
