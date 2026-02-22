import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CalendarDays, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import heroImage from "figma:asset/faa37d52dc1afca24c5eb6be76311e61e6ebfa62.png";

export function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
              <span className="text-teal-800 tracking-tight" style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                Health Hub
              </span>
            </button>
          </div>

          <h1 className="text-teal-800 mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            {isRegister ? "Crea tu cuenta" : "Bienvenido de vuelta"}
          </h1>
          <p className="text-muted-foreground mb-8" style={{ fontSize: "0.95rem" }}>
            {isRegister
              ? "Empieza a gestionar tu agenda profesional"
              : "Accede a tu panel de turnos"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-teal-800 mb-1.5"
                  style={{ fontSize: "0.85rem", fontWeight: 500 }}
                >
                  Nombre completo
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dra. Maria Garcia"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-teal-800 mb-1.5"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-teal-800 mb-1.5"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-teal-700"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm flex items-center justify-center gap-2 mt-6"
              style={{ fontSize: "0.95rem", fontWeight: 600 }}
            >
              {isRegister ? "Crear cuenta" : "Iniciar sesion"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center mt-6 text-muted-foreground" style={{ fontSize: "0.85rem" }}>
            {isRegister ? "Ya tenes cuenta?" : "No tenes cuenta?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-teal-600 hover:text-teal-700 underline"
              style={{ fontWeight: 500 }}
            >
              {isRegister ? "Inicia sesion" : "Registrate gratis"}
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-teal-50">
        <div className="max-w-md">
          <div className="rounded-3xl overflow-hidden shadow-xl mb-8">
            <img
              src={heroImage}
              alt="Conexion profesional-paciente"
              className="w-full h-auto"
            />
          </div>
          <div className="text-center">
            <p className="text-teal-800 mb-2" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              "Deje de perder 2 horas por dia coordinando turnos por WhatsApp"
            </p>
            <p className="text-teal-600" style={{ fontSize: "0.85rem" }}>
              — Dra. Laura Mendez, Ginecologia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}