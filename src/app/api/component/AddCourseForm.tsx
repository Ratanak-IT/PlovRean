"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AddCourseFormProps {
  onAdd: () => void;
}

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

export default function AddCourseForm({ onAdd }: AddCourseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    image: "",
    price: "",
    category: "",
    instructorImage: "",
    originalPrice: "",
    duration: "",
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation: all fields required
    const isEmpty = Object.values(formData).some((v) => v.trim() === "");
    if (isEmpty) {
      showToast("Please fill in all fields before adding a course.", "error");
      return;
    }

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add course");

      setFormData({
        title: "",
        instructor: "",
        image: "",
        price: "",
        category: "",
        instructorImage: "",
        originalPrice: "",
        duration: "",
      });

      showToast("Course added successfully!", "success");
      onAdd(); // refresh table
    } catch (err) {
      console.error(err);
      showToast("Error adding course. Please try again.", "error");
    }
  };

  return (
    <div className="relative">
      {/* Toast container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`px-4 py-3 rounded shadow text-white flex items-center justify-between min-w-[250px] ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span>{toast.message}</span>
              <button
                className="ml-4"
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
        <input
          type="text"
          placeholder="Course Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Instructor Name"
          value={formData.instructor}
          onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Instructor Image URL"
          value={formData.instructorImage}
          onChange={(e) =>
            setFormData({ ...formData, instructorImage: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Original Price"
          value={formData.originalPrice}
          onChange={(e) =>
            setFormData({ ...formData, originalPrice: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Hours Duration (e.g., 5h 30m)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Course
        </button>
      </form>
    </div>
  );
}
