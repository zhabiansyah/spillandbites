"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (status: "Draft" | "Published") => {
    setSubmitting(true);
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, status }),
    });
    setSubmitting(false);
    if (res.ok) {
      router.push("/admin/articles");
      router.refresh();
    } else {
      alert("Gagal menyimpan artikel.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-extrabold text-orange-600">
        Artikel Baru
      </h1>
      <p className="mt-1 text-sm text-black">
        Tulis konten artikel/blog untuk website Spill &amp; Bites.
      </p>

      <div className="mt-6 space-y-4 rounded-2xl border border-black/10 bg-white p-6">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/60">
            Judul
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul artikel"
            className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/60">
            Ringkasan singkat
          </label>
          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Satu kalimat ringkasan"
            className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/60">
            Isi Artikel
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="Tulis isi artikel di sini..."
            className="w-full resize-y rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            disabled={submitting || !title || !content}
            onClick={() => submit("Draft")}
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black hover:bg-black/5 disabled:opacity-50"
          >
            Simpan sebagai Draft
          </button>
          <button
            disabled={submitting || !title || !content}
            onClick={() => submit("Published")}
            className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700 disabled:opacity-50"
          >
            Terbitkan
          </button>
        </div>
      </div>
    </div>
  );
}
