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
    title: "Week of Welcome Event 2024",
    date: "August 13, 2024",
    description: "Join us for an exciting showcase of what this is all about and what we want to plan on providing and doing with members throughout the school year! Slide Deck: https://docs.google.com/file/d/120hN-dPiMV9QdhaYmcJKT6EGvkO38lkM/edit?usp=docslist_api&filetype=mspresentation",
    imageUrl: "/club13.jpg",
    status: 'Past'
  },
  {
    id: 2,
    title: "Project Pitch",
    date: "September 8, 2024",
    description: "The ultimate showdown of THE best projects in XR. The top projects will be chosen to commence for Fall 2024-Spring 2025. Applications close September 8th, join our discord and let your creativity take over!",
    imageUrl: "/club3.jpg",
    status: 'Past'
  },
  {
    id: 3,
    title: "ImmerseGT 2025",
    date: "April 5-7, 2025",
    description: "Participate in ImmerseGT, an innovative XR hackathon hosted by GTXR, on Georgia Tech's campus from April 4th-6th. Compete for your share of prizes as you build and test XR applications using state-of-the-art headsets.",
    imageUrl: "/immersegt.png",
    status: 'Upcoming'
  },
  {
    id: 4,
    title: "ICXR Meetup",
    date: "September 15, 2024",
    description: "Join us for an exciting evening of VR gaming and networking with the INTERCOLLEGIATE XR organization that allow developers from all different schools and job positions to work together a foster an even larger connection all around the world!",
    imageUrl: "/club7.jpg",
    status: 'Past'
  },
  {
    id: 5,
    title: "Speaker Event (Meta)",
    date: "April 4, 2023",
    description: "Join us for an exciting evening of networking alongside Meta recruiters and see the opprotunities available for Extended Reality developers!",
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
    description: "A HUGE paid VR Development opportunity open to undergrads in collaboration with GT Leadership Education and Development. Includes development work in Virtual and Augmented Reality experiences for specific classes around campus and even some school wide programs!",
    imageUrl: "/club12.png",
    status: 'Past'
  },
  {
    id: 8,
    title: "GTXR Club Fair",
    date: "August 27, 2024",
    description: "On the Skiles Walkway from 11am until 1pm. GTXR will have a table to showcase the organization, allowing students to learn more about their activities and possibly join. Includes some demoes for Virtual Reality headsets during the club expo",
    imageUrl: "/clubExpoFallPhoto.png",
    status: 'Past'
  },
  {
    id: 9,
    title: "GTXR Kickoff Event",
    date: "September 1, 2024",
    description: "Join us for an exciting kickoff event as we launch the Extended Reality College Club! This is your chance to dive into the world of VR and AR, connect with fellow enthusiasts, and get to know our club's vision and activities alongside some amazing headset demoes!",
    imageUrl: "/kickoffFall2024.jpg",
    status: 'Past'
  },
  {
    id: 10,
    title: "Project Showcase",
    date: "September 20, 2024",
    description: "Explore groundbreaking XR projects at our club's showcase, featuring top innovations selected from our recent Project Pitch Competition. See which projects you may want to get involved with over this semester!",
    imageUrl: "/projectShowcase.jpg",
    status: 'Upcoming'
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