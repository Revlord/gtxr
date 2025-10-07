import React from 'react'
import SafeLink from './ui/safe-link'

const Footer = () => {
    return (
        <footer className="relative bg-black text-white py-12 px-8 overflow-hidden">
            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Logo and Description */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <h2 className="text-2xl font-bold mb-4">GTXR</h2>
                        <p className="text-zinc-300">
                            The future of extended reality at Georgia Tech.
                        </p>
                    </div>

                    {/* Website Links */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="text-xl font-semibold mb-4">Website</h3>
                        <ul className="space-y-2">
                            <li><SafeLink href="/" className="text-zinc-300 hover:text-zinc-400 transition-colors">Home</SafeLink></li>
                            <li><SafeLink href="/about" className="text-zinc-300 hover:text-zinc-400 transition-colors">About</SafeLink></li>
                            <li><SafeLink href='https://www.icxr.org/'>ICXR</SafeLink></li>
                        </ul>
                    </div>

                    {/* Activities Links */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="text-xl font-semibold mb-4">Activities</h3>
                        <ul className="space-y-2">
                            <li><SafeLink href="/projects" className="text-zinc-300 hover:text-zinc-400 transition-colors">Projects</SafeLink></li>
                            <li><SafeLink href="/events" className="text-zinc-300 hover:text-zinc-400 transition-colors">Events</SafeLink></li>
                            <li><SafeLink href="https://www.immersegt.io/" className="text-zinc-300 hover:text-zinc-400 transition-colors">Hackathon</SafeLink></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="text-xl font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li>
                                <SafeLink href="https://discord.gg/GGBEuSHZHX" className="text-zinc-300 hover:text-zinc-400 transition-colors">
                                    Discord
                                </SafeLink>
                            </li>
                            <li>
                                <SafeLink href="https://www.instagram.com/gtxr.club/" className="text-zinc-300 hover:text-zinc-400 transition-colors">
                                    Instagram
                                </SafeLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center text-zinc-400 text-sm">
                <p>
                    &copy; GTXR is a student organization. Membership and club resources are accessible to Georgia Tech students only.
                </p>
                <p>
                    Website designed and developed by <SafeLink className="hover:text-zinc-200 hover:underline" href={'https://www.alext.app/'}>Alex Thummalapalli</SafeLink> and <SafeLink className="hover:text-zinc-200 hover:underline" href={'https://github.com/Revlord'}>Revanth Reddy</SafeLink>.
                </p>
            </div>
            <div className="left-0 right-0 font-sans text-center font-extrabold text-[300px] sm:text-[400px] absolute -bottom-24 w-full leading-none pointer-events-none footer-gradient-text">
                GTXR
            </div>
        </footer>
    )
}

export default Footer
