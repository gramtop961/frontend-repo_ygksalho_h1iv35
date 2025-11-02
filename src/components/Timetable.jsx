import { AlertTriangle } from 'lucide-react';

function periodTimeLabel(period) {
  const slots = {
    1: '08:00 - 08:45',
    2: '08:50 - 09:35',
    3: '09:45 - 10:30',
    4: '10:40 - 11:25',
    5: '11:35 - 12:20',
    6: '13:00 - 13:45',
  };
  return slots[period] || '';
}

export default function Timetable({ timetable, sickTeachers, examsForDay }) {
  return (
    <div className="bg-white/80 backdrop-blur border rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Timetable</h2>
        {examsForDay?.length ? (
          <div className="flex items-center gap-2 text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg">
            <AlertTriangle size={16} />
            <span className="text-sm font-medium">Exams today: {examsForDay.length}</span>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {timetable.map((slot) => {
          const isTeacherSick = sickTeachers.includes(slot.subjectTeacher);
          const isExam = examsForDay?.some((e) => e.subject === slot.subject);
          return (
            <div
              key={`${slot.period}-${slot.subject}`}
              className={`relative border rounded-lg p-3 flex items-center gap-3 bg-white ${
                isExam ? 'bg-yellow-50 border-yellow-300' : 'border-gray-200'
              }`}
            >
              {/* Double line indicator when teacher is sick */}
              <div className={`h-full absolute left-0 top-0 bottom-0 flex flex-col justify-center ${
                isTeacherSick ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-1 bg-red-500" />
                <div className="w-1 bg-red-500 mt-1" />
              </div>

              <div className="pl-3">
                <div className="text-xs text-gray-500">Period {slot.period} · {periodTimeLabel(slot.period)}</div>
                <div className="text-base font-semibold text-gray-900">{slot.subject}</div>
                <div className="text-sm text-gray-600">Room {slot.room} · {slot.subjectTeacher}</div>
                {isTeacherSick && (
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    <AlertTriangle size={12} /> Teacher out sick
                  </div>
                )}
                {isExam && (
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
                    <AlertTriangle size={12} /> Exam/Test
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
