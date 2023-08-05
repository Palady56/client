import Header from '../../components/header'


export default function FlowLayout({ children }) {
  return (
    <section className="flex h-screen w-full bg-white md:bg-slate-50 dark:bg-slate-800 md:dark:bg-slate-900 items-center justify-center md:p-5">
        <div className="max-w-3xl rounded-lg bg-white dark:bg-slate-800 md:shadow-lg w-full h-screen md:h-auto">
            <Header/>
           
            {children}
        </div>
    </section>
  )
}
