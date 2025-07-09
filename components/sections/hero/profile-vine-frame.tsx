import type React from "react";
import VineGenerator from "../../decorative/vine-generator";
import { profileFrameVines } from "@/data/vine-configs";

interface ProfileVineFrameProps {
  className?: string;
}

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
