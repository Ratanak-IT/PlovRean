"use client";

import { useEffect, useState } from "react";
import AddCourseForm from "../api/component/AddCourseForm";
import CourseTable from "../api/component/Coursetable";

export interface Course {
  id: number;
  title: string;
  description?: string;
  instructor: string;
  price: number;
  category: string;
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Change these to your desired credentials
  const correctUsername = "admin";
  const correctPassword = "admin123";

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${window.location.origin}/api/courses`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    if (authorized) fetchCourses();
  }, [authorized]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === correctUsername && password === correctPassword) {
      setAuthorized(true);
      setError("");
    } else {
      setError("Incorrect username or password");
      setUsername("");
      setPassword("");
    }
  };

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLoginSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-semibold mb-4">Dashboard Login</h2>
          
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-8">
        <AddCourseForm onAdd={fetchCourses} />
      </div>

      <CourseTable courses={courses} onDelete={fetchCourses} />
    </div>
  );
}
