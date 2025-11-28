"use client";

import { useMemo } from "react";
import { Course } from "@/types/course";

interface CourseCategoryFilterProps {
  courses: Course[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CourseCategoryFilter({
  courses,
  selectedCategory,
  onCategoryChange,
}: CourseCategoryFilterProps) {
  // Compute unique categories using useMemo
  const categories = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.category).filter(Boolean)));
  }, [courses]);

  return (
    <div className="overflow-x-auto pb-2 mb-6">
      <div className="flex gap-2 min-w-max">
        {/* "All" Button */}
        <button
          className={`px-4 py-2 rounded-xl whitespace-nowrap ${
            selectedCategory === "All"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => onCategoryChange("All")}
        >
          All
        </button>

        {/* Category Buttons */}
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-xl whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
