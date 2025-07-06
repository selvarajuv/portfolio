export interface ProjectImage {
  src: string
  alt: string
  caption: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  duration: string
  client: string
  year: string
  technologies?: string[]
  images: ProjectImage[]
  challenges: string[]
  outcomes: string[]
  topContent?: string
  bottomContent?: string
  hoverContent?: string
  imageUrl?: string
}

const projects: Record<string, Project> = {
  "mobile-app-interface": {
    id: "mobile-app-interface",
    title: "Mobile App Interface",
    category: "UI/UX Design",
    description:
      "A comprehensive mobile application interface designed with modern UI/UX principles. This project focuses on creating an intuitive user experience with smooth animations, responsive design, and accessibility features. The interface includes custom components, gesture-based navigation, and a cohesive design system that works seamlessly across iOS and Android platforms.",
    duration: "3 months",
    client: "TechStart Inc.",
    year: "2024",
    technologies: ["React", "TypeScript", "React Native", "Figma"],
    topContent: "Mobile App Interface",
    bottomContent: "View Project",
    hoverContent: "UI/UX Design & Development →",
    imageUrl: "/mobile-app-interface.png",
    images: [
      {
        src: "/mobile-app-interface.png",
        alt: "Mobile app interface main screen",
        caption: "Main dashboard interface with navigation",
      },
      {
        src: "/mobile-app-interface.png",
        alt: "Mobile app user profile screen",
        caption: "User profile and settings screen",
      },
      {
        src: "/mobile-app-interface.png",
        alt: "Mobile app onboarding flow",
        caption: "Onboarding flow with interactive elements",
      },
    ],
    challenges: [
      "Creating a unified design system across platforms",
      "Implementing complex gesture-based interactions",
      "Ensuring accessibility compliance",
    ],
    outcomes: ["40% increase in user engagement", "Reduced development time by 30%", "98% accessibility score"],
  },
  "healthcare-platform": {
    id: "healthcare-platform",
    title: "Healthcare Platform",
    category: "Full-Stack Development",
    description:
      "A comprehensive healthcare management platform that connects patients, doctors, and healthcare providers. Built with security and scalability in mind, this platform handles sensitive medical data while providing real-time communication, appointment scheduling, and medical record management. The system supports telemedicine consultations and integrates with various medical devices.",
    duration: "8 months",
    client: "MedCare Solutions",
    year: "2023",
    technologies: ["Node.js", "React", "PostgreSQL", "AWS", "Docker"],
    topContent: "Healthcare Platform",
    bottomContent: "View Project",
    hoverContent: "Full-Stack Development →",
    imageUrl: "/healthcare-platform.png",
    images: [
      {
        src: "/ecommerce-dashboard.png",
        alt: "Healthcare platform dashboard",
        caption: "Main dashboard with patient overview",
      },
      {
        src: "/ecommerce-dashboard.png",
        alt: "Telemedicine consultation interface",
        caption: "Video consultation interface for doctors",
      },
      {
        src: "/ecommerce-dashboard.png",
        alt: "Patient medical records",
        caption: "Secure medical records management",
      },
    ],
    challenges: [
      "HIPAA compliance and data security",
      "Real-time communication between users",
      "Integration with legacy medical systems",
    ],
    outcomes: [
      "Served 10,000+ patients in first year",
      "99.9% uptime achieved",
      "Reduced appointment scheduling time by 60%",
    ],
  },
  "ecommerce-dashboard": {
    id: "ecommerce-dashboard",
    title: "E-commerce Solution",
    category: "Web Development",
    description:
      "A modern e-commerce platform with an advanced admin dashboard for inventory management, order processing, and analytics. The solution includes a customer-facing storefront with advanced search capabilities, personalized recommendations, and seamless checkout experience. Built for scalability to handle high traffic volumes during peak shopping seasons.",
    duration: "6 months",
    client: "RetailMax Corp",
    year: "2023",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Vercel"],
    topContent: "E-commerce Solution",
    bottomContent: "View Project",
    hoverContent: "React & Node.js →",
    imageUrl: "/ecommerce-dashboard.png",
    images: [
      {
        src: "/ecommerce-dashboard.png",
        alt: "E-commerce admin dashboard",
        caption: "Admin dashboard with sales analytics",
      },
      {
        src: "/ecommerce-dashboard.png",
        alt: "Product management interface",
        caption: "Inventory and product management system",
      },
      {
        src: "/ecommerce-dashboard.png",
        alt: "Customer storefront",
        caption: "Customer-facing storefront with search",
      },
    ],
    challenges: [
      "Handling high traffic during sales events",
      "Complex inventory management across multiple warehouses",
      "Payment processing and fraud detection",
    ],
    outcomes: ["Processed $2M+ in transactions", "Reduced cart abandonment by 25%", "Improved page load times by 50%"],
  },
}

export default projects
