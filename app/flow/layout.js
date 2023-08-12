import Header from '../../components/header'


export default function FlowLayout({ children }) {
  return (
    <section className="flex w-full items-center justify-center md:p-5">
        <div className="max-w-3xl rounded-lg bg-white dark:bg-slate-800 md:shadow-lg w-full h-screen md:h-auto">
            <Header/>
            {children}
        </div>
    </section>
  )
}
