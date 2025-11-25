"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EnrollButtonProps {
  courseId: string;
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  // Check login + enrollment
  useEffect(() => {
    const checkEnrollment = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return; // user not logged in
      setUserId(user.id);

      const { data } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();

      if (data) setEnrolled(true);
    };

    checkEnrollment();
  }, [courseId]);

  const handleToggleEnroll = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      if (enrolled) {
        const { error } = await supabase
          .from("enrollments")
          .delete()
          .eq("user_id", userId)
          .eq("course_id", courseId);

        if (error) throw error;

        toast.success("Unenrolled successfully.");
        setEnrolled(false);
      } else {
        const { error } = await supabase.from("enrollments").insert({
          course_id: courseId,
          user_id: userId,
          enrolled_at: new Date().toISOString(),
        });

        if (error) throw error;

        toast.success("Enrolled successfully!");
        setEnrolled(true);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Enrollment failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // button text depending on user state
  const text = !userId
    ? "Login to Enroll"
    : loading
    ? "Processing..."
    : enrolled
    ? "Unenroll"
    : "Enroll Now";

  // disabled when not logged in or loading
  const disabled = loading || !userId;

  return (
    <button
      onClick={handleToggleEnroll}
      disabled={disabled}
      className={`px-8 py-4 rounded-full font-bold text-lg shadow-lg transition
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : enrolled
            ? "bg-red-500 text-white hover:scale-105"
            : "bg-indigo-600 text-white hover:scale-105"
        }`}
    >
      {text}
    </button>
  );
}
