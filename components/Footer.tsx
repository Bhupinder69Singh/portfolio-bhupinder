"use client";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 border-t border-slate-700/40 bg-[#030712] text-center">
      <p className="text-slate-300 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">Bhupinder Singh Sahmey</span>
      </p>
      <p className="text-slate-400 text-xs mt-2 font-mono tracking-wide">
        Backend · Cloud · Data Systems
      </p>
    </footer>
  );
}
