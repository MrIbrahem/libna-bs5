import { Info } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container-fluid">
        <h1 className="navbar-brand h4 mb-0">حساب مساحة المثلثات (لبنة)</h1>
        <div className="d-flex align-items-center">
          <ThemeToggle />
          <button className="btn btn-link p-0 ms-2">
            <Info className="text-primary" size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

