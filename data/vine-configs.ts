export interface VineConfig {
  top?: string
  left?: string
  right?: string
  bottom?: string
  width: string
  height: string
  opacity: number
  rotate: string
  scale: string
  scaleX?: boolean
  scaleY?: boolean
}

// Profile picture frame vines
export const profileFrameVines: VineConfig[] = [
  // Top vines
  { top: "-20px", left: "20px", width: "80px", height: "120px", opacity: 0.3, rotate: "-15deg", scale: "0.6" },
  {
    top: "-10px",
    left: "80px",
    width: "90px",
    height: "140px",
    opacity: 0.35,
    rotate: "25deg",
    scale: "0.7",
    scaleX: true,
  },
  { top: "-15px", right: "80px", width: "85px", height: "130px", opacity: 0.32, rotate: "-20deg", scale: "0.65" },
  {
    top: "-5px",
    right: "20px",
    width: "75px",
    height: "110px",
    opacity: 0.28,
    rotate: "30deg",
    scale: "0.55",
    scaleX: true,
  },

  // Left side vines
  { top: "60px", left: "-25px", width: "100px", height: "150px", opacity: 0.33, rotate: "-45deg", scale: "0.75" },
  {
    top: "180px",
    left: "-20px",
    width: "95px",
    height: "140px",
    opacity: 0.31,
    rotate: "-35deg",
    scale: "0.7",
    scaleX: true,
  },
  { top: "300px", left: "-15px", width: "90px", height: "135px", opacity: 0.29, rotate: "-40deg", scale: "0.68" },
  {
    top: "420px",
    left: "-10px",
    width: "85px",
    height: "125px",
    opacity: 0.27,
    rotate: "-50deg",
    scale: "0.65",
    scaleX: true,
  },

  // Right side vines
  {
    top: "80px",
    right: "-25px",
    width: "95px",
    height: "145px",
    opacity: 0.34,
    rotate: "45deg",
    scale: "0.72",
    scaleX: true,
  },
  { top: "200px", right: "-20px", width: "90px", height: "135px", opacity: 0.32, rotate: "35deg", scale: "0.69" },
  {
    top: "320px",
    right: "-15px",
    width: "85px",
    height: "130px",
    opacity: 0.3,
    rotate: "40deg",
    scale: "0.66",
    scaleX: true,
  },
  { top: "440px", right: "-10px", width: "80px", height: "120px", opacity: 0.28, rotate: "50deg", scale: "0.63" },

  // Bottom vines
  {
    bottom: "-20px",
    left: "30px",
    width: "85px",
    height: "125px",
    opacity: 0.31,
    rotate: "15deg",
    scale: "0.67",
    scaleY: true,
  },
  {
    bottom: "-15px",
    left: "100px",
    width: "90px",
    height: "135px",
    opacity: 0.33,
    rotate: "-25deg",
    scale: "0.7",
    scaleY: true,
    scaleX: true,
  },
  {
    bottom: "-10px",
    right: "100px",
    width: "80px",
    height: "120px",
    opacity: 0.29,
    rotate: "20deg",
    scale: "0.64",
    scaleY: true,
  },
  {
    bottom: "-25px",
    right: "40px",
    width: "75px",
    height: "115px",
    opacity: 0.27,
    rotate: "-30deg",
    scale: "0.61",
    scaleY: true,
    scaleX: true,
  },

  // Corner accent vines
  { top: "40px", left: "40px", width: "70px", height: "105px", opacity: 0.25, rotate: "-60deg", scale: "0.5" },
  {
    top: "40px",
    right: "40px",
    width: "70px",
    height: "105px",
    opacity: 0.25,
    rotate: "60deg",
    scale: "0.5",
    scaleX: true,
  },
  {
    bottom: "40px",
    left: "40px",
    width: "70px",
    height: "105px",
    opacity: 0.25,
    rotate: "60deg",
    scale: "0.5",
    scaleY: true,
  },
  {
    bottom: "40px",
    right: "40px",
    width: "70px",
    height: "105px",
    opacity: 0.25,
    rotate: "-60deg",
    scale: "0.5",
    scaleY: true,
    scaleX: true,
  },
]

