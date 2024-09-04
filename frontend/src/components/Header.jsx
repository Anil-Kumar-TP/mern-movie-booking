"use client"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { signoutUserFailure, signoutUserSuccess, signoutUserStart } from '../redux/user/userSlice';

export default function Header () {
    const pathname = usePathname();
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            dispatch(signoutUserStart());
            const res = await fetch('http://localhost:5001/api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signoutUserFailure(data.message));
                return;
            }
            dispatch(signoutUserSuccess()); 
        } catch (error) {
            dispatch(signoutUserFailure(error.message));
        }
    };

    const navLinks = [
        {
            href: '/',
            label: "Home"
        }
    ];

    if (!currentUser) {
        navLinks.push(
            {
                href: '/signup',
                label: 'SignUp'
            },
            {
                href: '/signin',
                label: 'SignIn'
            }
        );
    } else {
        navLinks.push(
            {
                href: '#',
                label: 'SignOut',
                onClick: handleSignOut
            },
            {
                href: '/profile',
                label: 'Profile'
            }
        );
    }

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
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`${pathname === link.href ? 'text-zinc-900' : 'text-zinc-400'}`}
                                onClick={link.onClick} 
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
