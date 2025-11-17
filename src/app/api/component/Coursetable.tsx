"use client";

import Image from "next/image";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  category: string;
  image?: string;
  instructorImage?: string;
  originalPrice?: number;
  duration?: string;
}

interface CourseTableProps {
  courses: Course[];
  onDelete: () => void;
}

export default function CourseTable({ courses, onDelete }: CourseTableProps) {
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
    onDelete();
  };

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
          <th className="border p-2">Image</th>
          <th className="border p-2">Title</th>
          <th className="border p-2">Instructor</th>
          <th className="border p-2">Instructor Image</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Original Price</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Duration</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td className="border p-2">{course.id}</td>

            <td className="border p-2">
              {course.image ? (
                <Image src={course.image} alt={course.title} width={64} height={40} className="object-cover" />
              ) : (
                "-"
              )}
            </td>

            <td className="border p-2">{course.title}</td>
            <td className="border p-2">{course.instructor}</td>

            <td className="border p-2">
              {course.instructorImage ? (
                <Image
                  src={course.instructorImage}
                  alt={course.instructor}
                    width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              ) : (
                "-"
              )}
            </td>

            <td className="border p-2">${course.price}</td>
            <td className="border p-2">{course.originalPrice ? `$${course.originalPrice}` : "-"}</td>
            <td className="border p-2">{course.category}</td>
            <td className="border p-2">{course.duration}</td>

            <td className="border p-2">
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(course.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
