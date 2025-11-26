// types/course.ts
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export type CourseContent = {
  overview: string;
  curriculum: string[];
  requirements: string[];
};
export interface Course {
  id: string; // UUID
  title: string;
  instructor: string;
  description: string;
  category: string;
  level: CourseLevel;
  duration: string;
  lessons: number;
  image: string;
  enrolled: number | null;
  instructorimage: string;
  rating: number | null;
  reviews: number | null;
  students: number | null;
  content: CourseContent;
  video_url?: string;
  views?:number;
}
