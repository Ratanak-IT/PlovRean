'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function AccountPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        console.log("No profile found, creating one...");
        await supabase.from("profiles").insert({
          id: user.id,
          full_name: "",
          email: user.email,
          avatar_url: "",
        });
      } else {
        setFullName(data.full_name || "");
        setAvatarUrl(data.avatar_url || "");
      }
    };

    fetchProfile();
  }, []);

  // Upload avatar
  const uploadAvatar = async () => {
    if (!avatarFile) return avatarUrl;

    setLoading(true);
    const fileName = `${Date.now()}_${avatarFile.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatarFile, { upsert: true });

    if (uploadError) {
      console.log("Error uploading avatar:", uploadError.message);
      setLoading(false);
      return avatarUrl;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(uploadData.path);

    const publicUrl = urlData?.publicUrl || "";
    setAvatarUrl(publicUrl);
    setLoading(false);
    return publicUrl;
  };

  // Update profile
  const updateProfile = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let newAvatarUrl = avatarUrl;
    if (avatarFile) {
      newAvatarUrl = await uploadAvatar();
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      email,
      avatar_url: newAvatarUrl,
    });

    if (error) console.log("Error updating profile:", error.message);
    else alert("Profile updated successfully!");

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      {/* Banner with Avatar */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
        {avatarUrl ? (
          <div className="absolute -bottom-12 w-32 h-32 rounded-full border-4 border-white overflow-hidden">
            <Image src={avatarUrl} alt="avatar" width={128} height={128} className="object-cover" />
          </div>
        ) : (
          <div className="absolute -bottom-12 w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
            ?
          </div>
        )}
      </div>

      {/* Upload Avatar */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded">
          Change Avatar
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {/* Profile Form */}
      <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          onClick={updateProfile}
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded font-medium transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
