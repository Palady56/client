"use client";
import Image from 'next/image'
import Link from 'next/link'
import Modal from '../../../components/modal'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { data } from 'autoprefixer';

export default function Registration() {

  const [showModal, setShowModal] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errFirstName, setErrFirstName] = useState('')
  const [errLastName, setErrLastName] = useState('')
  const [errEmail, setErrEmail] = useState('')
  const [errPassword, setErrPassword] = useState('')

  const [errMessage, setErrMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const closeModal = () => {
    setShowModal(false)
    router.push('/auth/login')
  }

  const handlerModalButton = () => {
    setShowModal(false)
    router.push('/auth/login')
  }

  const handlerRegistration = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/back/api/v1/register', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })

    if (res.status >= 500) {
      setErrMessage('Извините, сервис недоступен. Повторите попытку позже...')
      setLoading(false)
      return
    }

    const data = await res.json() 

    if (res.status === 400) {
      const { errors } = data
      console.log(errors);
      errors.forEach( err => {
        switch (err.path) {
          case "firstName":
            setErrFirstName(err.msg)
            break;
          case "lastName":
            setErrLastName(err.msg)
            break;
          case "email":
            setErrEmail(err.msg)
            break;
          case "password":
            setErrPassword(err.msg)
            break;
          default:
            setErrMessage('Ошибка не существующего поля')
            break;
        }
      });
      setLoading(false)
      return
    }

    if (res.status === 409 || res.status === 418) {
      const { message } = data
      setErrMessage(message)
      setLoading(false)
      return
    }

    if (res.status === 200) {
      setLoading(false)
      setShowModal(true)
      return
    }
  }

  return (
    <div className='flex h-screen w-full bg-white md:bg-slate-50 dark:bg-slate-800 md:dark:bg-slate-900 items-center justify-center md:p-5'>
      <div className='grid grid-cols-1 lg:grid-cols-5 w-full max-w-[420px] lg:max-w-[1024px]'>
        <Image
          src="/images/phone.png"
          alt="Phones"
          className='col-start-1 col-end-4 hidden lg:block'
          width={800}
          height={766}
          priority
        />
        <div className='lg:col-start-4 lg:col-end-6'>
          <div className='w-full relative rounded-lg bg-white md:shadow-lg px-10 py-12 dark:bg-slate-800'>
            {errMessage && <div className='absolute text-red-500 right-8 left-8 rounded-md p-2 text-[10px] border border-red-500 border-dashed animate:pulse top-[20px]'>{errMessage}</div>}
            <div className='flex items-center gap-2 justify-center mt-4'>
              <Image
                src="/images/logo.svg"
                alt="Logo"
                className=''
                width={44}
                height={44}
                priority
              />
              <span className='font-bold text-xl text-black dark:text-white'>Instagram</span>
            </div>
            <form className='grid mt-6 gap-6' onSubmit={handlerRegistration}>
              <div className='relative w-full'>
                <input
                  onChange={(e) => { setFirstName(e.target.value); setErrFirstName(''); setErrMessage('') }}
                  value={firstName}
                  required
                  type="text"
                  name="firstName"
                  placeholder='Имя'
                  className={`${errFirstName ? 'border-red-500' : 'border-transparent '}border bg-slate-100 w-full dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4`} />
                {errFirstName && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errFirstName}</div>}
              </div>
              <div className='relative w-full'>
                <input
                  onChange={(e) => { setLastName(e.target.value); setErrLastName(''); setErrMessage('') }}
                  value={lastName}
                  required
                  type="text"
                  name="lastName"
                  placeholder='Фамилия'
                  className={`${errLastName ? 'border-red-500' : 'border-transparent '}border bg-slate-100 w-full dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4`} />
                {errLastName && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errLastName}</div>}
              </div>
              <div className='relative w-full'>
                <input
                  onChange={(e) => { setEmail(e.target.value); setErrEmail(''); setErrMessage('') }}
                  value={email}
                  required
                  type="email"
                  name="email"
                  placeholder='example@gmail.com'
                  className={`${errEmail ? 'border-red-500' : 'border-transparent '}border bg-slate-100 w-full dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4`} />
                {errEmail && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errEmail}</div>}
              </div>
              <div className='relative w-full'>
                <input
                  onChange={(e) => { setPassword(e.target.value); setErrPassword(''); setErrMessage('') }}
                  value={password}
                  required
                  type="password"
                  name="password"
                  placeholder='Пароль'
                  className={`${errPassword ? 'border-red-500' : 'border-transparent '}border bg-slate-100 w-full dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4`} />
                {errPassword && <div className='absolute text-red-500 text-[10px] -top-[16px]'>{errPassword}</div>}
              </div>

              <button type='submit' onClick={handlerRegistration} className='scale-100 w-full flex justify-center items-center hover:scale-105 hover:shadow-lg ease-in-out/
                duration-300 py-3 px-4 text-lg text-white dark:from-purple-500 dark:from-0% /
                dark:via-cyan-600 dark:via-30% dark:via-blue-500 dark:via-60% dark:to-violet-700 dark:to-100% bg-gradient-to-r /
                from-amber-500 from-0% via-orange-600 via-30% via-pink-500 via-60% to-fuchsia-700 to-100% mt-4 rounded-md py-2 px-4'>{loading ? <ArrowPathIcon className='h-6 w-6 animate-spin'/> :'Зарегистрироваться'}</button>
            </form>
            <div className='flex justify-center mt-6 w-full border-b-2 border-slate-300 dark:border-indigo-500'>
              <span className='bg-white text-black dark:text-white dark:bg-slate-800 p-2 -mb-[20px]'>OR</span>
            </div>
            <button type='submit' className='flex w-full hover:animate-pulse px-2 py-3 rounded-md justify-center items-center gap-2 mt-8 border border-blue-500 text-blue-500'>
              <Image
                src="/images/google.svg"
                alt="google"
                className=''
                width={24}
                height={24}
                priority
              />Войти через Google
            </button>
            <div className='flex justify-center'>
              <Link href='/auth/login' className='flex justify-center text-base mt-4 text-blue-500 italic underline decoration-solid'>Есть аккаунт? Войти</Link>
            </div>
          </div>
        </div>
      </div>
      {
        showModal ?
          <Modal onClose={closeModal}>
            <div className='text-center'>
              <h2 className='font-bold text-black dark:text-white'>Подтверждение регистрации</h2>
              <p className='mt-2 text-slate-500 dark:text-slate-300 text-sm'>
                На вашу почту было отправлено письмо с подтверждением о регистрации учетной записи.<br />
                Перейдите по ссылке указанной в письме.
              </p>
              <button type='button' onClick={handlerModalButton} className='py-2 px-4 bg-green-500 rounded-md text-white hover:animate-pulse mt-4'>Ok</button>
            </div>
          </Modal>
          :
          ''
      }
    </div >
  )
}