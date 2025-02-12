"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import MainTab from "./components/MainTab"
import RecordTab from "./components/RecordTab"
import AboutTab from "./components/AboutTab"
import Footer from "./components/Footer"

const LEBNA_CONVERSION = 44.44 // 1 لبنة = 44.44 m²

export default function TriangleAreaCalculator() {
  const [activeTab, setActiveTab] = useState("main")
  const [totalArea, setTotalArea] = useState(0)
  const [records, setRecords] = useState<Array<{ side1: number; side2: number; base: number; area: number }>>([])

  const addToTotalArea = (area: number) => {
    setTotalArea((prevTotal) => prevTotal + area)
  }

  const addRecord = (record: { side1: number; side2: number; base: number; area: number }) => {
    setRecords((prevRecords) => [...prevRecords, record])
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
          <MainTab
            addToTotalArea={addToTotalArea}
            addRecord={addRecord}
            totalArea={totalArea}
            convertToLebna={convertToLebna}
          />
        )}
        {activeTab === "record" && <RecordTab records={records} convertToLebna={convertToLebna} />}
        {activeTab === "about" && <AboutTab />}
      </main>

      <Footer />
    </div>
  )
}

