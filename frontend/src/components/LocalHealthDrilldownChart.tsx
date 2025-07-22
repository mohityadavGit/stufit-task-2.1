'use client';

import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Student, DefectType } from '@/data/students';
import { getDefectSubtypes } from '@/lib/dataTransforms';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: Student[];
  defectType: DefectType;
}

const DEFECT_LABELS: Record<DefectType, string> = {
  eye: 'Eye',
  hearing: 'Hearing',
  fitness: 'Fitness',
  psychological: 'Psychological',
  dental: 'Dental',
  orthopedic: 'Orthopedic',
  ent: 'ENT',
};

const COLORS = [
  '#60a5fa', '#fbbf24', '#34d399', '#f87171',
  '#a78bfa', '#fb923c', '#10b981', '#f472b6', '#c084fc',
];

export default function LocalHealthDrilldownChart({ data, defectType }: Props) {
  const label = DEFECT_LABELS[defectType] || 'Health Defect';

  const subtypeCounts = useMemo(() => {
    return getDefectSubtypes(data, defectType);
  }, [data, defectType]);

  const total = Object.values(subtypeCounts).reduce((acc, n) => acc + n, 0);

  const chartData = {
    labels: Object.keys(subtypeCounts),
    datasets: [
      {
        label: 'Students',
        data: Object.values(subtypeCounts),
        backgroundColor: COLORS,
        borderColor: '#fff',
        borderWidth: 1,
        hoverBorderColor: '#1e3a8a',
        hoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#334155',
          font: { size: 12 },
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = Number(ctx.raw);
            return `${ctx.label}: ${value} student${value !== 1 ? 's' : ''}`;
          },
        },
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        padding: 10,
      },
    },
  };

  return (
    <div className="w-full h-[420px] sm:h-[450px] md:h-[500px] p-4 md:p-6 rounded-xl shadow-md border border-gray-200 bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-1">
        <h2 className="text-lg font-semibold text-blue-900 capitalize">
          {label} Subtype Distribution
        </h2>
        <span className="text-xs md:text-sm text-slate-500">
          Breakdown of subtype-wise cases
        </span>
      </div>

      {Object.keys(subtypeCounts).length > 0 ? (
        <>
          <div className="relative h-[260px] sm:h-[300px] w-full">
            <Pie data={chartData} options={chartOptions} />
          </div>

          <ul className="mt-4 text-sm text-slate-700 space-y-1 max-h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-400">
            {Object.entries(subtypeCounts).map(([subtype, count]) => (
              <li key={subtype} className="flex justify-between">
                <span className="capitalize">{subtype}</span>
                <span>
                  {count} student{count > 1 ? 's' : ''} (
                  {((count / total) * 100).toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex items-center justify-center h-[300px] text-slate-400 text-sm text-center">
          No subtype data available for {label}.
        </div>
      )}
    </div>
  );
}
