"use client";

import { useState } from "react";
import Image from "next/image";
import { Bell, LogOut } from "lucide-react";
import HealthSummaryChart from "@/components/HealthSummaryChart";
import HealthDrilldownChart from "@/components/HealthDrilldownChart";
import { parentData } from "@/data/parentData";
import { Student } from "@/data/mockStudents";
import ProtectedRoute from "@/components/ProtectedRoute";

const DEFECT_TYPES = [
  "eye",
  "hearing",
  "fitness",
  "psychological",
  "dental",
  "orthopedic",
  "ent",
];

const FATHER_NAME = "Parent1"; // Replace with dynamic login later

function ParentPage() {
  const [selectedDefectType, setSelectedDefectType] = useState("fitness");
  const [selectedChild, setSelectedChild] = useState<string>("All");

  const myChildren: Student[] = parentData.filter(
    (s) => s.fathers_name === FATHER_NAME
  );

  const filteredData =
    selectedChild === "All"
      ? myChildren
      : myChildren.filter((child) => child.name === selectedChild);

  return (
    <div className="min-h-screen bg-[#f4faff]">
      {/* Header */}
      <header className="bg-[#69b9f3] text-white flex items-center justify-between px-4 md:px-8 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center space-x-4">
          <Image
            src="/circleLogo.png"
            alt="Stufit Logo"
            width={50}
            height={50}
          />
          <h1 className="text-lg md:text-xl font-semibold">Stufit</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 cursor-pointer" />
          <LogOut className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      {/* Title */}
      <section className="text-center py-6">
        <h2 className="text-3xl font-bold text-blue-900">Parent Dashboard</h2>
        <p className="text-blue-700">
          Viewing data for children of {FATHER_NAME}
        </p>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-4 items-center justify-center pb-6">
        {/* Child Selector */}
        <div>
          <label className="block mb-2 text-sm font-medium text-blue-900">
            Select Child:
          </label>
          <select
            className="w-64 px-4 py-2 border border-slate-300 rounded-xl bg-white text-blue-900 shadow-sm"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            <option value="All">All Children</option>
            {myChildren.map((child) => (
              <option key={child.id} value={child.name}>
                {child.name}
              </option>
            ))}
          </select>
        </div>

        {/* Defect Type Selector */}
        <div>
          <label className="block mb-2 text-sm font-medium text-blue-900">
            Select Defect Type:
          </label>
          <select
            className="w-64 px-4 py-2 border border-slate-300 rounded-xl bg-white text-blue-900 shadow-sm"
            value={selectedDefectType}
            onChange={(e) => setSelectedDefectType(e.target.value)}
          >
            {DEFECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Charts */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200">
          <HealthDrilldownChart
            data={filteredData}
            defectType={selectedDefectType as keyof Student["defects"]}
          />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200">
          <HealthSummaryChart data={filteredData} />
        </div>
      </section>
    </div>
  );
}

// Wrap with ProtectedRoute for role-based access
export default function ProtectedParentPage() {
  return (
    <ProtectedRoute allowedRoles={["student", "parent"]}>
      <ParentPage />
    </ProtectedRoute>
  );
}
