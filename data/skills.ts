export interface Skill {
  name: string
  iconPath: string
  color: string
  category: string
}

const skills: Skill[] = [
  // Frontend
  {
    name: "TypeScript",
    iconPath: "/icons/typescript.svg",
    color: "#3178C6",
    category: "Frontend",
  },
  {
    name: "React",
    iconPath: "/icons/react.svg",
    color: "#61DAFB",
    category: "Frontend",
  },
  {
    name: "Next.js",
    iconPath: "/icons/nextjs.svg",
    color: "#000000",
    category: "Frontend",
  },
  {
    name: "HTML5",
    iconPath: "/icons/html5.svg",
    color: "#E34F26",
    category: "Frontend",
  },
  {
    name: "CSS3",
    iconPath: "/icons/css3.svg",
    color: "#1572B6",
    category: "Frontend",
  },
  {
    name: "SCSS",
    iconPath: "/icons/sass.svg",
    color: "#CF649A",
    category: "Frontend",
  },

  // Backend
  {
    name: "Node.js",
    iconPath: "/icons/nodejs.svg",
    color: "#339933",
    category: "Backend",
  },
  {
    name: "Python",
    iconPath: "/icons/python.svg",
    color: "#3776AB",
    category: "Backend",
  },
  {
    name: "PHP",
    iconPath: "/icons/php.svg",
    color: "#777BB4",
    category: "Backend",
  },
  {
    name: "Laravel",
    iconPath: "/icons/laravel.svg",
    color: "#FF2D20",
    category: "Backend",
  },
  {
    name: "GraphQL",
    iconPath: "/icons/graphql.svg",
    color: "#E10098",
    category: "Backend",
  },
  {
    name: "Symfony",
    iconPath: "/icons/symfony.svg",
    color: "#000000",
    category: "Backend",
  },

  // Database
  {
    name: "MySQL",
    iconPath: "/icons/mysql.svg",
    color: "#4479A1",
    category: "Database",
  },
  {
    name: "PostgreSQL",
    iconPath: "/icons/postgresql.svg",
    color: "#336791",
    category: "Database",
  },
  {
    name: "MongoDB",
    iconPath: "/icons/mongodb.svg",
    color: "#47A248",
    category: "Database",
  },

  // DevOps
  {
    name: "AWS",
    iconPath: "/icons/aws.svg",
    color: "#FF9900",
    category: "DevOps",
  },
  {
    name: "Docker",
    iconPath: "/icons/docker.svg",
    color: "#2496ED",
    category: "DevOps",
  },
  {
    name: "Linux",
    iconPath: "/icons/linux.svg",
    color: "#FCC624",
    category: "DevOps",
  },
  {
    name: "Git",
    iconPath: "/icons/git.svg",
    color: "#F05032",
    category: "DevOps",
  },
  {
    name: "Jenkins",
    iconPath: "/icons/jenkins.svg",
    color: "#D33833",
    category: "DevOps",
  },
  {
    name: "Kubernetes",
    iconPath: "/icons/kubernetes.svg",
    color: "#326CE5",
    category: "DevOps",
  },
]

export default skills
