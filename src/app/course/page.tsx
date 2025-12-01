  "use client";

  import { useEffect, useState } from "react";
  import CourseCard from "@/components/coursecard/CourseCard";
  import { CourseSearch } from "@/components/searchbar/CourseSearch";
  import CourseCategoryFilter from "@/components/coursefilter/CourseCategoryFilter";
  import { BookOpen } from "lucide-react";
  import { Course } from "@/types/course";
  import CodingBannerCarousel from "@/components/banner/Coursebanner";

  export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [delayedSearch, setDelayedSearch] = useState(searchTerm);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Small delay for search input
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDelayedSearch(searchTerm);
      }, 50);
      return () => clearTimeout(timeout);
    }, [searchTerm]);

    // Fetch courses once
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
    }, [SUPABASE_KEY, SUPABASE_URL]);

    // Apply search + category filter
    useEffect(() => {
      let filtered = courses;

      // Search filter
      if (delayedSearch.trim()) {
        const lower = delayedSearch.toLowerCase();
        filtered = filtered.filter((c) =>
          [c.title, c.category, c.instructor, c.description]
            .map((v) => v?.toLowerCase() || "")
            .some((v) => v.includes(lower))
        );
      }

      // Category filter
      if (selectedCategory !== "All") {
        filtered = filtered.filter((c) => c.category === selectedCategory);
      }

      setFilteredCourses(filtered);
    }, [delayedSearch, selectedCategory, courses]);

    return (
      <div className="dark:bg-gray-900 bg-gray-100 min-h-screen pb-15">
        <CodingBannerCarousel/> 
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-10">
          <CourseSearch searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
          </div>
          {/* Category Filter */}
          <CourseCategoryFilter
            courses={courses}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Loading / Empty / Courses Grid */}
          {loading ? (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mt-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-56 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12 dark:bg-gray-800 rounded-xl">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {delayedSearch ? "No courses found" : "No courses available"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {delayedSearch
                  ? `No courses match "${delayedSearch}"`
                  : "Start your learning journey today"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 transition-opacity duration-300">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={{
                    ...course,
                    title: course.title ?? "Untitled Course",
                    instructor: course.instructor ?? "Unknown Instructor",
                    description:
                      course.description ?? "No description available",
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
