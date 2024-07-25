import React from 'react'
import Image from 'next/image'
import { projects } from '@/data';


const ProjHero = () => {
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center py-16">GTXR Student Projects</h1>
      <p className="text-lg mb-12 text-center max-w-3xl mx-auto">
        GTXR selects and supports a cohort of student projects every school year. Each project group is paired with a relevant industry mentor to give guidance and feedback throughout the year.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src={project.image} alt={project.title} width={500} height={300} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-black">{project.title}</h2>
              <p className="text-gray-700">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjHero