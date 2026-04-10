"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ADMIN_NAV_ITEMS,
  ADMIN_PASSWORD,
  ADMIN_SESSION_KEY,
} from "@/components/admin/config";

function getSectionMeta(pathname: string) {
  return (
    ADMIN_NAV_ITEMS.find((item) =>
      item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href),
    ) ?? ADMIN_NAV_ITEMS[0]
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const section = useMemo(() => getSectionMeta(pathname), [pathname]);
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_SESSION_KEY);
    setAuthed(saved === "1");
    setReady(true);
  }, []);

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      setLoginError("");
      setAuthed(true);
      return;
    }

    setLoginError("Incorrect password. Please try again.");
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthed(false);
    setPassword("");
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center text-sm text-[#888]">
        Loading admin panel...
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center px-4">
        <div className="bg-white border border-[#eee] p-8 w-full max-w-sm rounded-[20px] shadow-[0_20px_60px_rgba(45,74,62,0.08)]">
          <div className="w-12 h-12 bg-[#2D4A3E] rounded-[14px] flex items-center justify-center mb-4">
            <span className="text-white text-xl">V</span>
          </div>
          <p className="text-[#D9B59D] text-xs uppercase tracking-[0.3em] mb-2">
            Vihara Admin
          </p>
          <h1 className="text-2xl font-normal text-[#1a1a1a] mb-1">
            Universal Admin Panel
          </h1>
          <p className="text-sm text-[#777] mb-6">
            One login for bookings, calendar, finance, and operations.
          </p>
          <label className="text-xs text-[#555] mb-1 block">Password</label>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-[#ddd] px-3 py-2.5 text-sm outline-none focus:border-[#2D4A3E] transition-colors mb-3 rounded-lg"
          />
          {loginError && (
            <p className="text-xs text-red-500 mb-3">{loginError}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-[#2D4A3E] text-white py-2.5 text-sm font-medium rounded-lg hover:bg-[#1C3028] transition-colors"
          >
            Sign In {"->"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#1a1a1a]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full lg:w-[280px] bg-[#24372F] text-white border-r border-white/10">
          <div className="px-6 py-6 border-b border-white/10">
            <p className="text-[#D9B59D] text-xs uppercase tracking-[0.3em] mb-2">
              Vihara
            </p>
            <h1 className="text-xl font-medium">Admin Panel</h1>
            <p className="text-sm text-white/60 mt-2">
              One place for bookings, schedule, and operations.
            </p>
          </div>

          <nav className="px-4 py-5 space-y-2">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-2xl px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-[#D9B59D] text-[#1a1a1a]"
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  <p className="text-sm font-medium">{item.label}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isActive ? "text-[#5f5247]" : "text-white/60"
                    }`}
                  >
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </nav>

          <div className="px-4 pb-6 mt-auto">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                Access
              </p>
              <p className="text-sm text-white/75 mb-4">
                Signed in to the shared admin workspace.
              </p>
              <button
                onClick={handleLogout}
                className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="border-b border-[#e9e2d7] bg-[#F5F1EA]/95 backdrop-blur px-6 py-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#B28B72] mb-2">
              Universal Admin
            </p>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-medium">{section.label}</h2>
                <p className="text-sm text-[#6f6a63] mt-1">
                  {section.description}
                </p>
              </div>
              <div className="rounded-full border border-[#ddd] bg-white px-3 py-1.5 text-xs text-[#666]">
                Single-password workspace
              </div>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6 sm:py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
