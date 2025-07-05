export interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  location?: string
  website?: string
  description?: string
  technologies?: string[]
  logo?: string
}

const experience: ExperienceItem[] = [
  {
    id: "lifecoach",
    title: "Co-Founder",
    company: "Life Coach Elevate",
    period: "2024 - Present",
    location: "Arizona, USA",
    website: "lifecoachelevate.com",
    description:
      "Co-founded Life Coach Elevate, managing end-to-end technical infrastructure, including server architecture, automation pipeline development, leadership of the web development and design team, and driving initiatives to optimize scalability and system performance.",
    technologies: ["DevOps", "CI/CD", "Kubernetes", "JS/TS", "NextJS"],
    logo: "/lifecoach-elevate-logo.png",
  },
  {
    id: "salmon",
    title: "Senior Lead Software Engineer",
    company: "Salmon Global Ltd",
    period: "2019 - 2024",
    location: "Remote",
    website: "salmonglobal.com",
    description:
      "Led development teams in building enterprise-level web applications for clients across various industries. Implemented CI/CD pipelines, mentored junior developers, and established coding standards and best practices.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
  },
  {
    id: "influence",
    title: "Web Developer",
    company: "influenceTHIS Canada",
    period: "2018-2019",
    location: "Toronto, Canada",
    website: "influencethis.ca",
    description:
      "Developed and maintained websites for influencer marketing events and campaigns. Created responsive designs and implemented analytics tracking systems.",
    technologies: ["JavaScript", "PHP", "WordPress", "CSS", "MySQL"],
  },
  {
    id: "upwork",
    title: "Top Rated Web Developer",
    company: "Upwork Inc.",
    period: "2017 - Present",
    location: "Remote",
    website: "upwork.com",
    description:
      "Provided freelance web development services to clients worldwide. Maintained a 5-star rating and Top Rated status through consistent high-quality deliverables and client satisfaction.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL"],
  },
]

export default experience
