import { User } from 'lucide-react';

export default function AttendanceRemarks({ students }) {
  return (
    <div className="bg-white/80 backdrop-blur border rounded-xl p-4 md:p-6 shadow-sm overflow-x-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-purple-600 text-white">
          <User size={18} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Attendance & Remarks</h2>
      </div>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th className="py-2 pr-4 font-medium">Student</th>
            <th className="py-2 px-2 font-medium">Absences</th>
            <th className="py-2 px-2 font-medium">Remark</th>
            <th className="py-2 px-2 font-medium">Place</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b last:border-0">
              <td className="py-2 pr-4 whitespace-nowrap font-medium text-gray-900">{s.name}</td>
              <td className={`py-2 px-2 font-semibold ${s.absences > 5 ? 'text-red-700' : s.absences > 2 ? 'text-amber-700' : 'text-emerald-700'}`}>{s.absences}</td>
              <td className="py-2 px-2 text-gray-700">{s.remark || '-'}</td>
              <td className="py-2 px-2 text-gray-700">{s.place || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
