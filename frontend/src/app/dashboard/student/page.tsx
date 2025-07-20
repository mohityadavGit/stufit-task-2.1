"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";

interface StudentInfo {
  student_id: string;
  username: string;
  email: string;
  full_name: string;
  adhar_number: string;
  school_id: number;
  role: string;
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("user_data");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.role === "STUDENT") {
          setStudent(parsed);
        }
      } catch (e) {
        console.error("Error parsing student data:", e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F5F9FF]">
        <p className="text-[#044974] text-md font-semibold animate-pulse">
          Loading student data...
        </p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#F5F9FF] px-4">
        <Header />
        <p className="text-[#044974] text-lg font-semibold mt-6">
          No student data found. Please login or contact support.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F9FF] flex flex-col items-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 border border-[#A3C6FF]">
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/images/circlelogo.png"
              alt="STUFIT Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <h1 className="text-2xl font-semibold text-[#044974] text-center select-none">
              🎓 Welcome, {student.full_name}
            </h1>
            <p className="text-[#3182CE] mt-1 font-medium text-center max-w-xs text-sm">
              Empowering your wellness journey with clarity and ease.
            </p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#044974] font-medium text-sm">
            {[
              { label: "Student ID", value: student.student_id },
              { label: "Username", value: student.username },
              { label: "Email", value: student.email },
              { label: "Adhar Number", value: student.adhar_number },
              { label: "Role", value: student.role },
              { label: "School ID", value: student.school_id },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#E6F0FF] rounded-lg p-3 shadow-sm border border-[#A3C6FF] hover:shadow-md transition-shadow duration-200"
              >
                <span className="block text-xs text-[#2A66C1] mb-1 font-semibold">
                  {label}
                </span>
                <p className="break-words">{value}</p>
              </div>
            ))}
          </section>

          <footer className="mt-8 text-center text-[#5A82D3] font-semibold tracking-wide text-sm">
            Stay active. Stay healthy. Stay focused! 💪
          </footer>
        </div>
      </main>
    </>
  );
}
