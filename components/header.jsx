"use client";
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { UsersIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function Header({ children }) {

    const { data: session, status, update } = useSession()

    const router = useRouter()

    const avatar = session?.user?.image

    return (
        <div className='w-full fixed shadow-md top-0 left-0 right-0 z-50 bg-[#ffffffbd] dark:bg-[#1e293be0] backdrop-blur-sm flex justify-between h-16 py-1 px-4 border-b border-slate-300 dark:border-slate-700'>
            <div onClick={() => router.push("/flow")} className='flex cursor-pointer items-center gap-2'>
                <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    className=""
                    width={26}
                    height={26}
                    priority
                />
                <span className='text-sm font-bold text-black dark:text-white'>Instagram</span>
            </div>
            <Menu as="div" className="relative flex items-center">
            <span className='flex justify-center items-center mr-4 text-sm dark:text-slate-200'>{session?.user?.name}</span>
                <div>
                    <Menu.Button className="inline-flex w-full justify-center items-center rounded-full bg-violet-700 p-1 hover:bg-opacity-50">
                        {
                            avatar ?
                                <Image src={avatar} unoptimized alt="Avatar" className='w-11 h-11 rounded-full object-center object-cover bg-slate-400 dark:bg-slate-700' width={32} height={32} />
                            :
                                <UserCircleIcon className="h-11 w-11 text-white" />
                        }
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 top-[65px] w-56 origin-top-right divide-y divide-slate-100 dark:divide-slate-600 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => router.push('/profile') }
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-slate-900 dark:text-slate-200'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <ProfileActiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <ProfileInActiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Профиль
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => signOut()}
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900 dark:text-slate-200'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <LogoutActiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <LogoutInActiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Выйти
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

function ProfileActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function ProfileInActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>

    )
}

function LogoutActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function LogoutInActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}