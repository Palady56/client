import Image from 'next/image'

export default function Modal({children}) {
  return (
    <div className='bg-[#0000002d] backdrop-blur-sm p-12 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center'>
        <div className='bg-white dark:bg-slate-700 p-8 m-auto rounded-lg inline'>
            <div className='flex items-center gap-2 justify-center'>
                <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    className=''
                    width={26}
                    height={26}
                    priority
                />
                <span className='font-bold text-base text-black dark:text-white'>Instagram</span>
            </div>
            <div className='mt-4 min-w-[320px]'>
                {children}
            </div>
        </div>
    </div>
  )
}
