import { useMemo } from 'react';
import { Calendar, School } from 'lucide-react';

export default function ClassHeader({ classes, selectedClassId, onClassChange, selectedDate, onDateChange }) {
  const formatted = useMemo(() => {
    const d = new Date(selectedDate);
    return d.toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    });
  }, [selectedDate]);

  return (
    <div className="w-full bg-white/70 backdrop-blur border rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-600 text-white">
          <School size={22} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">School Class Dashboard</h1>
          <p className="text-sm text-gray-500">Track timetable, exams, grades, and attendance</p>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex flex-col sm:flex-row gap-3">
        <label className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
          <span className="text-gray-600 text-sm">Class</span>
          <select
            value={selectedClassId}
            onChange={(e) => onClassChange(e.target.value)}
            className="bg-transparent outline-none text-gray-900 text-sm"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
          <Calendar size={18} className="text-gray-600" />
          <input
            type="date"
            value={new Date(selectedDate).toISOString().slice(0, 10)}
            onChange={(e) => onDateChange(e.target.value)}
            className="bg-transparent outline-none text-gray-900 text-sm"
          />
        </label>
      </div>

      <div className="w-full md:w-auto text-sm text-gray-600 md:pl-4 md:border-l">
        {formatted}
      </div>
    </div>
  );
}
