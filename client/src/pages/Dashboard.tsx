import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { Trash2, Upload, Plus, LogOut } from "lucide-react";

interface Note {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  });

  api.interceptors.request.use(async (config) => {
    const token = await user?.getIdToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("image", file);

    try {
      const res = await api.post("/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNotes([res.data, ...notes]);
      setTitle("");
      setContent("");
      setFile(null);
    } catch (err) {
      console.error("Failed to create note", err);
      alert("Error creating note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Lead Notes</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hello, {user?.displayName}</span>
          <button
            onClick={() => auth.signOut()}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Add a New Lead Note</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Lead Title (e.g., Meeting with Acme Corp)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <textarea
              placeholder="Note details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none h-24"
              required
            />

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-indigo-600">
                <Upload size={20} />
                <span className="text-sm">
                  {file ? file.name : "Attach Image"}
                </span>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  accept="image/*"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Plus size={18} /> Add Note
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
            >
              {note.imageUrl && (
                <img
                  src={note.imageUrl}
                  alt={note.title}
                  className="w-full h-auto max-h-96 object-contain bg-gray-900"
                />
              )}
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{note.title}</h3>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            </div>
          ))}

          {notes.length === 0 && (
            <p className="text-center col-span-2 text-gray-400 py-8">
              No notes yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
