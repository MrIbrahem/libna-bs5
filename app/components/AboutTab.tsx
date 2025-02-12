export default function AboutTab() {
  return (
    <div className="card">
      <ul className="table-view" style={{ textAlign: "right" }}>
        <li className="table-view-cell">تم عمل هذا التطبيق للمساعدة في حساب مساحات الأراضي عبر تقسيمها لعدة مثلثات</li>
        <li className="table-view-cell">
          يوفر التطبيق إمكانية جمع مثلثات قطعة الأرض كاملة دون الحاجة لتدوين مساحة المثلثات في ورقة أو عبر وسيلة أخرى
        </li>
        <li className="table-view-cell">يمكن حساب عدد لا محدود من المثلثات عبر التطبيق</li>
        <li className="table-view-cell">
          يوفر التطبيق الناتج بالمتر المربع وباللبنة العشاري التي تساوي 44.44 متر مربع.
        </li>
      </ul>
    </div>
  )
}

