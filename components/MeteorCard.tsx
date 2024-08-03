import React from "react";
import { Meteors } from "./ui/meteors";

interface MeteorCardProps {
  title: string;
  content: string[];
}

export const MeteorCard = ({ title, content }: MeteorCardProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto hover:scale-105 duration-300">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-95 rounded-full blur-lg" />
      <div className="relative shadow-xl border border-gray-800 p-6 h-full overflow-hidden rounded-2xl flex flex-col justify-between items-start bg-opacity-90 bg-black">
        <div className="relative z-50">
          <h1 className="font-bold text-xl text-white mb-4">{title}</h1>
          <ul className="font-normal text-base text-slate-300 mb-4 space-y-2">
            {content.map((item, index) => (
              <li key={index} className="list-disc list-inside">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Meteors number={10} />
      </div>
    </div>
  );
}
