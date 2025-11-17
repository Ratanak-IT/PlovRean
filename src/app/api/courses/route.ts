import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

// TypeScript interface for a Course
interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  instructorImage?: string;
  rating?: number;
  reviews?: number;
  students?: number;
  originalPrice?: number;
  level?: string;
  duration?: string;
  bestseller?: boolean;
  updated?: string;
}

// Path to courses.json at project root
const filePath = `${process.cwd()}/courses.json`;
console.log("process.cwd():", process.cwd());

// Default courses if JSON is empty
const defaultCourses: Course[] = [
  {
    id: 2,
    title: 'Advanced React & Next.js Development',
    instructor: 'Michael Chen',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 4.8,
    reviews: 8920,
    students: 32100,
    price: 79.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    category: 'Web Development',
    level: 'Advanced',
    duration: '35',
    bestseller: true,
    updated: 'Updated 2025',
  },
  {
    id: 3,
    title: 'Python for Data Science & Machine Learning',
    instructor: 'Dr. Emily Rodriguez',
    instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 4.9,
    reviews: 15670,
    students: 56780,
    price: 94.99,
    originalPrice: 209.99,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '48',
    bestseller: true,
    updated: 'Updated 2025',
  },
  {
    id: 4,
    title: 'iOS App Development with Swift & SwiftUI',
    instructor: 'James Wilson',
    instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 4.7,
    reviews: 6340,
    students: 23450,
    price: 84.99,
    originalPrice: 189.99,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    category: 'Mobile Development',
    level: 'Beginner',
    duration: '38',
    bestseller: false,
    updated: 'Updated 2025',
  },
  {
    id: 5,
    title: 'Master Deep Learning & Neural Networks',
    instructor: 'Dr. Alex Kumar',
    instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 4.8,
    reviews: 9870,
    students: 38920,
    price: 99.99,
    originalPrice: 219.99,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    category: 'AI & ML',
    level: 'Advanced',
    duration: '52',
    bestseller: true,
    updated: 'Updated 2025',
  },
  {
    id: 6,
    title: 'Full Stack JavaScript: Node.js & Express',
    instructor: 'Lisa Anderson',
    instructorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    rating: 4.7,
    reviews: 7650,
    students: 29340,
    price: 74.99,
    originalPrice: 169.99,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '40',
    bestseller: false,
    updated: 'Updated 2025',
  },
  {
    id: 7,
    title: 'Android Development Masterclass',
    instructor: 'David Park',
    instructorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    rating: 4.6,
    reviews: 5430,
    students: 19870,
    price: 79.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
    category: 'Mobile Development',
    level: 'Beginner',
    duration: '45',
    bestseller: false,
    updated: 'Updated 2025',
  },
  {
    id: 8,
    title: 'AWS Cloud Practitioner Complete Course',
    instructor: 'Robert Taylor',
    instructorImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80',
    rating: 4.8,
    reviews: 11230,
    students: 42560,
    price: 89.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    category: 'Cloud Computing',
    level: 'Beginner',
    duration: '36',
    bestseller: true,
    updated: 'Updated 2025',
  },
  {
    id: 10,
    title: 'Complete Web Development Bootcamp 2025',
    instructor: 'Sarah Johnson',
    instructorImage: 'https://beecrowd.com/wp-content/uploads/2024/04/2022-07-19-Melhores-cursos-de-Python.jpg',
    rating: 4.9,
    reviews: 12450,
    students: 45230,
    price: 89.99,
    originalPrice: 159.99,
    image: 'https://beecrowd.com/wp-content/uploads/2024/04/2022-07-19-Melhores-cursos-de-Python.jpg',
    category: 'Web Development',
    level: 'Beginner',
    duration: '42',
    bestseller: true,
    updated: 'Updated 2025',
  },
];

// Helper function to read courses, falling back to defaults
async function readCourses(): Promise<Course[]> {
  try {
    const json = await fs.readFile(filePath, "utf8");
    const courses: Course[] = JSON.parse(json);
    if (!courses || courses.length === 0) {
      // Initialize the file with default courses
      await fs.writeFile(filePath, JSON.stringify(defaultCourses, null, 2));
      return defaultCourses;
    }
    return courses;
  } catch (err) {
    console.error("Error reading courses.json, initializing with defaults:", err);
    // Initialize file with defaults if missing
    await fs.writeFile(filePath, JSON.stringify(defaultCourses, null, 2));
    return defaultCourses;
  }
}

// GET all courses
export async function GET() {
  try {
    const courses = await readCourses();
    return NextResponse.json(courses);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Failed to load courses" }, { status: 500 });
  }
}

// POST new course
export async function POST(req: NextRequest) {
  try {
    const newCourse: Partial<Course> = await req.json();

    if (!newCourse.title || !newCourse.instructor || !newCourse.price || !newCourse.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const courses = await readCourses();

    const nextId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const courseToAdd: Course = { ...newCourse, id: nextId } as Course;

    courses.push(courseToAdd);

    await fs.writeFile(filePath, JSON.stringify(courses, null, 2));

    return NextResponse.json({ message: "Course added", course: courseToAdd });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Failed to add course" }, { status: 500 });
  }
}

// DELETE a course
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) throw new Error("Missing course ID");

    let courses = await readCourses();

    courses = courses.filter((course: Course) => course.id !== id);

    await fs.writeFile(filePath, JSON.stringify(courses, null, 2));

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
