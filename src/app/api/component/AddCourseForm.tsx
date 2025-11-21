"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface AddCourseFormProps {
  onAdd: () => void;
  onClose?: () => void;
}

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

export default function AddCourseForm({ onAdd }: AddCourseFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [toastList, setToastList] = useState<Toast[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    price: "",
    category: "",
    duration: "",
    originalprice: "",
    image: "",
    instructorimage: "",
  });

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToastList((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToastList((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      instructor: "",
      price: "",
      category: "",
      duration: "",
      originalprice: "",
      image: "",
      instructorimage: "",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("courses").insert({
      title: formData.title,
      instructor: formData.instructor,
      price: Number(formData.price),
      category: formData.category,
      duration: formData.duration,
      originalprice: Number(formData.originalprice),
      image: formData.image,
      instructorimage: formData.instructorimage,
      created_at: new Date(),
    });

    setLoading(false);

    if (error) return showToast(error.message, "error");

    showToast("Course added successfully!", "success");
    resetForm();
    setIsOpen(false);
    onAdd();
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        + Add Course
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-xl space-y-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Add New Course</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  required
                  type="text"
                  placeholder="Course title"
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <input
                  required
                  type="text"
                  placeholder="Instructor name"
                  className="input"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />

                <input
                  required
                  type="number"
                  placeholder="Price"
                  className="input"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />

                <input
                  required
                  type="text"
                  placeholder="Category"
                  className="input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />

                <input
                  required
                  type="text"
                  placeholder="Duration (e.g. 20 hours)"
                  className="input"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />

                <input
                  required
                  type="number"
                  placeholder="Original price"
                  className="input"
                  value={formData.originalprice}
                  onChange={(e) => setFormData({ ...formData, originalprice: e.target.value })}
                />

                <input
                  required
                  type="url"
                  placeholder="Course Image URL"
                  className="input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />

                <input
                  required
                  type="url"
                  placeholder="Instructor Image URL"
                  className="input"
                  value={formData.instructorimage}
                  onChange={(e) => setFormData({ ...formData, instructorimage: e.target.value })}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  {loading ? "Adding..." : "Add Course"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Messages */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toastList.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 text-white rounded shadow ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}
