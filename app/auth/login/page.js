"use client";
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react'

export default function Login() {

  const [errMessage, setErrMessage] = useState('')

  const [errEmail, setErrEmail] = useState('')
  const [errPassword, setErrPassword] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlerGoogle = async (e) => {
    e.preventDefault()

    const res = await signIn('google', {
      redirect: true,
      callbackUrl: 'https://instagram.lern.dev/flow'
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: 'https://instagram.lern.dev/flow'
    });

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

    console.log('---------------------------[');
    console.log(res);
    console.log('---------------------------[');
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
            <form className='grid mt-6 gap-6' onSubmit={handleSubmit}>
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

              <button type='submit' onClick={handleSubmit} className='scale-100 w-full flex justify-center items-center hover:scale-105 hover:shadow-lg ease-in-out/
                duration-300 py-3 px-4 text-lg text-white dark:from-purple-500 dark:from-0% /
                dark:via-cyan-600 dark:via-30% dark:via-blue-500 dark:via-60% dark:to-violet-700 dark:to-100% bg-gradient-to-r /
                from-amber-500 from-0% via-orange-600 via-30% via-pink-500 via-60% to-fuchsia-700 to-100% mt-4 rounded-md py-2 px-4'>{loading ? <ArrowPathIcon className='h-6 w-6 animate-spin' /> : 'Войти'}</button>
            </form>
            <div className='flex justify-center mt-6 w-full border-b-2 border-slate-300 dark:border-indigo-500'>
              <span className='bg-white text-black dark:text-white dark:bg-slate-800 p-2 -mb-[20px]'>OR</span>
            </div>
            <button onClick={handlerGoogle} type='submit' className='flex w-full hover:animate-pulse px-2 py-3 rounded-md justify-center items-center gap-2 mt-8 border border-blue-500 text-blue-500'>
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
              <Link href='/auth/changepassword' className='flex text-base mt-4 text-blue-500 italic underline decoration-solid'>Забыли пароль?</Link>
            </div>
            <div className='mx-auto mt-6 border-b-2 mt-4 border-slate-300 dark:border-indigo-500 max-w-[70px]'></div>
            <Link href='/auth/registration' className='flex justify-center text-base mt-4 text-blue-500 italic underline decoration-solid'>Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
