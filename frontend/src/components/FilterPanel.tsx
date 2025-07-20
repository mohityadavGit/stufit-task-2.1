'use client';

import React from 'react';

type Props = {
  filters: {
    school: string;
    grade: string;
    session: string;
    defect: string;
  };
  setFilters: (filters: Props['filters']) => void;
  onApply: () => void;
  onReset: () => void;
  uniqueValues: {
    schools: string[];
    grades: string[];
    sessions: string[];
  };
};

export default function FilterPanel({
  filters,
  setFilters,
  onApply,
  onReset,
  uniqueValues,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select
          name="school"
          value={filters.school}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="All">All Schools</option>
          {uniqueValues.schools.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          name="grade"
          value={filters.grade}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="All">All Grades</option>
          {uniqueValues.grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          name="session"
          value={filters.session}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="All">All Sessions</option>
          {uniqueValues.sessions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          name="defect"
          value={filters.defect}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="All">All Defects</option>
          <option value="eye">Eye</option>
          <option value="dental">Dental</option>
          <option value="fitness">Fitness</option>
          <option value="psychological">Psychological</option>
          <option value="orthopedic">Orthopedic</option>
          <option value="hearing">Hearing</option>
          <option value="ent">ENT</option>
        </select>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button className="btn-reset" onClick={onReset}>
          Reset
        </button>
        <button className="btn-apply" onClick={onApply}>
          Apply
        </button>
      </div>
    </div>
  );
}
