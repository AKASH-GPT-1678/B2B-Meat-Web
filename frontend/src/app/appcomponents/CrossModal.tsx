import React from "react";
import Image from "next/image";

import Cross from "../../../assets/cross.png"

interface ModalProps {
  text: string;
}

const CrossModal: React.FC<ModalProps> = ({ text }) => {
  return (
    <div className="w-100  flex flex-col items-center  p-4 shadow-2xl rounded-xl bg-white">
      <div className="relative w-fit bg-white ">
        <Image
          src={Cross.src}
          alt="images"
          width={200}
          height={200}
          className="
  animate-scalebutton
  "
        />
        <div className="absolute h-fit w-50 top-0 right-0  z-20 bg-white animate-moveshow"></div>
      </div>

      <div>
        <p className="text-2xl font-bold">{text}</p>
      </div>
    </div>
  );
};

export default CrossModal;