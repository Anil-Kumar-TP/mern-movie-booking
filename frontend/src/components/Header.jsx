"use client"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux'; // Import useSelector from 'react-redux'
import React from 'react'

const navLinks = [
    {
        href: '/',
        label: "Home"
    },
    {
        href: '/signup',
        label: 'SignUp'
    },
    {
        href: '/signin',
        label: 'SignIn'
    }
];

export default function Header () {
    const pathname = usePathname();
    const { currentUser } = useSelector((state) => state.user); // Get the current user from the Redux store
    return (
        <header className='flex justify-between items-center py-4 px-7 border-b'>
            <Link href='/'>
                <Image
                    src='https://bytegrad.com/course-assets/youtube/example-logo.png'
                    alt='Logo'
                    className='w-[35px] h-[35px]'
                    width='35'
                    height='35'
                />
            </Link>
            <nav>
                <ul className='flex gap-x-5 text-[14px]'>
                    {navLinks.map((link) => {
                        // Conditionally render the SignIn link based on authentication status
                        if (link.href === '/signin' && !currentUser) {
                            return null; // Don't render SignIn link if there is no user
                        }
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`${pathname === link.href ? 'text-zinc-900' : 'text-zinc-400'}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}
