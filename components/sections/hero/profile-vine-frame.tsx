// componenets/sections/hero/profile-vine-frame.tsx

import type React from "react";
import { ProfileVineFrameProps } from "@/types/hero";
import { VineGenerator } from "@/components/decorative/vines";
import { profileFrameVines } from "@/data/vine-configs";

const ProfileVineFrame: React.FC<ProfileVineFrameProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "600px", height: "690px", left: "-30px", top: "-30px" }}
    >
      <VineGenerator vines={profileFrameVines} />
    </div>
  );
};

export default ProfileVineFrame;
