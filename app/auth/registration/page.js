import Image from 'next/image'

export default function Registration() {

  return (
    <div className='flex min-h-screen w-full bg-slate-50 items-center justify-center'>
      <div className='grid grid-cols-5 max-w-[1024px]'>
        <Image
        src="/images/phone.png"
        alt="Phones"
        className='col-start-1 col-end-4'
        width={800}
        height={766}
        priority
        />
        <div className='col-start-4 col-end-6 rounded-lg bg-white shadow-lg p-8'>
          <div className='flex items-center gap-2 mt-4 justify-center'>
            <Image
            src="/images/logo.svg"
            alt="Logo"
            className=''
            width={44}
            height={44}
            priority
            />
            <span className='font-bold text-xl'>Instagram</span>
          </div>
          <form className='grid mt-6 gap-4'>
            <input type="text" name="firstName" placeholder='Имя' className='bg-slate-100 rounded-md py-2 px-4 '></input>
            <input type="text" name="lastName" placeholder='Фамилия' className='bg-slate-100 rounded-md py-2 px-4 '></input>
            <input type="email" name="email" placeholder='example@gmail.com' className='bg-slate-100 rounded-md py-2 px-4 '></input>
            <input type="password" name="password" placeholder='Пароль' className='bg-slate-100 rounded-md py-2 px-4 '></input>

            <button type='submit' className='scale-100 hover:scale-105 hover:shadow-lg ease-in-out duration-300 py-3 px-4 text-lg text-white bg-gradient-to-r from-amber-500 from-0% via-orange-600 via-30% via-pink-500 via-60% to-fuchsia-700 to-100% mt-4 rounded-md py-2 px-4'>Зарегистрироваться</button>          
          </form>
        </div>
      </div>
    </div>
  )
}
