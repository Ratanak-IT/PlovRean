"use client";

import { useEffect, useState } from "react";
import AddCourseForm from "../api/component/AddCourseForm";

import { supabase } from "@/lib/supabaseClient";
import CourseTable from "../api/component/Coursetable";

interface Course {
  id: number;
  title: string;
  instructor_name: string;
  price: number;
  category: string;
  image?: string;
  instructor_image?: string;
  original_price?: number;
  duration?: string;
}

export default function DashboardPage() {
    const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) return console.error(error);
    setCourses(data || []);
  };

  useEffect(() => {
    const loadCourses = async () => await fetchCourses();
    loadCourses();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mt-[50px]">Course Dashboard</h1>
      <button onClick={() => setOpen(true)} className="btn-primary">Add Course</button>

      {open && (
        <AddCourseForm
          onAdd={() => console.log("refresh list here")}
          onClose={() => setOpen(false)}
        />
      )}
      <CourseTable courses={courses} onDelete={fetchCourses} />
    </div>
  );
}
