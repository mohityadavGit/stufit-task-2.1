'use client';

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Student } from '@/data/mockStudents';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Props = {
  data: Student[];
  onBarClick?: (defectType: string) => void;
};

const DEFECT_TYPES = [
  'eye',
  'hearing',
  'fitness',
  'psychological',
  'dental',
  'orthopedic',
  'ent',
] as const;

const DEFECT_LABELS: Record<string, string> = {
  eye: 'Eye',
  hearing: 'Hearing',
  fitness: 'Fitness',
  psychological: 'Psychological',
  dental: 'Dental',
  orthopedic: 'Orthopedic',
  ent: 'ENT',
};

const DEFECT_COLORS: Record<string, string> = {
  eye: '#3b82f6',
  hearing: '#facc15',
  fitness: '#10b981',
  psychological: '#ef4444',
  dental: '#8b5cf6',
  orthopedic: '#f97316',
  ent: '#14b8a6',
};

export default function HealthSummaryBarChart({ data, onBarClick }: Props) {
  const defectCounts = useMemo(() => {
    const counts: Record<string, number> = Object.fromEntries(
      DEFECT_TYPES.map((type) => [type, 0])
    );

    data.forEach((student) => {
      const { defects = {} } = student;
      DEFECT_TYPES.forEach((type) => {
        if (defects[type]) counts[type]++;
      });
    });

    return counts;
  }, [data]);

  const visibleTypes = DEFECT_TYPES.filter((type) => defectCounts[type] > 0);

  if (data.length === 0 || visibleTypes.length === 0) {
    return (
      <div className="w-full h-[420px] flex items-center justify-center text-slate-500 text-sm rounded-xl border border-gray-300 bg-white">
        No data available for selected filters
      </div>
    );
  }

  const chartData: ChartData<'bar'> = {
    labels: visibleTypes.map((type) => DEFECT_LABELS[type]),
    datasets: [
      {
        label: 'Number of Students',
        data: visibleTypes.map((type) => defectCounts[type]),
        backgroundColor: visibleTypes.map((type) => DEFECT_COLORS[type]),
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 36,
        hoverBorderColor: '#1e293b',
        hoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeInOutCubic',
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        bottom: 30,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw} students`,
        },
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#4b5563',
        borderWidth: 1,
        padding: 10,
      },
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selected = visibleTypes[index];
        onBarClick?.(selected);
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
          color: '#334155',
          font: { size: 12 },
        },
        title: {
          display: true,
          text: 'Number of Students',
          color: '#1e293b',
          font: { size: 13 },
        },
        grid: {
          color: '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: '#334155',
          autoSkip: false,
          maxRotation: 45,
          font: { size: 12 },
        },
        title: {
          display: true,
          text: 'Health Categories',
          color: '#1e293b',
          font: { size: 13 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[420px] sm:h-[450px] md:h-[500px] p-4 md:p-6 rounded-xl shadow-md border border-gray-300 bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-1">
        <h2 className="text-lg md:text-xl font-semibold text-blue-900">
          Students vs Health Defects
        </h2>
        <span className="text-xs md:text-sm text-slate-500">
          Click on a bar to explore
        </span>
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
