'use client'
import { useState, useRef, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { UserIcon, PhoneIcon, MapPinIcon, ArrowPathIcon, InformationCircleIcon } from '@heroicons/react/24/outline';


export default function Profile() {

    const [loading, setLoading] = useState(true)
    const [succesful, setSuccesful] = useState(false)

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
    const [errDescription, setErrDescription] = useState('')
    const [errMessage, setErrMessage] = useState('')

    const galleryRef = useRef(null);

    const { data: session, status, update } = useSession()

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
            let phone = data.phone || null
            if (phone) {
                phone = phone.replace("+3", "") // 89234341212
                let arr = phone.split('')
                arr.splice(1, 0, "(") // 8(9234341212
                arr.splice(5, 0, ") ") // 8(923) 4341212
                arr.splice(9, 0, "-") // 8(923) 434-1212
                arr.splice(12, 0, "-") // 8(923) 434-12-12
                phone = arr.join('')
                console.log(phone);
            }
            setPhone(phone || null)
            setLatitude(data.latitude || null)
            setLongitude(data.longitude || null)
            setCommercial(data.commercial)
            setAvatar(data.avatar)
            setLoading(false)
        })
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
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
        setLoading(false)

        if (res.status >= 500) {
            setErrMessage('Извините, сервис недоступен. Повторите попытку позже...')
            return
        }

        const data = await res.json()

        console.log(data);

        if (res.status === 400) {
            const { errors } = data
            console.log(errors);
            errors.forEach(err => {
                switch (err.path) {
                    case "firstName":
                        setErrFirstName(err.msg)
                        break;
                    case "lastName":
                        setErrLastName(err.msg)
                        break;
                    case "description":
                        setErrDescription(err.msg)
                        break;
                    case "phone":
                        setErrPhone(err.msg)
                        break;
                    case "latitude":
                        setErrLatitude(err.msg)
                        break;
                    case "longitude":
                        setErrLongitude(err.msg)
                        break;
                    default:
                        setErrMessage('Ошибка не существующего поля')
                        break;
                }
            });
            setLoading(false)
            return
        }

        if (res.status === 200) {
            setLoading(false)
            setSuccesful(true)
            setTimeout(() => {setSuccesful(false)}, 3000)
            return
        }

    }

    const handleAvatar = async (e) => {
        setAvatar(e.target.files[0])

        let formdata = new FormData();
        formdata.append("avatar", e.target.files[0]);
        await fetch('/back/api/v1/user/avatar', {
            method: "DELETE",
            headers: {
                Authorization: token
            }
        })
        await fetch('/back/api/v1/user/avatar', {
            method: "POST",
            headers: {
                Authorization: token
            },
            body: formdata,
        })
        session.user.image = URL.createObjectURL(e.target.files[0])
        update()
    }


    return (
        <>
            {status === "loading" ?
                <div className='bg-[#0000003d] backdrop-blur-sm z-[110] p-12 absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                    <span className='p-6 rounded-md bg-white'>
                        <ArrowPathIcon className='h-10 w-10 animate-spin' />
                    </span>

                </div>
                :
                ''
            }
            {/* Создать в компоненте */}
            {succesful ?
                <div className='bg-green-300 border-2 border-green-500 z-[1000] rounded-md absolute top-[80px] right-[40px] flex justify-center items-center'>
                    <InformationCircleIcon className='ml-2 h-6 w-6 text-black'/>
                    <span className='p-6'>
                        Данные сохранены!
                    </span>
                </div> 
                : ''}
            <div className='grid grid-cols-1 w-full p-4 gap-4 md:max-w-4xl mx-auto'>
                <div
                    className='flex justify-center items-center p-6 border border-dashed border-slate-500 bg-slate-200 min-h-[178px] dark:bg-slate-700 dark:border-slate-400'
                    onClick={() => { galleryRef.current.click() }}
                >
                    {avatar ? <img
                        className='h-32 w-32 rounded-full object-cover object-center border-2 border-slate-500 dark:border-slate-400'
                        src={typeof avatar === "string" ? avatar : URL.createObjectURL(avatar)} />
                        :
                        <span className='border dark:text-white border-black bg-slate-300 dark:bg-slate-500 dark:border-slate-200 flex items-center justify-center bg-slate-200 p-6 cursor-pointer'>Добавьте фото</span>
                        // <UserPlusIcon className='h-32 w-32 rounded-full object-cover object-center' />
                    }
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
                    <div className='flex items-center gap-6'>
                        <UserIcon className='h-14 w-14 dark:text-slate-400' />
                        <div className='relative w-full'>
                            <input
                                className={`${errFirstName ? 'border-red-500' : 'border-transparent'} border bg-slate-100 md:bg-white dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                                type='text'
                                onChange={(e) => { setFirstName(e.target.value); setErrFirstName('') }}
                                name="firstName"
                                value={firstName}
                                required
                            />
                            {errFirstName && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errFirstName}</div>}
                        </div>
                        <div className='relative w-full'>
                            <input
                                className={`${errLastName ? 'border-red-500' : 'border-transparent'} border bg-slate-100 md:bg-white dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                                type='text'
                                onChange={(e) => { setLastName(e.target.value); setErrLastName('') }}
                                name="lastName"
                                value={lastName}
                                required
                            />
                            {errLastName && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errLastName}</div>}
                        </div>
                    </div>

                    <hr className='text-black mt-2 dark:border-slate-700' />
                    <span className='text-black mt-2 dark:text-slate-400'>Краткое описание:</span>
                    <div className='w-full relative '>
                        <textarea className='bg-slate-300 w-full dark:bg-slate-700 text-black dark:text-white \
                                         py-2 px-4 pr-20 rounded-md'
                            value={description}
                            onChange={(e) => {setDescription(e.target.value.slice(0, 255)); setErrDescription('')}}
                            placeholder="Введите описание (максимальное количество символов 255)"
                            rows={5}
                        />
                        <span className='absolute right-2 text-xs top-2 z-10 p-2 rounded-md bg-slate-200 \
                                     dark:bg-slate-800 text-black dark:text-white'>
                            {description.length}/255
                        </span>
                    </div>
                    <div className='flex items-center gap-6'>
                        <PhoneIcon className='h-6 w-6 dark:text-slate-400' />
                        <div className='relative w-full'>
                            <input
                                className={`${errPhone ? 'border-red-500' : 'border-transparent'} border bg-slate-100 md:bg-white dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                                type='tel'
                                onChange={(e) => { setPhone(e.target.value || null); setErrPhone('') }}
                                name="phone"
                                value={phone}
                                placeholder='8(XXX) XXX-XX-XX'
                                pattern='[0-9]{1}\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}'
                            />
                            {errPhone && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errPhone}</div>}
                        </div>
                    </div>

                    <div className='flex items-center gap-6'>
                        <MapPinIcon className='h-12 w-12 dark:text-slate-400' />
                        <div className='relative w-full'>
                            <input
                                className={`${errLatitude ? 'border-red-500' : 'border-transparent'} border bg-slate-100 md:bg-white dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                                type='number'
                                onChange={(e) => { setLatitude(e.target.value || null); setErrLatitude('') }}
                                name="latitude"
                                value={latitude}
                                min="-90.00000"
                                max="90.00000"
                                step="0.00001"
                                placeholder='latitude'
                            />
                            {errLatitude && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errLatitude}</div>}
                        </div>
                        <div className='relative w-full'>
                            <input
                                className={`${errLongitude ? 'border-red-500' : 'border-transparent'} border bg-slate-100 md:bg-white dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                                type='number'
                                onChange={(e) => { setLongitude(e.target.value || null); setErrLongitude('') }}
                                name="longitude"
                                value={longitude}
                                min="-180.00000"
                                max="180.00000"
                                step="0.00001"
                                placeholder='longitude'
                            />
                            {errLongitude && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errLongitude}</div>}
                        </div>
                    </div>



                    <label className="flex items-center gap-2 dark:text-white">
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
        </>

    )
}