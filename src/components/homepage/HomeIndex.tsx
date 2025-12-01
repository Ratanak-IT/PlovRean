import CourseCard from "../coursecard/CourseCard";
import { CourseCategories } from "../coursecard/CourseCategories";
import HeroSection from "../hero/HeroSection";


import OurContent from "../ourcontent/OurContent";

export default function HomeIndex() {
  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <HeroSection/>
        <OurContent
          title="Explore by Category"
          text="Choose your path and start learning today"
        />
        <CourseCategories />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OurContent
            title="Featured Courses"
            text="Hand-picked courses to help you become a pro developer"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            <CourseCard />
          </div>
        </div>
      </section>
    </>
  );
}
