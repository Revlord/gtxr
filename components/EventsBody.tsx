import React from 'react'
import Image from 'next/image'

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  semester: 'Fall 2024' | 'Spring 2024';
  imageUrl: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "VR Game Night",
    date: "September 15, 2024",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    semester: "Fall 2024",
    imageUrl: "/stock1.jpeg"
  },
  {
    id: 2,
    title: "VR Game Night",
    date: "September 15, 2024",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    semester: "Fall 2024",
    imageUrl: "/stock1.jpeg"
  },
  {
    id: 3,
    title: "VR Game Night",
    date: "September 15, 2024",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    semester: "Spring 2024",
    imageUrl: "/stock1.jpeg"
  },
  {
    id: 4,
    title: "VR Game Night",
    date: "September 15, 2024",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    semester: "Spring 2024",
    imageUrl: "/stock1.jpeg"
  },
  {
    id: 5,
    title: "VR Game Night",
    date: "September 15, 2024",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    semester: "Spring 2024",
    imageUrl: "/stock1.jpeg"
  },
  // ... Add more events with imageUrl
]

const EventCard = ({ event }: { event: Event }) => (
  <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:scale-105 duration-300">
    <div className="relative h-80">
      <Image 
        src={event.imageUrl} 
        alt={event.title} 
        layout="fill" 
        objectFit="cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
      <p className="text-indigo-400 mb-4">{event.date}</p>
      <p className="text-gray-400">{event.description}</p>
    </div>
  </div>
)


/* This code here needs change every semester. Just update the events.filter logic to whatever semester
 We are in right now. As of coding this website the new sem is 'Fall 2024', change it to 'Spring 2025'
 as spring 2025 arrives. Everything else will autosort to 'previous events'
*/

const EventsBody = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.filter(event => event.semester === 'Fall 2024').map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-4xl font-bold text-white mb-8">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.filter(event => event.semester != 'Fall 2024').map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsBody