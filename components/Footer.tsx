import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <footer className="m-4 sm:m-8 p-8 sm:p-12 lg:p-16 bg-zinc-900 text-white rounded-3xl lg:rounded-[3rem] relative footer-gradient overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col space-y-12 lg:space-y-0 items-center">
                {/* Footer Content */}
                <div className="flex-1 w-full max-w-5xl">
                    <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-5 gap-8 text-center items-center ">
                        <div className="sm:col-span-3 md:col-span-1 order-first flex items-center justify-center">
                            <Image src="/temp_logo.png" alt="GTXR Logo" width={150} height={150} />
                        </div>

                        {/* Website Links */}
                        <div className="sm:col-span-2 md:col-span-1">
                            <h3 className="text-xl font-semibold mb-4">Website</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-zinc-300 hover:text-zinc-400 transition-colors">Home</Link></li>
                                <li><Link href="/about" className="text-zinc-300 hover:text-zinc-400 transition-colors">About</Link></li>
                                <li><Link href='https://www.icxr.org/'>ICXR</Link></li>
                            </ul>
                        </div>

                        {/* Activities Links */}
                        <div className="sm:col-span-2 md:col-span-1">
                            <h3 className="text-xl font-semibold mb-4">Activities</h3>
                            <ul className="space-y-2">
                                <li><Link href="/projects" className="text-zinc-300 hover:text-zinc-400 transition-colors">Projects</Link></li>
                                <li><Link href="/events" className="text-zinc-300 hover:text-zinc-400 transition-colors">Events</Link></li>
                                <li><Link href="https://www.immersegt.io/" className="text-zinc-300 hover:text-zinc-400 transition-colors">Hackathon</Link></li>
                            </ul>
                        </div>

                        {/* Connect Links */}
                        <div className="sm:col-span-2 md:col-span-1">
                            <h3 className="text-xl font-semibold mb-4">Connect</h3>
                            <ul className="space-y-2">
                                <li><a href="https://www.instagram.com/georgiatechxr" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-400 transition-colors">Instagram</a></li>
                                <li><a href="https://www.linkedin.com/company/georgiatechxr" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-400 transition-colors">LinkedIn</a></li>
                                <li><a href="mailto:contact@gtxr.club" className="text-zinc-300 hover:text-zinc-400 transition-colors">Email</a></li>
                            </ul>
                        </div>

                        <a href='https://www.icxr.org/' className="sm:col-span-3 md:col-span-1 -order-1 md:order-last flex items-center justify-center">
                            <Image src="/icxrorg.png" alt="ICXR Logo" width={170} height={150} />
                        </a>
                    </div>
                </div>

            </div>

            {/* Footer bottom section */}
            <div className="text-center text-zinc-400 mt-12 pt-8 border-t border-zinc-700 text-sm flex flex-col gap-2">
                <p>
                    &copy; GTXR is a student organization. Membership and club resources are accessible to Georgia Tech students only.
                </p>
                <p>
                    Website designed and developed by <Link className="hover:text-zinc-200 hover:underline" href={'https://www.alext.app/'}>Alex Thummalapalli</Link> and <Link className="hover:text-zinc-200 hover:underline" href={'https://github.com/Revlord'}>Revanth Reddy</Link>.
                </p>
            </div>
            <div className="left-0 right-0 font-sans text-center font-extrabold text-[300px] sm:text-[400px] absolute -bottom-24 w-full leading-none pointer-events-none footer-gradient-text">
                GTXR
            </div>
        </footer>
    );
};

export default Footer;
