"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  user: { name: string; email: string; avatar: string };
}

export default function ProfileForm({ user }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: user.name, avatar: user.avatar });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const hasCloudinary = process.env.NEXT_PUBLIC_HAS_CLOUDINARY === "true";

    if (!hasCloudinary) {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, avatar: url }));
      toast.info("Cloudinary not configured - using preview only");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    setUploading(false);

    if (res.ok) {
      const { url } = await res.json();
      setForm((prev) => ({ ...prev, avatar: url }));
      toast.success("Photo uploaded!");
    } else {
      toast.error("Upload failed");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      toast.success("Profile updated!");
      router.refresh();
    } else {
      const data = await res.json();
      toast.error(data.error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Profile Photo</label>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {form.avatar ? (
              <Image
                src={form.avatar}
                alt="Avatar"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              form.name?.charAt(0)?.toUpperCase() ?? "?"
            )}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="gap-2"
            >
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Uploading..." : "Upload Photo"}
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Full Name</label>
        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input value={user.email} disabled className="cursor-not-allowed opacity-60" />
        <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed</p>
      </div>

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-900/20">
          <CheckCircle className="h-4 w-4" /> Profile updated successfully
        </div>
      )}

      <Button type="submit" className="w-full font-semibold" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
