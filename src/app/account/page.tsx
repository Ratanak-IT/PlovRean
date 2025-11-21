'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function AccountPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // storage path
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(""); // local preview
  const [loading, setLoading] = useState(false);

  // Load profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("profiless")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        // Create profile if not exists
        await supabase.from("profiless").insert({
          id: user.id,
          full_name: "",
          email: user.email,
          avatar_url: "",
        });
        return;
      }

      setFullName(data.full_name || "");
      setAvatarUrl(data.avatar_url || "");
    };

    loadProfile();
  }, []);

  // Upload avatar and delete old one
  const uploadAvatar = async () => {
    if (!avatarFile) return avatarUrl;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return avatarUrl;

    // Delete old avatar if exists
    if (avatarUrl) {
      const { error: delError } = await supabase.storage
        .from("avatars")
        .remove([avatarUrl]);
      if (delError) console.log("Failed to delete old avatar:", delError.message);
    }

    const fileName = `${user.id}/${Date.now()}_${avatarFile.name}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatarFile, { upsert: true });

    if (error) {
      console.log("Upload error:", error.message);
      return avatarUrl;
    }

    return data.path;
  };

  // Update profile
  const updateProfile = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let storedAvatar = avatarUrl;
    if (avatarFile) storedAvatar = await uploadAvatar();

    const { error } = await supabase
      .from("profiless")
      .update({
        full_name: fullName.trim(),
        avatar_url: storedAvatar,
        updated_at: new Date(),
      })
      .eq("id", user.id);

    setLoading(false);

    if (!error) {
      setAvatarUrl(storedAvatar);
      setAvatarFile(null);
      setPreviewUrl("");
      alert("Profile updated successfully!");
    }
  };

  // Get public URL from storage path
  const getPublicUrl = (path: string) => {
    if (!path) return "/default-avatar.png";
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl || "/default-avatar.png";
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-12">
      {/* Banner + Avatar */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="absolute -bottom-12 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
          <Image
            src={previewUrl || getPublicUrl(avatarUrl)}
            width={128}
            height={128}
            alt="avatar"
            className="object-cover"
          />
        </div>
      </div>

      {/* Change Avatar */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded">
          Change Avatar
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setAvatarFile(file);
              if (file) setPreviewUrl(URL.createObjectURL(file));
            }}
          />
        </label>
      </div>

      {/* Profile Form */}
      <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded dark:bg-gray-800 dark:text-white opacity-70 cursor-not-allowed"
          />
        </div>

        <button
          onClick={updateProfile}
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded font-medium"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
