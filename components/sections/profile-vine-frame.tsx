import type React from "react"

interface ProfileVineFrameProps {
  className?: string
}

const ProfileVineFrame: React.FC<ProfileVineFrameProps> = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "600px", height: "690px", left: "-30px", top: "-30px" }}
    >
      {/* Top vines */}
      <div
        className="absolute"
        style={{
          top: "-20px",
          left: "20px",
          width: "80px",
          height: "120px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.3,
          transform: "rotate(-15deg) scale(0.6)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "-10px",
          left: "80px",
          width: "90px",
          height: "140px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.35,
          transform: "rotate(25deg) scale(0.7) scaleX(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "-15px",
          right: "80px",
          width: "85px",
          height: "130px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.32,
          transform: "rotate(-20deg) scale(0.65)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "-5px",
          right: "20px",
          width: "75px",
          height: "110px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.28,
          transform: "rotate(30deg) scale(0.55) scaleX(-1)",
        }}
      />

      {/* Left side vines */}
      <div
        className="absolute"
        style={{
          top: "60px",
          left: "-25px",
          width: "100px",
          height: "150px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.33,
          transform: "rotate(-45deg) scale(0.75)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "180px",
          left: "-20px",
          width: "95px",
          height: "140px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.31,
          transform: "rotate(-35deg) scale(0.7) scaleX(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "300px",
          left: "-15px",
          width: "90px",
          height: "135px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.29,
          transform: "rotate(-40deg) scale(0.68)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "420px",
          left: "-10px",
          width: "85px",
          height: "125px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.27,
          transform: "rotate(-50deg) scale(0.65) scaleX(-1)",
        }}
      />

      {/* Right side vines */}
      <div
        className="absolute"
        style={{
          top: "80px",
          right: "-25px",
          width: "95px",
          height: "145px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.34,
          transform: "rotate(45deg) scale(0.72) scaleX(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "200px",
          right: "-20px",
          width: "90px",
          height: "135px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.32,
          transform: "rotate(35deg) scale(0.69)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "320px",
          right: "-15px",
          width: "85px",
          height: "130px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.3,
          transform: "rotate(40deg) scale(0.66) scaleX(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "440px",
          right: "-10px",
          width: "80px",
          height: "120px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.28,
          transform: "rotate(50deg) scale(0.63)",
        }}
      />

      {/* Bottom vines */}
      <div
        className="absolute"
        style={{
          bottom: "-20px",
          left: "30px",
          width: "85px",
          height: "125px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.31,
          transform: "rotate(15deg) scale(0.67) scaleY(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-15px",
          left: "100px",
          width: "90px",
          height: "135px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.33,
          transform: "rotate(-25deg) scale(0.7) scaleY(-1) scaleX(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-10px",
          right: "100px",
          width: "80px",
          height: "120px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.29,
          transform: "rotate(20deg) scale(0.64) scaleY(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-25px",
          right: "40px",
          width: "75px",
          height: "115px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.27,
          transform: "rotate(-30deg) scale(0.61) scaleY(-1) scaleX(-1)",
        }}
      />

      {/* Corner accent vines */}
      <div
        className="absolute"
        style={{
          top: "40px",
          left: "40px",
          width: "70px",
          height: "105px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.25,
          transform: "rotate(-60deg) scale(0.5)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "40px",
          right: "40px",
          width: "70px",
          height: "105px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.25,
          transform: "rotate(60deg) scale(0.5) scaleX(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "40px",
          left: "40px",
          width: "70px",
          height: "105px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.25,
          transform: "rotate(60deg) scale(0.5) scaleY(-1)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "40px",
          right: "40px",
          width: "70px",
          height: "105px",
          backgroundImage: "url('/vine-decoration.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.25,
          transform: "rotate(-60deg) scale(0.5) scaleY(-1) scaleX(-1)",
        }}
      />
    </div>
  )
}

export default ProfileVineFrame
