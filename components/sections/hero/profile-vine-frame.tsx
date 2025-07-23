// componenets/sections/hero/profile-vine-frame.tsx

import type React from "react";
import { ProfileVineFrameProps } from "@/types/hero";
import { VineGenerator } from "@/components/forest-theme/vines";
import { profileFrameVines } from "@/data/vine-configs";

const ProfileVineFrame: React.FC<ProfileVineFrameProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        width: "clamp(240px, 45vw, 600px)",
        height: "clamp(280px, 52vw, 690px)",
        left: "clamp(-25px, -2.23vw, -20px)",
        top: "clamp(-25px, -2.3vw, -30px)",
      }}
    >
      <VineGenerator vines={profileFrameVines} />
    </div>
  );
};

export default ProfileVineFrame;
