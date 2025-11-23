"use client";

import CourseCard from "@/components/coursecard/CourseCard";
import { CourseCategories } from "@/components/coursecard/CourseCategories";
import { HeroSection } from "@/components/hero/HeroSection";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <>
      <HeroSection />
      <CourseCategories />

      <section className="bg-gray-50 dark:bg-gray-900 mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center w-full"
            >
              <h2 className="text-gray-900 dark:text-white mb-2">
                Featured Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from industry experts and advance your career
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CourseCard onCourseClick={onCourseClick} />
    </>
  );
}
