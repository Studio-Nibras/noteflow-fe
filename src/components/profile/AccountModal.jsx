import { useState } from "react";
import { X, User, Mail, Lock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/authService";

export default function AccountModal({ open, onClose, profile }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Yakin ingin logout?");

    if (!confirmLogout) return;

    try {
      setLoading(true);

      await authService.signOut();

      localStorage.clear();

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Gagal logout.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    alert("Fitur ubah password akan segera tersedia 🚀");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 hover:bg-slate-100 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}

        <h2 className="text-2xl font-bold text-slate-800">Pengaturan Akun</h2>

        <p className="mt-1 text-sm text-slate-500">
          Kelola informasi akun Anda.
        </p>

        {/* User */}

        <div className="mt-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <User size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Nama</p>

              <p className="font-semibold text-slate-800">{profile?.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Mail size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>

              <p className="font-semibold text-slate-800 break-all">
                {profile?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-8 space-y-3">
          <button
            onClick={handleChangePassword}
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              p-4
              flex
              items-center
              gap-3
              hover:bg-slate-50
              transition
            "
          >
            <Lock size={20} />

            <span className="font-medium">Ubah Password</span>
          </button>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="
              w-full
              rounded-2xl
              bg-red-500
              text-white
              p-4
              flex
              items-center
              justify-center
              gap-3
              hover:bg-red-600
              transition
              disabled:opacity-60
            "
          >
            <LogOut size={20} />

            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
