import { useMemo, useState } from 'react';
import ClassHeader from './components/ClassHeader';
import Timetable from './components/Timetable';
import GradesTable from './components/GradesTable';
import AttendanceRemarks from './components/AttendanceRemarks';

const initialData = {
  classes: [
    { id: 'classA', name: 'Class A' },
    { id: 'classB', name: 'Class B' },
  ],
  students: {
    classA: [
      { id: 's1', name: 'Amina Bello', absences: 1, remark: 'Great participation', place: 'Front Left', grades: { Math: [85, 78], English: [92, 88], Science: [75, 80] } },
      { id: 's2', name: 'Kofi Mensah', absences: 3, remark: 'Needs focus on Science', place: 'Back Center', grades: { Math: [60, 65], English: [70, 73], Science: [55, 62] } },
      { id: 's3', name: 'Zara Khan', absences: 0, remark: 'Consistent work', place: 'Front Right', grades: { Math: [90, 94], English: [88, 91], Science: [86, 89] } },
    ],
    classB: [
      { id: 's4', name: 'John Doe', absences: 2, remark: 'Improving', place: 'Middle Left', grades: { Math: [72, 74], English: [68, 70], Science: [79, 81] } },
      { id: 's5', name: 'Mary Ann', absences: 6, remark: 'Follow-up with guardian', place: 'Back Right', grades: { Math: [58, 62], English: [65, 60], Science: [61, 59] } },
    ],
  },
  timetable: {
    // per-class, per-weekday list of slots
    classA: {
      Monday: [
        { period: 1, subject: 'Math', room: '101', subjectTeacher: 'Mr. Ali' },
        { period: 2, subject: 'English', room: '102', subjectTeacher: 'Ms. Jane' },
        { period: 3, subject: 'Science', room: 'Lab A', subjectTeacher: 'Mr. Lee' },
        { period: 4, subject: 'History', room: '103', subjectTeacher: 'Ms. Rose' },
      ],
      Tuesday: [
        { period: 1, subject: 'Science', room: 'Lab A', subjectTeacher: 'Mr. Lee' },
        { period: 2, subject: 'Math', room: '101', subjectTeacher: 'Mr. Ali' },
        { period: 3, subject: 'English', room: '102', subjectTeacher: 'Ms. Jane' },
        { period: 4, subject: 'Art', room: '201', subjectTeacher: 'Ms. Kim' },
      ],
    },
    classB: {
      Monday: [
        { period: 1, subject: 'English', room: '202', subjectTeacher: 'Ms. Jane' },
        { period: 2, subject: 'Math', room: '203', subjectTeacher: 'Mr. Ali' },
        { period: 3, subject: 'Geography', room: '204', subjectTeacher: 'Mr. Obi' },
      ],
      Tuesday: [
        { period: 1, subject: 'Math', room: '203', subjectTeacher: 'Mr. Ali' },
        { period: 2, subject: 'English', room: '202', subjectTeacher: 'Ms. Jane' },
        { period: 3, subject: 'Science', room: 'Lab B', subjectTeacher: 'Mr. Lee' },
      ],
    },
  },
  teacherSick: ['Mr. Ali'],
  exams: [
    { classId: 'classA', date: '2025-01-15', subject: 'Math' },
    { classId: 'classA', date: '2025-01-15', subject: 'English' },
    { classId: 'classB', date: '2025-01-16', subject: 'Science' },
  ],
};

function weekdayName(date) {
  return new Date(date).toLocaleDateString(undefined, { weekday: 'long' });
}

export default function App() {
  const [selectedClassId, setSelectedClassId] = useState(initialData.classes[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const subjects = useMemo(() => {
    const set = new Set();
    const map = initialData.timetable[selectedClassId] || {};
    Object.values(map).flat().forEach((slot) => set.add(slot.subject));
    return Array.from(set);
  }, [selectedClassId]);

  const dayName = weekdayName(selectedDate);
  const todaySlots = (initialData.timetable[selectedClassId] || {})[dayName] || [];
  const examsForDay = useMemo(() => {
    const key = typeof selectedDate === 'string' ? selectedDate : new Date(selectedDate).toISOString().slice(0, 10);
    return initialData.exams.filter((e) => e.classId === selectedClassId && e.date === key);
  }, [selectedClassId, selectedDate]);

  const students = initialData.students[selectedClassId] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <ClassHeader
          classes={initialData.classes}
          selectedClassId={selectedClassId}
          onClassChange={setSelectedClassId}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Timetable
            timetable={todaySlots}
            sickTeachers={initialData.teacherSick}
            examsForDay={examsForDay}
          />

          <GradesTable students={students} subjects={subjects} />
        </div>

        <AttendanceRemarks students={students} />

        <div className="text-xs text-gray-500 text-center pt-2">
          Exams are highlighted in yellow. Classes with a sick teacher show a double red line until they return.
        </div>
      </div>
    </div>
  );
}
