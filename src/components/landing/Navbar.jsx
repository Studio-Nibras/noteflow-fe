import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        <span className="text-black">Note</span>
        <span className="text-blue-600">Flow</span>
      </h1>

      <div className="hidden gap-10 md:flex">
        <a href="#features">Features</a>

        <a href="#about">About</a>
      </div>

      <Link to="#" className="font-semibold">
        Login
      </Link>
    </nav>
  );
}
