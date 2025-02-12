interface RecordTabProps {
  records: Array<{ side1: number; side2: number; base: number; area: number }>
  convertToLebna: (meters: number) => string
}

export default function RecordTab({ records, convertToLebna }: RecordTabProps) {
  return (
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
          </table>
        </div>
      </div>
    </div>
  )
}

