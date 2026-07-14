import { useState } from "react";

import Modal from "../ui/Modal";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { authService } from "../../services/authService";

export default function RegisterModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Semua field wajib diisi.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authService.signUp({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
      });

      if (error) throw error;

      alert("Registrasi berhasil 🎉");

      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-full max-w-md shadow-none p-5 sm:p-7">
        <h2 className="text-2xl font-bold sm:text-3xl">Create Account</h2>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Daftar untuk mulai menggunakan NoteFlow.
        </p>

        <div className="mt-5 space-y-4 sm:mt-6">
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <Button
            className="h-11 w-full sm:h-12"
            loading={loading}
            onClick={handleRegister}
          >
            Create Account
          </Button>
        </div>
      </Card>
    </Modal>
  );
}