// Skills grid frame vines
export const skillsFrameVines: VineConfig[] = [
  // Top vines
  { top: "-20px", left: "60px", width: "80px", height: "120px", opacity: 0.3, rotate: "-15deg", scale: "0.6" },
  { top: "-15px", left: "200px", width: "85px", height: "130px", opacity: 0.32, rotate: "-20deg", scale: "0.65" },
  {
    top: "-10px",
    right: "200px",
    width: "90px",
    height: "140px",
    opacity: 0.35,
    rotate: "25deg",
    scale: "0.7",
    scaleX: true,
  },
  { top: "-15px", right: "60px", width: "85px", height: "130px", opacity: 0.32, rotate: "-20deg", scale: "0.65" },

  // Left side vines
  { top: "80px", left: "-25px", width: "100px", height: "150px", opacity: 0.33, rotate: "-45deg", scale: "0.75" },
  {
    top: "280px",
    left: "-20px",
    width: "95px",
    height: "140px",
    opacity: 0.31,
    rotate: "-35deg",
    scale: "0.7",
    scaleX: true,
  },

  // Right side vines
  {
    top: "80px",
    right: "-25px",
    width: "95px",
    height: "145px",
    opacity: 0.34,
    rotate: "45deg",
    scale: "0.72",
    scaleX: true,
  },
  { top: "280px", right: "-20px", width: "90px", height: "135px", opacity: 0.32, rotate: "35deg", scale: "0.69" },

  // Bottom vines
  {
    bottom: "-20px",
    left: "80px",
    width: "85px",
    height: "125px",
    opacity: 0.31,
    rotate: "15deg",
    scale: "0.67",
    scaleY: true,
  },
  {
    bottom: "-15px",
    left: "220px",
    width: "90px",
    height: "135px",
    opacity: 0.33,
    rotate: "-25deg",
    scale: "0.7",
    scaleY: true,
    scaleX: true,
  },
  {
    bottom: "-10px",
    right: "220px",
    width: "80px",
    height: "120px",
    opacity: 0.29,
    rotate: "20deg",
    scale: "0.64",
    scaleY: true,
  },
  {
    bottom: "-25px",
    right: "80px",
    width: "75px",
    height: "115px",
    opacity: 0.27,
    rotate: "-30deg",
    scale: "0.61",
    scaleY: true,
    scaleX: true,
  },

  // Corner accent vines
  { top: "40px", left: "40px", width: "70px", height: "105px", opacity: 0.25, rotate: "-60deg", scale: "0.5" },
  {
    top: "40px",
    right: "40px",
    width: "70px",
    height: "105px",
    opacity: 0.25,
    rotate: "60deg",
    scale: "0.5",
    scaleX: true,
  },
  {
    bottom: "40px",
    left: "40px",
    width: "70px",
    height: "105px",
    opacity: 0.25,
    rotate: "60deg",
    scale: "0.5",
    scaleY: true,
  },
  {
    bottom: "40px",
    right: "40px",
    width: "70px",
    height: "105px",
    opacity: 0.25,
    rotate: "-60deg",
    scale: "0.5",
    scaleY: true,
    scaleX: true,
  },
]

// Footer accent vines
export const footerVines: VineConfig[] = [
  {
    bottom: "20px",
    left: "20px",
    width: "60px",
    height: "90px",
    opacity: 0.15,
    rotate: "45deg",
    scale: "0.4",
    scaleY: true,
  },
  {
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "90px",
    opacity: 0.15,
    rotate: "-45deg",
    scale: "0.4",
    scaleY: true,
    scaleX: true,
  },
]

// Generate side vines programmatically to reduce repetition
export const generateSideVines = (side: "left" | "right"): VineConfig[] => {
  const vines: VineConfig[] = []
  const isLeft = side === "left"

  // Layer 1 - Background vines
  const layer1Positions = ["-10%", "15%", "40%", "65%", "85%"]
  layer1Positions.forEach((top, index) => {
    vines.push({
      top,
      [isLeft ? "left" : "right"]: index % 2 === 0 ? "-20px" : "80px",
      width: `${115 + (index % 3) * 5}px`,
      height: `${520 + (index % 4) * 20}px`,
      opacity: 0.14 + (index % 3) * 0.02,
      rotate: `${isLeft ? "-" : ""}${5 + (index % 3) * 3}deg`,
      scale: `${0.85 + (index % 4) * 0.1}`,
      scaleX: index % 2 === 1,
    })
  })

  // Layer 2 - Mid-ground vines
  const layer2Positions = ["5%", "30%", "55%", "80%"]
  layer2Positions.forEach((top, index) => {
    vines.push({
      top,
      [isLeft ? "left" : "right"]: index % 2 === 0 ? "60px" : "100px",
      width: `${105 + (index % 3) * 5}px`,
      height: `${480 + (index % 4) * 30}px`,
      opacity: 0.2 + (index % 3) * 0.02,
      rotate: `${isLeft ? "" : "-"}${4 + (index % 3) * 3}deg`,
      scale: `${0.88 + (index % 4) * 0.1}`,
      scaleX: index % 2 === 1,
    })
  })

  // Layer 3 - Foreground vines
  const layer3Positions = ["0%", "25%", "50%", "75%"]
  layer3Positions.forEach((top, index) => {
    vines.push({
      top,
      [isLeft ? "left" : "right"]: index % 2 === 0 ? "40px" : "85px",
      width: `${100 + (index % 3) * 10}px`,
      height: `${510 + (index % 4) * 20}px`,
      opacity: 0.26 + (index % 3) * 0.02,
      rotate: `${isLeft ? "-" : ""}${3 + (index % 3) * 2}deg`,
      scale: `${0.92 + (index % 4) * 0.08}`,
      scaleX: index % 2 === 1,
    })
  })

  // Extended bottom coverage
  for (let i = 100; i <= 270; i += 10) {
    vines.push({
      top: `${i}%`,
      [isLeft ? "left" : "right"]: i % 20 === 0 ? "-15px" : "70px",
      width: `${120 + (i % 3) * 5}px`,
      height: `${480 + (i % 4) * 30}px`,
      opacity: 0.16 + (i % 5) * 0.02,
      rotate: `${isLeft ? "-" : ""}${4 + (i % 4) * 2}deg`,
      scale: `${0.89 + (i % 5) * 0.04}`,
      scaleX: i % 3 === 1,
    })
  }

  return vines
}
