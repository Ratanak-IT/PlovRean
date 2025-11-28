"use client";

import { useEffect, useState } from "react";
import { BookOpen, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Course {
  id: string;
  duration?: string;
}

export default function DashboardState() {
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch all courses
  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data, error } = await supabase.from("courses").select("*");
        if (error) throw error;
        setCourses(data || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setCourses([]);
      }
    }

    fetchCourses();
  }, []);

  const totalHours = courses.reduce(
    (acc, course) => acc + (parseInt(course.duration || "0") || 0),
    0
  );

  return (

    <div className="flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
    {/* All Courses */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">All Courses</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{courses.length}</p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        </div>
      </div>
    </div>

    {/* In Progress */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">In Progress</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{courses.length}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-300" />
        </div>
      </div>
    </div>

    {/* Hours Learned */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Hours Learned</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalHours}</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <Clock className="w-8 h-8 text-purple-600 dark:text-purple-300" />
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
