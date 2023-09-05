import Header from "../../components/header"

export default function ProfileLayout({ children }) {
    return (
        <div className="w-full mt-16">
            <Header/>
            {children}
        </div>
    )
}