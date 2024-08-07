import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="m-4 sm:m-8 px-8 sm:px-12 lg:px-16 py-16 text-white rounded-3xl lg:rounded-[3rem] relative footer-gradient overflow-hidden">
            <div className="max-w-3xl mx-auto">
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Website</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-zinc-300 hover:text-zinc-400 transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-zinc-300 hover:text-zinc-400 transition-colors">About</Link></li>
                            <li><Link href="/sponsorships" className="text-zinc-300 hover:text-zinc-400 transition-colors">Sponsorship</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Activites</h3>
                        <ul className="space-y-2">
                            <li><Link href="/projects" className="text-zinc-300 hover:text-zinc-400 transition-colors">Projects</Link></li>
                            <li><Link href="/events" className="text-zinc-300 hover:text-zinc-400 transition-colors">Events</Link></li>
                            <li><Link href="https://www.immersegt.io/" className="text-zinc-300 hover:text-zinc-400 transition-colors">Hackathon</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li><a href="https://www.instagram.com/georgiatechxr" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-400 transition-colors">Instagram</a></li>
                            <li><a href="https://www.linkedin.com/company/georgiatechxr" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-400 transition-colors">LinkedIn</a></li>
                            <li><a href="mailto:gtxr@contact.com" className="text-zinc-300 hover:text-zinc-400 transition-colors">Email</a></li>
                        </ul>
                    </div>

                </div>
                <p className="text-center text-zinc-400 mt-12 pt-8 border-t border-zinc-700 text-sm">&copy; GTXR is a student organization. Membership and club resources are accessible to Georgia Tech students only.</p>
                <p className="text-center text-zinc-400 mt-8 pt-8 border-t border-zinc-700 text-sm">Website designed and developed by <Link className="hover:text-zinc-200 hover:underline" href={'https://www.alext.app/'}>Alex Thummalapalli</Link> and <Link className="hover:text-zinc-200 hover:underline" href={'https://github.com/Revlord'}>Revanth Reddy</Link></p>
                </div>

            <div className="left-0 right-0 font-sans text-center font-extrabold text-[400px] absolute -bottom-24 w-full leading-none pointer-events-none footer-gradient-text">GTXR</div>
            </footer>
    );
};

export default Footer;