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
    title: "Pivot",
    description: "A puzzle game that challenges players' ability to navigate strange spaces while controlling gravity. The main feature of the game is a teleportation mechanic where players can not only move laterally through the space but also shift their orientation and the gravity of the world in order to teleport to surfaces that are not at the same orientation as them.",
    image: "/images/pivot.jpg"
  },
  {
    title: "CentrifyVR",
    description: "An immersive virtual reality relaxation experience that guides users to become more aware of their movements. There has been research demonstrating that when people are encouraged to slow down common movements in their limbs, their heart rate slows and they become more relaxed.",
    image: "/images/centrifyvr.jpg"
  },
  {
    title: "Rogue Starfighter VR",
    description: "An immersive virtual reality Star Wars X-wing flight simulator fan game. In it, the player experiences the full scale and power of space combat from a galaxy far, far away behind the controls of an X-wing starfighter.",
    image: "/images/rogue-starfighter.jpg"
  },
]