import Image from 'next/image'
import Link from 'next/link'

export default function Registration() {


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
            <form className='grid mt-6 gap-4'>
              <input type="email" name="email" placeholder='Электронная почта' className='bg-slate-100 dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4 '></input>
              <input type="password" name="password" placeholder='Пароль' className='bg-slate-100 dark:bg-slate-700 text-black dark:text-white rounded-md py-2 px-4 '></input>

              <button type='submit' className='scale-100 hover:scale-105 hover:shadow-lg ease-in-out/
              duration-300 py-3 px-4 text-lg text-white dark:from-purple-500 dark:from-0% /
              dark:via-cyan-600 dark:via-30% dark:via-blue-500 dark:via-60% dark:to-violet-700 dark:to-100% bg-gradient-to-r /
              from-amber-500 from-0% via-orange-600 via-30% via-pink-500 via-60% to-fuchsia-700 to-100% mt-4 rounded-md py-2 px-4'>Войти</button>          
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
