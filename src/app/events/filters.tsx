"use client";
import { useState } from "react";

type FiltersProps = {
  onChange: (filters: Record<string, string>) => void;
};

export default function FiltersClient({ onChange }: FiltersProps) {
  const [filters, setFilters] = useState({
    date: "",
    region: "",
    city: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onChange(newFilters);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
      />
      <select name="region" value={filters.region} onChange={handleChange}>
        <option value="">All Regions</option>
        <option value="North">North</option>
        <option value="South">South</option>
      </select>
      <select name="city" value={filters.city} onChange={handleChange}>
        <option value="">All Cities</option>
        <option value="Zagreb">Zagreb</option>
        <option value="Split">Split</option>
      </select>
      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="">All Types</option>
        <option value="Workshop">Workshop</option>
        <option value="Concert">Concert</option>
      </select>
    </div>
  );
}