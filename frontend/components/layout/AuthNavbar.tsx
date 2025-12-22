import Link from "next/link";

interface AuthNavbarProps {
  type: "login" | "register";
}

export default function AuthNavbar({ type }: AuthNavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-sage-light px-6 py-4 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-display text-xl shadow-sm group-hover:bg-[#c08d5f] transition-colors">
              N
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800">
              NoTA
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600 hidden sm:inline">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <Link
            href={type === "login" ? "/register" : "/login"}
            className={
              type === "login"
                ? "inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary hover:bg-[#c08d5f] text-white shadow-md hover:shadow-lg transition-all gap-2 font-medium text-sm"
                : "bg-background-light hover:bg-white text-gray-700 px-5 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-2 font-medium text-sm border-2 border-transparent hover:border-primary/20"
            }
          >
            {type === "login" ? (
              <span className="material-icons-round text-lg">person_add</span>
            ) : (
              <span className="material-icons-round text-lg">login</span>
            )}
            {type === "login" ? "Register" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
