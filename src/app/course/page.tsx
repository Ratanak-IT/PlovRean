"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/coursecard/CourseCard";
import { CourseSearch } from "@/components/searchbar/CourseSearch";
import { BookOpen } from "lucide-react";
import { Course } from "@/types/course";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/courses?select=*&order=title.asc`,
          {
            method: "GET",
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data: Course[] = await res.json();
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error("REST Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  });

  useEffect(() => {
    if (!searchTerm.trim()) return setFilteredCourses(courses);

    const lower = searchTerm.toLowerCase();
    const filtered = courses.filter((c) =>
      [c.title, c.category, c.instructor, c.description]
        .map((v) => v?.toLowerCase() || "")
        .some((v) => v.includes(lower))
    );

    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  return (
    <div className="dark:bg-gray-900 bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          All Courses
        </h1>

        {/* Search */}
        <CourseSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading courses...
            </p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12 dark:bg-gray-800 rounded-xl">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? "No courses found" : "No courses available"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {searchTerm
                ? `No courses match "${searchTerm}"`
                : "Start your learning journey today"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={{
                  ...course,
                  title: course.title ?? "Untitled Course",
                  instructor: course.instructor ?? "Unknown Instructor",
                  description: course.description ?? "No description available",
                  duration: course.duration ?? "N/A",
                  lessons: course.lessons ?? 0,
                  rating: course.rating ?? 4.8,
                  enrolled: course.enrolled ?? 1000,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
