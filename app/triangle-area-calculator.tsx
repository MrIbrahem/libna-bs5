"use client"

import { useState } from "react"
import { TriangleDrawing } from "./components/triangle-drawing"
import Link from "next/link"
import { Info, Github, Instagram, Twitter, Facebook } from "lucide-react"

const LEBNA_CONVERSION = 44.44 // 1 لبنة = 44.44 m²

export default function TriangleAreaCalculator() {
  const [sides, setSides] = useState({ side1: "", side2: "", base: "" })
  const [displaySides, setDisplaySides] = useState({ side1: 0, side2: 0, base: 0 })
  const [area, setArea] = useState(0)
  const [totalArea, setTotalArea] = useState(0)
  const [activeTab, setActiveTab] = useState("main")
  const [records, setRecords] = useState<Array<{ side1: number; side2: number; base: number; area: number }>>([])

  const calculateArea = () => {
    const a = Number(sides.side1)
    const b = Number(sides.side2)
    const c = Number(sides.base)
    // Validate triangle inequality theorem
    if (a + b <= c || b + c <= a || a + c <= b) {
      alert("الأطوال المدخلة لا تشكل مثلثاً صحيحاً")
      return
    }
    const s = (a + b + c) / 2
    const areaValue = Math.sqrt(s * (s - a) * (s - b) * (s - c))

    setDisplaySides({ side1: a, side2: b, base: c })
    setArea(isNaN(areaValue) ? 0 : areaValue)
    setRecords((prevRecords) => [...prevRecords, { side1: a, side2: b, base: c, area: areaValue }])
  }

  const handleAddToTotal = () => {
    setTotalArea(totalArea + area)
    setSides({ side1: "", side2: "", base: "" })
    // clear area value
    setArea(0)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("تم النسخ بنجاح")
    })
  }

  const convertToLebna = (meters: number) => {
    return (meters / LEBNA_CONVERSION).toFixed(6)
  }

  return (
    <div className="min-vh-100 bg-light" dir="rtl">
      <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
        <h1 className="h4 mb-0">حساب مساحة المثلثات</h1>
        <button className="btn btn-link p-0">
          <Info className="text-primary" size={20} />
        </button>
      </header>

      <main className="container py-4" style={{ maxWidth: "540px" }}>
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "main" ? "active" : ""}`} onClick={() => setActiveTab("main")}>
              الرئيسية
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "record" ? "active" : ""}`}
              onClick={() => setActiveTab("record")}
            >
              السجل
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              عن التطبيق
            </button>
          </li>
        </ul>

        {activeTab === "main" && (
          <div>
            <TriangleDrawing side1={displaySides.side1} side2={displaySides.side2} base={displaySides.base} />

            <div className="row g-2 mb-3">
              <div className="col-4">
                <input
                  type="number"
                  className="form-control text-center"
                  placeholder="الضلع 1 (يمين)"
                  value={sides.side1}
                  onChange={(e) => setSides({ ...sides, side1: e.target.value })}
                />
              </div>
              <div className="col-4">
                <input
                  type="number"
                  className="form-control text-center"
                  placeholder="الضلع 2 (يسار)"
                  value={sides.side2}
                  onChange={(e) => setSides({ ...sides, side2: e.target.value })}
                />
              </div>
              <div className="col-4">
                <input
                  type="number"
                  className="form-control text-center"
                  placeholder="الوتر (قاعدة)"
                  value={sides.base}
                  onChange={(e) => setSides({ ...sides, base: e.target.value })}
                />
              </div>
            </div>

            <div className="row g-2 mb-4">
              <div className="col-6">
                <button className="btn btn-primary w-100" onClick={calculateArea}>
                  حساب
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-secondary w-100" onClick={handleAddToTotal}>
                  أضف للإجمالي
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded mb-2">
                <span>متر مربع</span>
                <div className="d-flex align-items-center">
                  <div className="bg-light p-2 rounded me-2" style={{ width: "120px", textAlign: "left" }}>
                    {area.toFixed(2)}
                  </div>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => copyToClipboard(area.toFixed(2))}>
                    نسخ
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded">
                <span>لبنة</span>
                <div className="d-flex align-items-center">
                  <div className="bg-light p-2 rounded me-2" style={{ width: "120px", textAlign: "left" }}>
                    {convertToLebna(area)}
                  </div>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => copyToClipboard(convertToLebna(area))}
                  >
                    نسخ
                  </button>
                </div>
              </div>
            </div>

            <h2 className="h5 mb-3">إجمالي مساحة المثلثات:</h2>

            <div className="mb-2">
              <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded mb-2">
                <span>متر مربع</span>
                <div className="d-flex align-items-center">
                  <div className="bg-light p-2 rounded me-2" style={{ width: "120px", textAlign: "left" }}>
                    {totalArea.toFixed(2)}
                  </div>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => copyToClipboard(totalArea.toFixed(2))}
                  >
                    نسخ
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded">
                <span>لبنة</span>
                <div className="d-flex align-items-center">
                  <div className="bg-light p-2 rounded me-2" style={{ width: "120px", textAlign: "left" }}>
                    {convertToLebna(totalArea)}
                  </div>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => copyToClipboard(convertToLebna(totalArea))}
                  >
                    نسخ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="card">
            <ul className="table-view" style={{ textAlign: "right" }}>
              <li className="table-view-cell">
                تم عمل هذا التطبيق للمساعدة في حساب مساحات الأراضي عبر تقسيمها لعدة مثلثات
              </li>
              <li className="table-view-cell">
                يوفر التطبيق إمكانية جمع مثلثات قطعة الأرض كاملة دون الحاجة لتدوين مساحة المثلثات في ورقة أو عبر وسيلة
                أخرى
              </li>
              <li className="table-view-cell">يمكن حساب عدد لا محدود من المثلثات عبر التطبيق</li>
              <li className="table-view-cell">
                يوفر التطبيق الناتج بالمتر المربع وباللبنة العشاري التي تساوي 44.44 متر مربع.
              </li>
            </ul>
          </div>
        )}
        {activeTab === "record" && (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">سجل المساحات</h5>
            </div>
            <div className="card-body">
              <div style={{ padding: "5px 30px 5px 5px" }}>
                <table id="allrows" className="table table-striped" style={{ width: "97%" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>الضلع 1 (يمين)</th>
                      <th>الضلع 2 (يسار)</th>
                      <th>الوتر</th>
                      <th>المساحة (م2)</th>
                      <th>المساحة (لبنة)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{record.side1}</td>
                        <td>{record.side2}</td>
                        <td>{record.base}</td>
                        <td>{record.area.toFixed(2)}</td>
                        <td>{convertToLebna(record.area)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

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
    </div>
  )
}

