import React from 'react'
import Image from 'next/image'

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  status: 'Upcoming' | 'Past';
}

const events: Event[] = [
  {
    id: 1,
    title: "Week of Welcome",
    date: "August 13, 2024",
    description: "Join us for an exciting showcase of cool VR stuff",
    imageUrl: "/club6.jpg",
    status: 'Past'
  },
  {
    id: 2,
    title: "Project Pitch",
    date: "September 8, 2024",
    description: "Join us for an exciting project pitch competition",
    imageUrl: "/club3.jpg",
    status: 'Upcoming'
  },
  {
    id: 3,
    title: "ImmerseGT 2025",
    date: "April 5-7, 2025",
    description: "Attend the worlds biggest XR hackathon",
    imageUrl: "/immersegt.png",
    status: 'Upcoming'
  },
  {
    id: 4,
    title: "ICXR Meetup",
    date: "September 15, 2024",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    imageUrl: "/club7.jpg",
    status: 'Past'
  },
  {
    id: 5,
    title: "Speaker Event (Meta)",
    date: "April 4, 2023",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    imageUrl: "/club9.png",
    status: 'Past'
  },
  {
    id: 6,
    title: "Speaker Event (Start-ups)",
    date: "April 5, 2023",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    imageUrl: "/club8.png",
    status: 'Past'
  },
  {
    id: 7,
    title: "GT LEAD Info Session",
    date: "March 31, 2024",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    imageUrl: "/club12.png",
    status: 'Past'
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


/* Update the 'status' to either 'Upcoming' or 'Past' to switch events to their respective status
*/

//note for self: code functionality to automatially update status

const EventsBody = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.filter(event => event.status === 'Upcoming').map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-4xl font-bold text-white mb-8">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.filter(event => event.status != 'Upcoming').map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsBody