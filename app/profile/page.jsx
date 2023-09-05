'use client'
import { useState, useRef, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';


export default function Profile() {

    const [errMessage, setErrMessage] = useState('')
    const [description, setDescription] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const galleryRef = useRef(null);

    const { data: session, status, update } = useSession()

    console.log(session);

    const token = session?.user?.token

    useEffect(() => {
        fetch('/back/api/v1/user/profile', {
            method: 'GET',
            headers: {
                Authorization: token
            }
        }).then((res) => {
            if (res.status >= 500) {
                setErrMessage('Извините, сервис в данное время не доступен')
                return
            }
            return res.json()
        }).then((data) => {
            console.log(data);
            setDescription(data.description || '')
            setFirstName(data.firstName || '')
            setLastName(data.lastName || '')
            setEmail(data.email || '')
        })
    }, [token])

    const handleSubmit = () => {

    }

    const handleAvatar = () => {

    }

    return (
        <div className='grid grid-cols-1 w-full p-4 gap-4 md:max-w-4xl mx-auto'>
            <form onSubmit={handleSubmit} className='grid mt-4 gap-4'>
                <div className='grid md:flex gap-6'>

                </div>

                <input
                    ref={galleryRef}
                    type='file'
                    accept='image/jpg, image/png, image/jpeg, image/gif'
                    onChange={handleAvatar}
                    name="gallery"
                    hidden
                />
                <input
                    type='text'
                    onChange={e => setFirstName(e.target.value)}
                    name="firstName"
                    value={firstName}
                    required
                />
                <input
                    type='text'
                    onChange={e => setLastName(e.target.value)}
                    name="lastName"
                    value={lastName}
                    required
                />
                <div>{email}</div>
                <div className='w-full relative '>
                    <textarea className='bg-slate-300 w-full dark:bg-slate-700 text-black dark:text-white \
                                         py-2 px-4 pr-20 rounded-md'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Введите описание (максимальное количество символов 255)"
                        rows={5}
                    />
                    <span className='absolute right-2 text-xs top-2 z-10 p-2 rounded-md bg-slate-200 \
                                     dark:bg-slate-800 text-black dark:text-white'>
                        {description.length}/255
                    </span>
                </div>
                <input
                    type='tel'
                    onChange={e => setPhone(e.target.value)}
                    name="phone"
                    value={phone}
                    placeholder='8(XXX) XXX-XX-XX'
                    pattern='[0-9]{1}\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2} '
                />
                <button
                    type='submit'
                    className='scale-100 mt-4 w-full hover:scale-105 hover:drop-shadow-xl ease-in-out duration-300 \
                            py-3 px-4 rounded-md bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 \
                            dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 \
                            dark:to-violet-700 to-100% text-white text-lg'
                >
                    Сохранить
                </button>
            </form>

        </div>
    )
}