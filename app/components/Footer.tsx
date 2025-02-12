import Link from "next/link"
import { Github, Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-light py-4 text-center mt-auto">
      <div className="d-flex justify-content-center gap-3 mb-2">
        <Link href="https://github.com/MrIbrahem" target="_blank" rel="noopener noreferrer" className="text-dark">
          <Github size={20} />
          <span className="visually-hidden">GitHub</span>
        </Link>
        <Link
          href="https://www.instagram.com/ibrahem.al.radaei"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
        >
          <Instagram size={20} />
          <span className="visually-hidden">Instagram</span>
        </Link>
        <Link href="https://twitter.com/MrIbrahem" target="_blank" rel="noopener noreferrer" className="text-dark">
          <Twitter size={20} />
          <span className="visually-hidden">Twitter</span>
        </Link>
        <Link
          href="https://www.facebook.com/Mr.Ibrahem"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
        >
          <Facebook size={20} />
          <span className="visually-hidden">Facebook</span>
        </Link>
      </div>
      <p className="small mb-0">م/إبراهيم الرداعي - 770633517</p>
    </footer>
  )
}

