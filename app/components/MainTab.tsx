"use client"

import { useState } from "react"
import { TriangleDrawing } from "./TriangleDrawing"

interface MainTabProps {
  addToTotalArea: (area: number) => void
  addRecord: (record: { side1: number; side2: number; base: number; area: number }) => void
  totalArea: number
  convertToLebna: (meters: number) => string
}

export default function MainTab({ addToTotalArea, addRecord, totalArea, convertToLebna }: MainTabProps) {
  const [sides, setSides] = useState({ side1: "", side2: "", base: "" })
  const [displaySides, setDisplaySides] = useState({ side1: 0, side2: 0, base: 0 })
  const [area, setArea] = useState(0)

  const calculateArea = () => {
    const a = Number(sides.side1)
    const b = Number(sides.side2)
    const c = Number(sides.base)
    if (a + b <= c || b + c <= a || a + c <= b) {
      alert("الأطوال المدخلة لا تشكل مثلثاً صحيحاً")
      return
    }
    const s = (a + b + c) / 2
    const areaValue = Math.sqrt(s * (s - a) * (s - b) * (s - c))

    setDisplaySides({ side1: a, side2: b, base: c })
    setArea(isNaN(areaValue) ? 0 : areaValue)
    addRecord({ side1: a, side2: b, base: c, area: areaValue })
  }

  const handleAddToTotal = () => {
    addToTotalArea(area)
    setSides({ side1: "", side2: "", base: "" })
    setArea(0)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("تم النسخ بنجاح")
    })
  }

  return (
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
            <button className="btn btn-outline-secondary btn-sm" onClick={() => copyToClipboard(convertToLebna(area))}>
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
            <button className="btn btn-outline-secondary btn-sm" onClick={() => copyToClipboard(totalArea.toFixed(2))}>
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
  )
}

