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
    id: 7,
    type: 'work',
    title: 'DevSecOps Engineer',
    company: 'SCHFEC',
    location: 'Tunis, Tunisia',
    date: 'Jul 2024 - Present',
    imageURL: '/suitcase.png',
    description:
      'DevSecOps engineering for CLAPA, a B2B SaaS platform in the insurance sector, with a focus on infrastructure, automation, CI/CD and observability.',
    achievements: [
      'Provisioned and configured infrastructure using Terraform and Ansible on Linux.',
      'Worked with containerized application environments using Docker and Docker Compose.',
      'Worked on CI/CD automation with GitLab CI/CD.',
      'Configured Nginx, TLS and DNS for application environments.',
      'Worked on monitoring and observability using Prometheus, Grafana, Alertmanager, Loki, Tempo and OpenTelemetry Collector.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-purple-500" />,
  },
  {
    id: 1,
    type: 'work',
    title: 'DevOps Engineer Intern',
    company: 'Coral-IO',
    location: 'Tunis, Tunisia',
    date: 'Jan 2024 - Jul 2024',
    imageURL: '/coral-io-logo.png',
    description:
      'DevOps internship focused on infrastructure monitoring and observability in a Kubernetes environment.',
    achievements: [
      'Worked on infrastructure monitoring, APM, synthetic monitoring, dashboards and alerting using New Relic and Prometheus.',
      'Deployed New Relic agents and integrations with Ansible on a Kubernetes environment.',
      'Worked with Kubernetes and Helm, and with Docker and the Harbor container registry.',
      'Worked with HAProxy and Proxmox virtualization on Linux.',
      'Used GitLab for DevOps and CI-related work.',
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
    description: 'Internship on a medical ERP application.',
    achievements: [
      'Worked on the application using Oracle ADF.',
      'Worked with an Oracle Database as part of the application environment.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-orange-500" />,
  },
  {
    id: 3,
    type: 'work',
    title: 'Network Technician Intern',
    company: 'Tunisie Telecom',
    location: 'Tunis, Tunisia',
    date: 'Jul 2022 - Sep 2022',
    imageURL: '/tunisie-telecom-logo.png',
    description: 'Internship in telecom network operations.',
    achievements: [
      'Participated in ADSL/VDSL maintenance and field troubleshooting.',
      'Used internal telecom management tools to view and manage network infrastructure.',
      'Used a Huawei network management portal to view servers and routers and perform configuration tasks.',
    ],
    icon: <FaBriefcase className="w-6 h-6 text-primary" />,
    companyIcon: <FaBuilding className="w-8 h-8 text-blue-500" />,
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
          <h2 className="text-5xl font-bold tracking-tight text-primary">
            Professional Experience
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
            DevOps and DevSecOps work, internships and earlier experience.
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
