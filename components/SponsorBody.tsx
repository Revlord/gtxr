import React from 'react';
import { MeteorCard } from './MeteorCard';

//Need to fix spacing errors below the lower h3 and p (above the footer) when the screen size is minimized


const SponsorBody = () => {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">

          <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-500 mb-4 hover:scale-120 duration-300 text-center">
            Why invest in us?
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-violet-500 to-indigo-700 text-transparent bg-clip-text text-center">
            At GTXR, we're not just a student organization - we're the breeding ground for tomorrow's XR innovators.
          </h2>

          <h3 className="text-purple-400 font-bold text-xl sm:text-2xl mb-8 sm:mb-12 hover:text-purple-300 transition-colors duration-300 text-center">
            By sponsoring GTXR, you're <span className="bg-gradient-to-r to-indigo-600 from-violet-600 text-transparent bg-clip-text">investing in the future</span> of XR technology and gaining exclusive access to a pool of <span className="bg-gradient-to-r to-violet-600 from-indigo-600 text-transparent bg-clip-text">talented, passionate students</span> who are already making <span className="bg-gradient-to-r to-indigo-600 from-violet-600 text-transparent bg-clip-text">waves in the industry.</span>
          </h3>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 text-center">
            Our members are not just learning about XR - they're actively creating, innovating, and solving real-world problems with cutting-edge solutions.
          </p>

          <ul className="items-center list-none pl-0 text-zinc-400 flex flex-col gap-4 mb-12 text-center">
            {[
              'Networking with industry professionals',
              'The latest VR hardware including Apple Vision Pro and Meta Quest 3',
              'Leadership and project pitch opportunities',
              'A collaborative, welcoming atmosphere for all',
              'And so much more!',
            ].map((item, index) => (
              <li key={index} className="text-base sm:text-lg leading-relaxed flex items-center justify-center">
                <span className="text-purple-400 mr-2">&#9733;</span> {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-10">
            <MeteorCard
              title="Your support enables us to:"
              content={[
                "Host industry-leading workshops and hackathons.",
                "Provide state-of-the-art XR equipment for student projects.",
                "Expand our XR Outreach on a higher scale",
                "Collaborate with industry partners on groundbreaking research."
              ]}
            />
            <MeteorCard
              title="In return:"
              content={[
                "Empower your brand with premier access to GTXR's top talent.",
                "Prominent exposure across our events and digital platforms.",
                "Unique opportunities to engage with our innovative community.",
                "Presence in GT campus."
              ]}
            />
          </div>

          <h3 className="text-zinc-400 sm:text-xl leading-relaxed mt-12 text-center">
            Join us in cultivating the next generation of XR talent. Together, we can create immersive experiences that will transform industries and shape our digital future.
          </h3>

          <p className="text-zinc-400 sm:text-3xl leading-relaxed mt-6 p-4 text-center">
            To reach out to us, feel free to email us at <a href='mailto:contact@gtxr.club' className='text-violet-600'>contact@gtxr.club</a>
          </p>

        </div>

      </div>
    </div>
  );
}

export default SponsorBody;
