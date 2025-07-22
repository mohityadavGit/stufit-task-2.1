'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Bell,
  LogOut,
  User,
  Calendar,
  School,
  Cake,
  HeartPulse,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface DefectDetail {
  [key: string]: string;
}

interface Defect {
  defect_type: string;
  affected_body_part: string;
  defect_details: DefectDetail;
  severity: string;
  date_identified: string;
}

interface StudentAPIResponse {
  username: string;
  email: string;
  full_name: string;
  adhar_number: string;
  defects: Defect[];
  school: {
    school_name: string;
  };
}

function StudentPage() {
  const [student, setStudent] = useState<StudentAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const studentData = JSON.parse(localStorage.getItem('user_data') || '{}');

  if (!studentData?.student_id) {
    console.error('No student ID found in local storage');
    setLoading(false);
    return;
  }

  fetch('http://localhost:5000/students/details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({ studentId: studentData.student_id }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    })
    .then((data: StudentAPIResponse) => {
      setStudent(data);
    })
    .catch((err) => {
      console.error('Error fetching student data:', err);
    })
    .finally(() => setLoading(false));
}, []);



  if (loading) {
    return <div className="text-center mt-10 text-blue-600">Loading...</div>;
  }

  if (!student) {
    return (
      <div className="text-center text-red-600 mt-10">
        Student not found. Please check login credentials.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff] to-[#dbeafe]">
      {/* Header */}
      <header className="bg-[#3b82f6] text-white flex items-center justify-between px-4 md:px-8 py-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center space-x-4">
          <Image src="/circleLogo.png" alt="Stufit Logo" width={50} height={50} />
          <h1 className="text-lg md:text-xl font-semibold tracking-wide">Stufit</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200" />
          <LogOut className="w-6 h-6 cursor-pointer hover:rotate-12 transition-transform duration-200" />
        </div>
      </header>

      {/* Welcome */}
      <section className="text-center py-6">
        <h2 className="text-3xl font-bold text-blue-900">👋 Welcome, {student.full_name}</h2>
        <p className="text-blue-700">Here is your health screening summary</p>
      </section>

      {/* Report Card */}
      <section className="max-w-4xl mx-auto bg-white rounded-3xl p-6 shadow-lg border border-slate-200 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <ClipboardList className="text-blue-700" />
          <h3 className="text-2xl font-semibold text-blue-800">Health Report Card</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-900 text-base">
          <p className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Name:</span> {student.full_name}
          </p>
          <p className="flex items-center gap-2">
            <School className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">School:</span> {student.school.school_name}
          </p>
          <p className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Aadhar No.:</span> {student.adhar_number}
          </p>
          <p className="flex items-center gap-2 md:col-span-2">
            <User className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Email:</span> {student.email}
          </p>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Health Issues */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <HeartPulse className="text-pink-600" />
            <h4 className="text-xl font-semibold text-blue-800">Detected Health Issues</h4>
          </div>

          {student.defects.length === 0 ? (
            <p className="flex items-center text-green-600 font-medium mt-2">
              <CheckCircle className="w-5 h-5 mr-2" />
              No health issues found. You are in good health!
            </p>
          ) : (
            <ul className="list-none space-y-4 mt-4">
              {student.defects.map((defect, index) => (
                <li
                  key={index}
                  className="p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition"
                >
                  <div className="flex items-center gap-2 mb-2 text-blue-800 font-medium">
                    <AlertTriangle className="text-red-500" />
                    {defect.defect_type} – {defect.affected_body_part}
                  </div>
                  <div className="text-sm text-slate-700 ml-7">
                    <p className="mb-1">
                      <strong>Severity:</strong> {defect.severity}
                    </p>
                    <p className="mb-1">
                      <strong>Date Identified:</strong>{" "}
                      {new Date(defect.date_identified).toLocaleDateString()}
                    </p>
                    <p className="mb-1 font-semibold">Details:</p>
                    <ul className="list-disc list-inside ml-4">
                      {Object.entries(defect.defect_details).map(([key, value]) => (
                        <li key={key}>
                          <span className="capitalize">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-6 text-slate-500 text-sm">
        🩺 Generated by Stufit Health Screening System
      </footer>
    </div>
  );
}

export default function ProtectedStudentPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentPage />
    </ProtectedRoute>
  );
}
