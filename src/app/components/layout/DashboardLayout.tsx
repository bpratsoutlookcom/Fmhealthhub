import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  Link2,
  LogOut,
  Menu,
  X,
  Bell,
  Zap,
} from "lucide-react";
import { mockProfessional } from "../../data/mockData";

const navItems = [
  { to: "/dashboard", label: "Panel", icon: LayoutDashboard, end: true },
  { to: "/dashboard/perfil", label: "Mi Perfil", icon: User, end: false },
  { to: "/dashboard/agenda", label: "Agenda", icon: CalendarDays, end: false },
  { to: "/dashboard/integraciones", label: "Integraciones", icon: Zap, end: false },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-cream-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[272px] bg-white border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <span className="text-teal-800 tracking-tight" style={{ fontSize: "1.15rem", fontWeight: 700 }}>
              Health Hub
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-cream-100 text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-teal-500 text-white shadow-sm"
                    : "text-teal-800 hover:bg-teal-50"
                }`
              }
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span style={{ fontSize: "0.9rem" }}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Public link */}
        <div className="px-3 pb-3">
          <button
            onClick={() => navigate(`/dr/${mockProfessional.slug}`)}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-salmon-500 hover:bg-salmon-100 transition-all duration-200"
          >
            <Link2 className="w-[18px] h-[18px]" />
            <span style={{ fontSize: "0.9rem" }}>Ver perfil publico</span>
          </button>
        </div>

        {/* User area */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-teal-700" style={{ fontSize: "0.8rem", fontWeight: 600 }}>LM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-teal-800 truncate" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                {mockProfessional.name}
              </p>
              <p className="text-muted-foreground truncate" style={{ fontSize: "0.75rem" }}>
                {mockProfessional.specialty}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-1.5 rounded-lg hover:bg-cream-100 text-muted-foreground transition-colors"
              aria-label="Cerrar sesion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-border flex items-center px-4 lg:px-8 justify-between shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-cream-100 text-teal-800"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-cream-100 text-muted-foreground relative" aria-label="Notificaciones">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-salmon-400 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}