
import { Info } from "lucide-react"

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-white mb-4">
            <div className="container-fluid">
                <h1 className="navbar-brand h4 mb-0">حساب مساحة المثلثات (لبنة)</h1>

                <div className="collapse navbar-collapse" id="navbarNav">
                </div>
                <div className="d-flex align-items-center">
                    <button className="theme-toggle btn" aria-label="Toggle theme">
                        <i className="bi bi-moon-stars-fill"></i>
                    </button>
                    <button className="btn btn-link p-0">
                        <Info className="text-primary" size={20} />
                    </button>
                </div>
            </div>
        </nav>
    )
}
