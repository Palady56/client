import Header from "../../components/header"
import Footer from "../../components/footer"

export default function FlowLayout({ children }) {
  return (
    <div className="w-full min-h-screen mt-16">
      <Header />
      {children}
      <Footer />
    </div>
  )
}