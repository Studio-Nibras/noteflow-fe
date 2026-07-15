import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, History, CircleHelp } from "lucide-react";

import { authService } from "../services/authService";
import { getProfile } from "../services/profileApi";

import GreetingSection from "../components/profile/GreetingSection";
import ProfileCard from "../components/profile/ProfileCard";
import MenuCard from "../components/profile/MenuCard";
import AccountModal from "../components/profile/AccountModal";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: sessionData } = await authService.getSession();

      const session = sessionData.session;

      if (!session) {
        navigate("/landing");
        return;
      }

      const user = session.user;

      const response = await getProfile({
        userId: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email.split("@")[0],
      });

      setProfile(response.data.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-red-500">Gagal memuat profile.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl p-8">
        <GreetingSection
          name={profile.name}
          learningPoint={profile.learningPoint}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}

          <div className="lg:col-span-1">
            <ProfileCard {...profile} />
          </div>

          {/* Menu */}

          <div className="lg:col-span-2 space-y-5">
            <MenuCard
              icon={<Settings size={22} />}
              title="Pengaturan Akun"
              subtitle="Kelola informasi akun Anda"
              onClick={() => setShowAccount(true)}
            />

            <MenuCard
              icon={<History size={22} />}
              title="Riwayat Aktivitas"
              subtitle="Lihat perkembangan belajar Anda"
              onClick={() => navigate("/history")}
            />

            <MenuCard
              icon={<CircleHelp size={22} />}
              title="Pusat Bantuan"
              subtitle="FAQ dan panduan penggunaan"
              onClick={() => navigate("/faq")}
            />
          </div>
        </div>
      </div>

      <AccountModal
        open={showAccount}
        onClose={() => setShowAccount(false)}
        profile={profile}
      />
    </>
  );
}
