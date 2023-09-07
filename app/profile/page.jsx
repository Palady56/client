'use client'
import { useState, useRef, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { GFS_Didot } from 'next/font/google';
import { getFontDefinitionFromManifest } from 'next/dist/server/font-utils';
import { UserPlusIcon } from '@heroicons/react/20/solid'


export default function Profile() {

    const [errMessage, setErrMessage] = useState('')
    const [description, setDescription] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [commercial, setCommercial] = useState(false)
    const [avatar, setAvatar] = useState('')

    const [errFirstName, setErrFirstName] = useState('')
    const [errLastName, setErrLastName] = useState('')
    const [errPhone, setErrPhone] = useState('')
    const [errLatitude, setErrLatitude] = useState('')
    const [errLongitude, setErrLongitude] = useState('')

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
            let phone = data.phone
            if (phone) {
                phone = phone.replace("+3", "") //89234341212
                let arr = phone.split('')
                arr.splice(1, 0, "(") //8(9234341212
                arr.splice(5, 0, ") ") //8(923) 4341212
                arr.splice(9, 0, "-") //8(923) 434-1212
                arr.splice(12, 0, "-") //8(923) 434-12-12
                phone = arr.join('')
                console.log(phone);
            }
            setPhone(phone || null)
            setLatitude(data.latitude || null)
            setLongitude(data.longitude || null)
            setCommercial(data.commercial)
            setAvatar(data.avatar)
        })
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let temp = phone
        if (temp) {
            temp = temp.replace('(', '')
            temp = temp.replace(') ', '')
            temp = temp.replace('-', '')
            temp = temp.replace('-', '')
            temp = '+3' + temp
        }
        const res = await fetch('/back/api/v1/user/update', {
            method: 'POST',
            headers: {
                "Authorization": token,
                "Content-type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                description,
                phone: temp,
                latitude,
                longitude,
                commercial
            }),
        })

        if (res.status >= 500) {
            setErrMessage('Извините, сервис недоступен. Повторите попытку позже...')
            return
        }

        const data = await res.json()

        console.log(data);

        // if (res.status >= 400) {
        //     const { errors } = data
        //     console.log(errors);
        //     errors.forEach( err => {
        //       switch (err.path) {
        //         case "firstName":
        //           setErrFirstName(err.msg)
        //           break;
        //         case "lastName":
        //           setErrLastName(err.msg)
        //           break;
        //         case "description":
        //           setErrDescription(err.msg)
        //           break;
        //         case "phone":
        //           setErrPhone(err.msg)
        //           break;
        //         case "latitude":
        //           setErrLatitude(err.msg)
        //           break;
        //         case "longitude":
        //           setErrLongitude(err.msg)
        //           break;
        //         default:
        //           setErrMessage('Ошибка не существующего поля')
        //           break;
        //       }
        //     });
        //     setLoading(false)
        //     return
        //   }

    }

    const handleAvatar = async (e) => {
        e.preventDefault()
        setAvatar(e.target.files[0])
        let formdata = new FormData()
        formdata.append("avatar", e.target.files[0])

        const res1 = await fetch("/back/api/v1/user/avatar", {
            method: 'DELETE',
            headers: {
                Authorization: token,
            }
        })

        const res2 = await fetch("/back/api/v1/user/avatar", {
            method: 'POST',
            headers: {
                Authorization: token,
            },
            body: formdata
        })

        if (res2.status >= 500) {
                    setErrMessage('Извините, сервис недоступен. Повторите попытку позже...')
                    return
                }

        const data = await res2.json()

        console.log(data);
    }

    return (
        <div className='grid grid-cols-1 w-full p-4 gap-4 md:max-w-4xl mx-auto'>
            <div
                className='flex justify-center items-center p-6 border'
                onClick={() => { galleryRef.current.click() }}
            >
                {avatar ? <img 
                            className='h-32 w-32 rounded-full object-cover object-center' 
                            src={typeof avatar === "string" ? avatar : URL.createObjectURL(avatar)} /> 
                        : 
                            <UserPlusIcon className='h-32 w-32 rounded-full object-cover object-center' />}


            </div>

            <input
                ref={galleryRef}
                type='file'
                accept='image/jpg, image/png, image/jpeg, image/gif'
                onChange={handleAvatar}
                name="avatar"
                hidden
            />
            <form onSubmit={handleSubmit} className='grid mt-4 gap-4'>
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
                    onChange={e => setPhone(e.target.value || null)}
                    name="phone"
                    value={phone}
                    placeholder='8(XXX) XXX-XX-XX'
                    pattern='[0-9]{1}\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}'
                />
                <input
                    type='number'
                    onChange={e => setLatitude(e.target.value || null)}
                    name="latitude"
                    value={latitude}
                    min="-90.00000"
                    max="90.00000"
                    step="0.00001"
                    placeholder='latitude'
                />
                <input
                    type='number'
                    onChange={e => setLongitude(e.target.value || null)}
                    name="longitude"
                    value={longitude}
                    min="-180.00000"
                    max="180.00000"
                    step="0.00001"
                    placeholder='longitude'
                />
                <label className="flex items-center gap-2">
                    Коммерческий аккаунт
                    <input type='checkbox' name='commercial' checked={commercial} onChange={e => setCommercial(e.target.checked)} />
                </label>
                <button
                    onChange={handleSubmit}
                    type='submit'
                    className='scale-100 mt-4 w-full hover:scale-105 hover:drop-shadow-xl ease-in-out duration-300 \
                            py-3 px-4 rounded-md bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 \
                            dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 \
                            dark:to-violet-700 to-100% text-white text-lg'
                >
                    Сохранить изменения
                </button>
            </form>

        </div>
    )
}