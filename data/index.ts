/**
 * This file includes all the variables that represent content on the website.
 * Exec members can fill in/edit the texts || descriptions if required.
 */


//variable for items displayed in the navbar
export const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Events', href: '/events' },
  { label: 'Hackathon', href: 'https://www.immersegt.io/' },
  { label: 'Sponsorship', href: '/sponsorships' },
]

//variable for the flipping words in hero section
export const words = ["Step-into", "Explore", "Conquer"];

//variable for info about the exec members, edit them as needed
//need to add actual images of the exec memebers from the notion
export const execMembers = [
  {
    name: "Jack English",
    role: "Co-President",
    bio: "Lorem ipsum blablabalablabal balbal blabalal bla",
    image: "/jackenglish.jpeg"
  },
  {
    name: "Ilkin Mammadli",
    role: "Co-President",
    bio: "Lorem ipsum blablabalablabal balbal blabalal bla",
    image: "/ilkin.png"
  },
  {
    name: "Revanth Reddy",
    role: "Director Of Operations",
    bio: "rburramukku3@gatech.edu",
    image: "/revanth.png"
  },
  {
    name: "Ian Valderas",
    role: "Secretary",
    bio: "Lorem ipsum blablabalablabal balbal blabalal bla",
    image: "/ian.jpg"
  },
  {
    name: "Ryan Clark",
    role: "Director Of Projects",
    bio: "Lorem ipsum blablabalablabal balbal blabalal bla",
    image: "/ryan.jpg"
  },
  {
    name: "Ethan Kimmel",
    role: "Director Of Marketing",
    bio: "Lorem ipsum blablabalablabal balbal blabalal bla",
    image: "/ethan.jpg"
  },
  {
    name: "Akshin Vemana",
    role: "Beat Saber Coordinator",
    bio: "Lorem ipsum blablabalablabal balbal blabalal bla",
    image: "/dummy_image_1.jpg"
  },
  {
    name: "Prithiv Premkumar",
    role: "Director Of Finance",
    bio: "Lorem ipsum blablabalablabal balbal blabalal bla",
    image: "/dummy_image_1.jpg"
  }
];

//variable for projects and their description
export const projects = [
  {
    title: "Motion ID",
    description: "The primary objective of this research project is to explore the feasibility of utilizing motion data as a means of identifying users of XR devices.",
    image: "/dummy_image_1.jpg"
  },
  {
    title: "Exit Suit",
    description: "A full-body support device that lets you move in amazing ways within virtual space and is the future of human/computer interface.",
    image: "/images/rogue-starfighter.jpg"
  },
  {
    title: "VR Graphing Calculator",
    description: "This innovative tool has the potential to revolutionize the way we interact with mathematical concepts and visualize graphs.",
    image: "/dummy_image_1.jpg"
  },
]