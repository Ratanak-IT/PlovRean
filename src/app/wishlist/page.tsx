"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BookOpen } from "lucide-react";
import { CourseSearch } from "@/components/searchbar/CourseSearch";
import CourseCard, { CourseType } from "@/components/coursecard/CourseCard";

export default function WishlistPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<CourseType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // page-level loading

  useEffect(() => {
    async function fetchEnrolledCourses() {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }

      // Get user's enrollments
      const { data: enrollments, error: e1 } = await supabase
        .from("enrollments")
        .select("course_id")
        .eq("user_id", user.id);

      if (e1 || !enrollments || enrollments.length === 0) {
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }

      // Fetch actual courses
      const { data: courses, error: e2 } = await supabase
        .from("courses")
        .select("*")
        .in("id", enrollments.map(e => e.course_id));

      if (e2) {
        console.error("Courses fetch error:", e2);
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }

      setEnrolledCourses(courses || []);
      setLoading(false);
    }

    fetchEnrolledCourses();
  }, []);

  // Filter courses by search term
  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter(
      (course) =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enrolledCourses, searchTerm]);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 mt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-blue-100">
            Continue your learning journey and achieve your goals
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <CourseSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          // Empty state
          <div className="text-center py-12 dark:bg-gray-800 rounded-xl">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              No enrolled courses yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Start your learning journey by enrolling in a course
            </p>
          </div>
        ) : (
          // Courses grid
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} searchTerm={searchTerm} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
