'use client';

import React, { useEffect, useState } from 'react';
import { Student } from '@/data/mockStudents';
import FilterPanel from '@/components/FilterPanel';
import HealthDrilldownChart from '@/components/HealthDrilldownChart';
import HealthSummaryBarChart from '@/components/HealthSummaryChart';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import axios from 'axios';

const defaultFilters = {
  school: 'All',
  grade: 'All',
  session: 'All',
  defect: 'All',
};

function SuperAdminDashboard() {
  const [filters, setFilters] = useState(defaultFilters);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [filteredData, setFilteredData] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get<Student[]>(
          'http://localhost:5000/students/all',
        );
        setAllStudents(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    fetchStudents();
  }, []);

  const applyFilters = () => {
    const result = allStudents.filter((student) => {
      const matchSchool =
        filters.school === 'All' || student.school === filters.school;
      const matchGrade =
        filters.grade === 'All' || student.grade === filters.grade;
      const matchSession =
        filters.session === 'All' || student.session === filters.session;
      const matchDefect =
        filters.defect === 'All' ||
        (student.defects &&
          student.defects[filters.defect as keyof typeof student.defects]);
      return matchSchool && matchGrade && matchSession && matchDefect;
    });

    setFilteredData(result);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setFilteredData(allStudents);
  };

  const uniqueValues = {
    schools: [...new Set(allStudents.map((s) => s.school))],
    grades: [...new Set(allStudents.map((s) => s.grade))],
    sessions: [...new Set(allStudents.map((s) => s.session))],
  };

  const handleBarClick = (selectedDefect: string) => {
    setFilters((prev) => ({ ...prev, defect: selectedDefect }));
    const updatedData = allStudents.filter((student) => {
      const matchSchool =
        filters.school === 'All' || student.school === filters.school;
      const matchGrade =
        filters.grade === 'All' || student.grade === filters.grade;
      const matchSession =
        filters.session === 'All' || student.session === filters.session;
      const matchDefect =
        student.defects &&
        student.defects[selectedDefect as keyof typeof student.defects];
      return matchSchool && matchGrade && matchSession && matchDefect;
    });
    setFilteredData(updatedData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="text-center py-6">
        <h2 className="text-3xl font-bold text-red-900">Super Admin Dashboard</h2>
        <p className="text-blue-700">Cumulative Dashboard for all schools</p>
      </section>

      <main className="flex flex-col p-4 md:p-6 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-300">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onApply={applyFilters}
            onReset={resetFilters}
            uniqueValues={uniqueValues}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthSummaryBarChart data={filteredData} onBarClick={handleBarClick} />
          <HealthDrilldownChart
            data={filteredData}
            defectType={filters.defect as keyof Student['defects']}
          />
        </div>
      </main>
    </div>
  );
}

export default function ProtectedSuperAdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
      <SuperAdminDashboard />
    </ProtectedRoute>
  );
}
