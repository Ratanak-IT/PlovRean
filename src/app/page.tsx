'use client';
import { CourseCard } from "@/components/coursecard/CourseCard";
import { CourseCategories } from "@/components/coursecard/CourseCategories";
import { HeroSection } from "@/components/hero/HeroSection";



export default function Home() {
   const handleCourseClick = (courseId: number) => {
    console.log('Course clicked:', courseId);
  };
  return (
    <>
    <HeroSection/>
    <CourseCategories/>
    <CourseCard onCourseClick={handleCourseClick} />
    </>
  );
}
