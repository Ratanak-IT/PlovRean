"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Clock, Users, TrendingUp, Filter } from "lucide-react";
import Image from "next/image";

// Define Course type
export interface CourseType {
  id: number;
  title: string;
  instructor: string;
  instructorImage?: string;
  rating?: number;
  reviews?: number;
  students?: number;
  price: number;
  originalPrice?: number;
  image?: string;
  category: string;
  level?: string;
  duration?: string;
  bestseller?: boolean;
  updated?: string;
}

export function CourseCard({
  onCourseClick,
}: {
  onCourseClick: (courseId: number) => void;
}) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses", { cache: "no-store" });
        const data: CourseType[] = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading courses...</p>;
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gray-900 dark:text-white mb-2">Featured Courses</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Learn from industry experts and advance your career
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mt-4 md:mt-0"
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" /> <span>Filter</span>
            </button>
            <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Most Popular</option>
              <option>Highest Rated</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </motion.div>
        </div>

        {/* Course grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course, index) => {
            const discount = course.originalPrice
              ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
              : 0;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
              >
                {/* Course Card */}
                <div
                  onClick={() => onCourseClick(course.id)}
                  className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={course.image || "/images/course-placeholder.png"}
                      alt={course.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {course.bestseller && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full border-0 transition-colors">
                          <TrendingUp className="w-3 h-3" />
                          <span className="text-xs">Bestseller</span>
                        </span>
                      )}
                      {course.level && (
                        <span className="inline-flex items-center px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full border-0 transition-colors">
                          <span className="text-xs">{course.level}</span>
                        </span>
                      )}
                    </div>

                    {/* Discount badge */}
                    {discount > 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full border-0 transition-colors">
                          <span className="text-xs">{discount}% OFF</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-indigo-500 dark:text-indigo-400 mb-2 text-sm">{course.category}</p>
                    <h3 className="text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      {course.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-3">
                      <Image
                        src={course.instructorImage || "/images/instructor-placeholder.png"}
                        alt={course.instructor}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        unoptimized
                      />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{course.instructor}</span>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-900 dark:text-white text-sm">{course.rating || 0}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        ({course.reviews?.toLocaleString() || 0})
                      </span>
                    </div>

                    {/* Duration & Students */}
                    <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students ? (course.students / 1000).toFixed(1) + "k" : "0k"}</span>
                      </div>
                    </div>

                    <div className="flex-grow" />

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 dark:text-white font-semibold">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-gray-500 dark:text-gray-500 line-through text-sm">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <button className="px-8 py-2 bg-white dark:bg-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-300 transition-colors">
            Load More Courses
          </button>
        </motion.div>
      </div>
    </section>
  );
}
