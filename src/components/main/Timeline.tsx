'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'
import Image from 'next/image'
import { Timeline as TimelineComponent } from '@/components/ui/timeline'
import { FaBriefcase, FaBuilding } from 'react-icons/fa'

export interface TimelineItem {
  id: number
  type: 'work' | 'project'
  title: string
  company: string
  location: string
  date: string
  imageURL: string
  description: string
  achievements: string[]
  icon: React.ReactNode;
  companyIcon: React.ReactNode;
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'DevOps Engineer Intern',
    company: 'Coral-IO',
    location: 'Tunis, Tunisia',
    date: 'Jan 2024 - Jul 2024',
    imageURL: '/coral-io-logo.png',
    description:
      'Established observability and monitoring for the UWAS web application stack using New Relic and DevOps tools.',
    achievements: [
      'Implemented end-to-end observability using New Relic agents, dashboards, and tracing.',
      'Conducted a study on Observability Maturity Model (OMM) and applied it to production systems.',
      'Automated New Relic agent installation with Ansible for scalable deployment.',
      'Leveraged Kubernetes and Linux for orchestration and infrastructure monitoring.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-green-500" />,
  },
  {
    id: 2,
    type: 'work',
    title: 'Software Developer Intern',
    company: 'SIGA',
    location: 'Tunis, Tunisia',
    date: 'Jul 2023 - Sep 2023',
    imageURL: '/siga-logo.png',
    description:
      'Contributed to front-end and data infrastructure improvements for enterprise applications.',
    achievements: [
      'Developed front-end interfaces using Oracle ADF for enhanced usability.',
      'Managed backend data infrastructure with Toad for Oracle.',
      'Created interactive dashboards and reports in Oracle Apex.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-orange-500" />,
  },
  {
    id: 3,
    type: 'work',
    title: 'Network Engineer Intern',
    company: 'Tunisie Telecom',
    location: 'Tunis, Tunisia',
    date: 'Jul 2022 - Sep 2022',
    imageURL: '/tunisie-telecom-logo.png',
    description:
      'Assisted in managing and maintaining ADSL/VDSL networks and improving broadband reliability.',
    achievements: [
      'Configured and troubleshooted network equipment to ensure optimal performance.',
      'Monitored broadband systems and contributed to infrastructure reliability.',
      'Supported daily operations of network engineering teams.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 4,
    type: 'project',
    title: 'DevOps CI/CD Pipeline',
    company: 'ESPRIT',
    location: 'Tunis, Tunisia',
    date: '2023',
    imageURL: '/esprit.png',
    description:
      'Built a modern CI/CD pipeline integrating key DevOps tools to automate the build, test, and deployment lifecycle.',
    achievements: [
      'Configured Jenkins for CI/CD of Spring Boot & Angular apps.',
      'Integrated Junit testing, SonarQube quality gates, and Nexus artifact repository.',
      'Deployed containerized services with Docker & Docker Compose.',
      'Implemented monitoring and performance dashboards using Grafana and Prometheus.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-gray-500" />,
  },
  {
    id: 5,
    type: 'project',
    title: 'CareerTN Cloud Platform',
    company: 'ESPRIT',
    location: 'Tunis, Tunisia',
    date: '2023',
    imageURL: '/esprit.png',
    description:
      'Developed a private cloud infrastructure using OpenStack and a multi-tenant SaaS tool for service hiring.',
    achievements: [
      'Deployed OpenStack components (Swift, Neutron, Cinder, Nova, Horizon).',
      'Built SaaS web app using Spring Boot and Angular.',
      'Containerized and orchestrated with Docker and Kubernetes clusters via Magnum.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 6,
    type: 'project',
    title: 'Hydra – Esports Tournament Platform',
    company: 'ESPRIT',
    location: 'Tunis, Tunisia',
    date: '2022',
    imageURL: '/esprit.png',
    description:
      'All-in-one platform for hosting online tournaments with betting and donations support.',
    achievements: [
      'Developed web (Symfony + PHP), mobile (Codename One + Java), and desktop (JavaFX) applications.',
      'Implemented real-time data sync and user management.',
      'Integrated donation and bet systems with modular architecture.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-red-500" />,
  },
]

export const TimelineElement: FC<{ item: TimelineItem }> = ({ item }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Image
        src={item.imageURL}
        alt={`${item.company} Logo`}
        width={48}
        height={48}
        className="rounded-md shadow bg-muted p-1"
      />
      <div>
        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
        <p className="text-sm text-muted-foreground">
          {item.company} • {item.location}
        </p>
        <p className="text-sm text-muted-foreground">{item.date}</p>
      </div>
    </div>

    <p className="text-sm text-muted-foreground">{item.description}</p>

    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
      {item.achievements.map((ach, idx) => (
        <li key={`${item.id}-ach-${idx}`}>{ach}</li>
      ))}
    </ul>

    {item.type === 'project' && item.company !== 'ESPRIT' && (
      <div className="w-full mt-4">
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md bg-background">
          <Image
            src={item.imageURL}
            alt={`${item.title} Architecture`}
            className="object-contain"
            loading="lazy"
            fill
          />
        </div>
      </div>
    )}
  </div>
)

const Timeline: FC = () => {
  const timelineContent = timelineData.map((item) => ({
    key: `timeline-${item.id}-${item.date}`, // ✅ unique key for React
    title: item.date, // just show the date in UI
    content: <TimelineElement item={item} />,
  }))


  return (
    <section id="experience" className="py-20 bg-background text-foreground transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold tracking-tight text-primary">
            Professional Experience & Projects
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
            Highlights of my career and key projects showcasing my skills & impact.
          </p>
        </motion.div>

        <div className="relative w-full">
          <TimelineComponent data={timelineContent} />
        </div>
      </div>
    </section>
  )
}

export default Timeline
