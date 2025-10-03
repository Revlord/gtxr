/**
 * This file includes all the variables that represent content on the website.
 * Exec members can fill in/edit the texts || descriptions if required.
 */

import { getAssetPath } from "@/utils/handleBasePath";


//variable for items displayed in the navba
export const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Events', href: '/events' },
  { label: 'Hackathon', href: 'https://www.immersegt.org/' },
  { label: 'Sponsorship', href: '/sponsorships' },
  {label: 'Discord', href: 'https://discord.gg/GGBEuSHZHX'}
]

//variable for the flipping words in hero section
export const words = ["Step-into", "Explore", "Conquer"];

//variable for info about the exec members, edit them as needed
//need to add actual images of the exec memebers from the notion
export const execMembers = [
  {
    name: "Ethan Kimmel",
    role: "Co-President",
    bio: "",
    image: getAssetPath("/ethan.jpg")
  },
  {
    name: "Ryan Clark",
    role: "Co-President",
    bio: "",
    image: getAssetPath("/ryan.jpg")
  },
  {
    name: "Jack English",
    role: "Ex-President",
    bio: "",
    image: getAssetPath("/jackenglish.jpeg")
  },
  {
    name: "Ilkin Mammadli",
    role: "Ex-President",
    bio: "",
    image: getAssetPath("/ilkin.png")
  },
  {
    name: "Revanth Reddy",
    role: "Director Of Operations",
    bio: "",
    image: getAssetPath("/revanth.png")
  },
  {
    name: "Ian Valderas",
    role: "Secretary",
    bio: "",
    image: getAssetPath("/ian.jpg")
  },
  {
    name: "Prithiv Premkumar",
    role: "Director Of Finance",
    bio: "",
    image: getAssetPath("/pritiv.jpg")
  },
  {
    name: "Akshin Vemana",
    role: "Beat Saber Coordinator",
    bio: "",
    image: getAssetPath("/akshin.png")
  },
];