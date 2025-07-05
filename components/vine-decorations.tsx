import React from "react"

interface VineProps {
  top: string
  left?: string
  right?: string
  width: string
  height: string
  opacity: number
  rotate: string
  scale: string
  scaleX?: boolean
  scaleY?: boolean
}

const Vine: React.FC<VineProps> = ({ top, left, right, width, height, opacity, rotate, scale, scaleX, scaleY }) => {
  let transform = `rotate(${rotate}) scale(${scale})`

  if (scaleX) transform += " scaleX(-1)"
  if (scaleY) transform += " scaleY(-1)"

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        right,
        width,
        height,
        backgroundImage: "url('/vine-decoration.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        opacity,
        transform,
      }}
    />
  )
}

interface VineDecorationsProps {
  side: "left" | "right"
  className?: string
}

const VineDecorations = React.forwardRef<HTMLDivElement, VineDecorationsProps>(({ side, className = "" }, ref) => {
  const isLeft = side === "left"

  return (
    <div
      ref={ref}
      className={`fixed ${side}-0 top-0 h-full z-5 pointer-events-none ${className}`}
      style={{
        width: "300px",
        willChange: "transform",
      }}
    >
      {isLeft ? (
        <>
          {/* LEFT SIDE VINES - Layer 1 - Background vines extending into content */}
          <Vine top="-10%" left="-20px" width="130px" height="600px" opacity={0.15} rotate="-8deg" scale="1.2" />
          <Vine
            top="15%"
            left="80px"
            width="115px"
            height="550px"
            opacity={0.18}
            rotate="12deg"
            scale="0.9"
            scaleX={true}
          />
          <Vine top="40%" left="-10px" width="125px" height="580px" opacity={0.16} rotate="-5deg" scale="1.1" />
          <Vine
            top="65%"
            left="90px"
            width="110px"
            height="520px"
            opacity={0.14}
            rotate="9deg"
            scale="0.85"
            scaleX={true}
          />
          <Vine top="85%" left="-5px" width="120px" height="500px" opacity={0.17} rotate="-6deg" scale="1.0" />

          {/* Layer 2 - Mid-ground vines with more overlap */}
          <Vine top="5%" left="60px" width="115px" height="570px" opacity={0.22} rotate="7deg" scale="0.95" />
          <Vine
            top="30%"
            left="100px"
            width="105px"
            height="540px"
            opacity={0.24}
            rotate="-10deg"
            scale="1.05"
            scaleX={true}
          />
          <Vine top="55%" left="-15px" width="130px" height="560px" opacity={0.2} rotate="4deg" scale="0.88" />
          <Vine
            top="80%"
            left="75px"
            width="115px"
            height="480px"
            opacity={0.23}
            rotate="-7deg"
            scale="1.15"
            scaleX={true}
          />

          {/* Layer 3 - Foreground vines with maximum overlap */}
          <Vine top="0%" left="40px" width="120px" height="590px" opacity={0.28} rotate="-3deg" scale="1.0" />
          <Vine
            top="25%"
            left="85px"
            width="110px"
            height="550px"
            opacity={0.3}
            rotate="8deg"
            scale="0.92"
            scaleX={true}
          />
          <Vine top="50%" left="105px" width="100px" height="530px" opacity={0.26} rotate="-4deg" scale="1.08" />
          <Vine
            top="75%"
            left="25px"
            width="115px"
            height="510px"
            opacity={0.29}
            rotate="6deg"
            scale="0.96"
            scaleX={true}
          />

          {/* Extended bottom coverage - Layer 1 */}
          <Vine top="100%" left="20px" width="130px" height="600px" opacity={0.19} rotate="-4deg" scale="1.05" />
          <Vine
            top="110%"
            left="70px"
            width="125px"
            height="550px"
            opacity={0.21}
            rotate="7deg"
            scale="0.9"
            scaleX={true}
          />
          <Vine top="120%" left="-10px" width="130px" height="580px" opacity={0.17} rotate="-8deg" scale="1.1" />
          <Vine
            top="130%"
            left="85px"
            width="125px"
            height="520px"
            opacity={0.23}
            rotate="5deg"
            scale="0.95"
            scaleX={true}
          />
          <Vine top="140%" left="30px" width="120px" height="500px" opacity={0.25} rotate="-6deg" scale="1.0" />
          <Vine
            top="150%"
            left="60px"
            width="135px"
            height="480px"
            opacity={0.18}
            rotate="9deg"
            scale="0.88"
            scaleX={true}
          />

          {/* Extended bottom coverage - Layer 2 */}
          <Vine top="160%" left="-5px" width="130px" height="570px" opacity={0.22} rotate="-3deg" scale="0.93" />
          <Vine
            top="170%"
            left="90px"
            width="135px"
            height="540px"
            opacity={0.16}
            rotate="8deg"
            scale="1.07"
            scaleX={true}
          />
          <Vine top="180%" left="45px" width="125px" height="560px" opacity={0.24} rotate="-7deg" scale="0.91" />
          <Vine
            top="190%"
            left="15px"
            width="130px"
            height="480px"
            opacity={0.2}
            rotate="4deg"
            scale="1.12"
            scaleX={true}
          />
          <Vine top="200%" left="75px" width="125px" height="590px" opacity={0.27} rotate="-5deg" scale="0.97" />
          <Vine
            top="210%"
            left="-15px"
            width="135px"
            height="550px"
            opacity={0.19}
            rotate="6deg"
            scale="1.04"
            scaleX={true}
          />

          {/* Extended bottom coverage - Layer 3 */}
          <Vine top="220%" left="55px" width="130px" height="530px" opacity={0.23} rotate="-9deg" scale="0.89" />
          <Vine
            top="230%"
            left="25px"
            width="125px"
            height="510px"
            opacity={0.21}
            rotate="7deg"
            scale="1.08"
            scaleX={true}
          />
          <Vine top="240%" left="80px" width="130px" height="480px" opacity={0.26} rotate="-4deg" scale="0.94" />
          <Vine
            top="250%"
            left="10px"
            width="135px"
            height="570px"
            opacity={0.18}
            rotate="8deg"
            scale="1.01"
            scaleX={true}
          />
          <Vine top="260%" left="65px" width="120px" height="540px" opacity={0.25} rotate="-6deg" scale="0.96" />
          <Vine
            top="270%"
            left="35px"
            width="135px"
            height="490px"
            opacity={0.22}
            rotate="5deg"
            scale="1.09"
            scaleX={true}
          />
        </>
      ) : (
        <>
          {/* RIGHT SIDE VINES - Layer 1 - Background vines extending into content */}
          <Vine
            top="-5%"
            right="-25px"
            width="125px"
            height="580px"
            opacity={0.16}
            rotate="9deg"
            scale="1.1"
            scaleX={true}
          />
          <Vine top="20%" right="85px" width="115px" height="540px" opacity={0.14} rotate="-11deg" scale="0.9" />
          <Vine
            top="45%"
            right="-15px"
            width="120px"
            height="560px"
            opacity={0.18}
            rotate="6deg"
            scale="1.05"
            scaleX={true}
          />
          <Vine top="70%" right="90px" width="105px" height="500px" opacity={0.15} rotate="-8deg" scale="0.88" />
          <Vine
            top="90%"
            right="-10px"
            width="115px"
            height="480px"
            opacity={0.17}
            rotate="5deg"
            scale="1.0"
            scaleX={true}
          />

          {/* Layer 2 - Mid-ground vines with more overlap */}
          <Vine top="10%" right="65px" width="110px" height="550px" opacity={0.21} rotate="-6deg" scale="0.95" />
          <Vine
            top="35%"
            right="110px"
            width="100px"
            height="520px"
            opacity={0.23}
            rotate="10deg"
            scale="1.08"
            scaleX={true}
          />
          <Vine top="60%" right="-20px" width="125px" height="540px" opacity={0.19} rotate="-4deg" scale="0.92" />
          <Vine
            top="85%"
            right="70px"
            width="115px"
            height="460px"
            opacity={0.22}
            rotate="7deg"
            scale="1.12"
            scaleX={true}
          />

          {/* Layer 3 - Foreground vines with maximum overlap */}
          <Vine
            top="5%"
            right="45px"
            width="115px"
            height="570px"
            opacity={0.27}
            rotate="4deg"
            scale="1.02"
            scaleX={true}
          />
          <Vine top="30%" right="95px" width="108px" height="530px" opacity={0.29} rotate="-9deg" scale="0.94" />
          <Vine
            top="55%"
            right="5px"
            width="120px"
            height="550px"
            opacity={0.25}
            rotate="3deg"
            scale="1.06"
            scaleX={true}
          />
          <Vine top="80%" right="75px" width="110px" height="490px" opacity={0.28} rotate="-5deg" scale="0.98" />

          {/* Extended bottom coverage - Layer 1 */}
          <Vine
            top="100%"
            right="25px"
            width="130px"
            height="590px"
            opacity={0.2}
            rotate="6deg"
            scale="1.02"
            scaleX={true}
          />
          <Vine top="110%" right="80px" width="125px" height="540px" opacity={0.22} rotate="-7deg" scale="0.92" />
          <Vine
            top="120%"
            right="-15px"
            width="135px"
            height="570px"
            opacity={0.16}
            rotate="4deg"
            scale="1.08"
            scaleX={true}
          />
          <Vine top="130%" right="90px" width="125px" height="510px" opacity={0.24} rotate="-5deg" scale="0.96" />
          <Vine
            top="140%"
            right="35px"
            width="130px"
            height="490px"
            opacity={0.26}
            rotate="8deg"
            scale="1.0"
            scaleX={true}
          />
          <Vine top="150%" right="65px" width="125px" height="460px" opacity={0.19} rotate="-3deg" scale="0.94" />

          {/* Extended bottom coverage - Layer 2 */}
          <Vine
            top="160%"
            right="10px"
            width="135px"
            height="580px"
            opacity={0.21}
            rotate="7deg"
            scale="1.03"
            scaleX={true}
          />
          <Vine top="170%" right="75px" width="120px" height="550px" opacity={0.18} rotate="-9deg" scale="0.91" />
          <Vine
            top="180%"
            right="40px"
            width="135px"
            height="520px"
            opacity={0.25}
            rotate="5deg"
            scale="1.07"
            scaleX={true}
          />
          <Vine top="190%" right="-5px" width="125px" height="480px" opacity={0.23} rotate="-6deg" scale="0.98" />
          <Vine
            top="200%"
            right="85px"
            width="130px"
            height="570px"
            opacity={0.27}
            rotate="4deg"
            scale="0.93"
            scaleX={true}
          />
          <Vine top="210%" right="20px" width="130px" height="540px" opacity={0.2} rotate="-8deg" scale="1.05" />

          {/* Extended bottom coverage - Layer 3 */}
          <Vine
            top="220%"
            right="60px"
            width="125px"
            height="500px"
            opacity={0.24}
            rotate="6deg"
            scale="0.89"
            scaleX={true}
          />
          <Vine top="230%" right="30px" width="130px" height="530px" opacity={0.22} rotate="-4deg" scale="1.08" />
          <Vine
            top="240%"
            right="90px"
            width="120px"
            height="480px"
            opacity={0.26}
            rotate="7deg"
            scale="0.94"
            scaleX={true}
          />
          <Vine top="250%" right="15px" width="135px" height="560px" opacity={0.19} rotate="-7deg" scale="1.01" />
          <Vine
            top="260%"
            right="70px"
            width="125px"
            height="520px"
            opacity={0.25}
            rotate="5deg"
            scale="0.96"
            scaleX={true}
          />
          <Vine top="270%" right="45px" width="130px" height="490px" opacity={0.23} rotate="-9deg" scale="1.09" />
        </>
      )}
    </div>
  )
})

VineDecorations.displayName = "VineDecorations"

export default VineDecorations
