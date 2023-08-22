"use client";
import Image from 'next/image'
import Link from 'next/link'
import Modal from '../../../components/modal'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

  const router = useRouter()

  const closeModal = () => {
    setShowModal(false)
    router.push('/auth/login')
    redirect('/auth/login')
  }

  const handlerModalButton = () => {
    setShowModal(false)
    router.push('/auth/login')
    redirect('/auth/login')
  }

  const handlerRegistration = (e) => {
    e.preventDeafult()
    // setShowModal(true)
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
          <div className='w-full rounded-lg bg-white md:shadow-lg px-10 py-12 dark:bg-slate-800'>
            <div className='flex items-center gap-2 justify-center '>
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
              <div>
                <input
                  onChange={(e) => { setFirstName(e.target.value) }}
                  value={firstName}
                  required
                  type="text"
                  name="firstName"
                  placeholder='Имя'
                  className='bg-slate-100 w-full dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4'/>
                  {errFirstName && <div className='absolute text-sm text-red-500 text-[10px] -top-[16px]'>Длина не должна превышать 30 символов</div>}
              </div>
              <input
                onChange={(e) => { setLastName(e.target.value) }}
                value={lastName}
                required
                type="text"
                name="lastName"
                placeholder='Фамилия'
                className='bg-slate-100 dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4 '></input>
              <input
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
                required
                type="email"
                name="email"
                placeholder='example@gmail.com'
                className='bg-slate-100 dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4 '></input>
              <input
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
                required
                type="password"
                name="password"
                placeholder='Пароль'
                className='bg-slate-100 dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4 '></input>

              <button type='submit' onClick={handlerRegistration} className='scale-100 w-full hover:scale-105 hover:shadow-lg ease-in-out/
                duration-300 py-3 px-4 text-lg text-white dark:from-purple-500 dark:from-0% /
                dark:via-cyan-600 dark:via-30% dark:via-blue-500 dark:via-60% dark:to-violet-700 dark:to-100% bg-gradient-to-r /
                from-amber-500 from-0% via-orange-600 via-30% via-pink-500 via-60% to-fuchsia-700 to-100% mt-4 rounded-md py-2 px-4'>Зарегистрироваться</button>
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