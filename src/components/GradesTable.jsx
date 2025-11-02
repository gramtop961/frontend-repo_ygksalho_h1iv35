import { BookOpen } from 'lucide-react';

function average(arr) {
  if (!arr?.length) return 0;
  const sum = arr.reduce((a, b) => a + b, 0);
  return Math.round((sum / arr.length) * 10) / 10;
}

export default function GradesTable({ students, subjects }) {
  return (
    <div className="bg-white/80 backdrop-blur border rounded-xl p-4 md:p-6 shadow-sm overflow-x-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-emerald-600 text-white">
          <BookOpen size={18} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Grades</h2>
      </div>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th className="py-2 pr-4 font-medium">Student</th>
            {subjects.map((sub) => (
              <th key={sub} className="py-2 px-2 font-medium">{sub}</th>
            ))}
            <th className="py-2 px-2 font-semibold text-gray-800">Avg</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => {
            const perSubject = subjects.map((sub) => average(s.grades[sub] || []));
            const overall = average(perSubject);
            return (
              <tr key={s.id} className="border-b last:border-0">
                <td className="py-2 pr-4 whitespace-nowrap font-medium text-gray-900">{s.name}</td>
                {subjects.map((sub) => (
                  <td key={sub} className="py-2 px-2 text-gray-700">
                    {average(s.grades[sub] || [])}
                  </td>
                ))}
                <td className={`py-2 px-2 font-semibold ${overall >= 75 ? 'text-emerald-700' : overall >= 60 ? 'text-amber-700' : 'text-red-700'}`}>{overall}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
