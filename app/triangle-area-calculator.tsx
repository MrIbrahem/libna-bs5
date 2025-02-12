"use client"

import { useState } from "react"
import MainTab from "./components/MainTab"
import RecordTab from "./components/RecordTab"
import AboutTab from "./components/AboutTab"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ThemeToggle from "./components/ThemeToggle"

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
	  <Header />
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

	  <ThemeToggle />
      <Footer />
    </div>
  )
}

