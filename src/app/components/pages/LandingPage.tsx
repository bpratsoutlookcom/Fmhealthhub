import React from "react";
import { useNavigate } from "react-router";
import {
  CalendarDays,
  Clock,
  Smartphone,
  Shield,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Zap,
} from "lucide-react";
import heroImage from "figma:asset/faa37d52dc1afca24c5eb6be76311e61e6ebfa62.png";
import featureImage1 from "figma:asset/6e0b4ac764995516584fb48a9bca8009cce69f88.png";
import featureImage2 from "figma:asset/12a47b9225913f93c9b4a7d2dd73c125f4564b57.png";
import {
  CalendarIllustration,
  ClockIllustration,
  BookingIllustration,
  WhatsAppIllustration,
} from "../illustrations/HealthIllustrations";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <span className="text-teal-800 tracking-tight" style={{ fontSize: "1.15rem", fontWeight: 700 }}>
              Health Hub
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-xl text-teal-700 hover:bg-teal-50 transition-colors"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              Iniciar sesion
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-sm"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              Empezar gratis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-100 text-teal-700 rounded-full mb-6" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                <Zap className="w-3.5 h-3.5" />
                Plataforma de turnos para profesionales de salud
              </div>
              <h1 className="text-teal-800 mb-5" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.15 }}>
                Deja de gestionar turnos por WhatsApp.{" "}
                <span className="text-teal-500">Automatiza tu agenda.</span>
              </h1>
              <p className="text-muted-foreground mb-8 max-w-lg" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                Link publico, agenda configurable, reserva autonoma y recordatorios
                automaticos. Todo lo que necesitas para reducir no-shows y ahorrar
                tiempo.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Crear mi perfil gratis
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate("/dr/laura-mendez")}
                  className="px-6 py-3 rounded-xl bg-white text-teal-700 border border-teal-200 hover:bg-teal-50 transition-all flex items-center gap-2"
                  style={{ fontSize: "0.95rem", fontWeight: 500 }}
                >
                  Ver demo
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" /> Sin costo inicial
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" /> Sin tarjeta
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" /> Multi-sede
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden bg-cream-200 shadow-xl">
                  <img
                    src={heroImage}
                    alt="Profesional de salud y paciente conectados"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                    <CalendarDays className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-teal-800" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Turno confirmado</p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.65rem" }}>Hoy 09:30hs</p>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-white rounded-2xl p-3 shadow-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-salmon-100 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-salmon-500" />
                  </div>
                  <div>
                    <p className="text-teal-800" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Recordatorio enviado</p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.65rem" }}>WhatsApp auto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-teal-800 mb-3" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              Asi de simple funciona
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto" style={{ fontSize: "1rem" }}>
              En tres pasos tu paciente reserva un turno. Sin WhatsApp, sin llamadas, sin esperas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Configura tu perfil",
                desc: "Crea tu perfil con tus sedes, horarios y especialidad. Obtene tu link unico.",
                illustration: <CalendarIllustration className="w-32 h-32" />,
              },
              {
                step: "2",
                title: "Tu paciente reserva",
                desc: "Comparte tu link. El paciente elige horario y confirma en segundos.",
                illustration: <BookingIllustration className="w-32 h-32" />,
              },
              {
                step: "3",
                title: "Recordatorios automaticos",
                desc: "Email inmediato + WhatsApp 24h antes. Reduce no-shows hasta un 70%.",
                illustration: <ClockIllustration className="w-32 h-32" />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center p-6 rounded-2xl bg-cream-50 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">{item.illustration}</div>
                <div className="inline-flex w-8 h-8 rounded-full bg-teal-500 text-white items-center justify-center mb-3" style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                  {item.step}
                </div>
                <h3 className="text-teal-800 mb-2" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Feature 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden bg-cream-200 shadow-lg">
                <img
                  src={featureImage1}
                  alt="Gestion de agenda profesional"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-teal-800 mb-4" style={{ fontSize: "1.6rem", fontWeight: 700 }}>
                Agenda inteligente multi-sede
              </h2>
              <p className="text-muted-foreground mb-6" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                Configura horarios distintos por sede, bloquea manualmente cuando necesites y nunca mas te preocupes por dobles turnos.
              </p>
              <div className="space-y-3">
                {[
                  "Disponibilidad semanal configurable",
                  "Multiples sedes y modalidades",
                  "Prevencion de doble booking",
                  "Vista calendario clara e intuitiva",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <span className="text-teal-800" style={{ fontSize: "0.9rem" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-teal-800 mb-4" style={{ fontSize: "1.6rem", fontWeight: 700 }}>
                Tus pacientes gestionan sus turnos
              </h2>
              <p className="text-muted-foreground mb-6" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                Sin cuenta, sin app. Con un link magico acceden a sus turnos, reprograman o cancelan. Vos te enfocas en lo que importa.
              </p>
              <div className="space-y-3">
                {[
                  "Acceso por link magico (sin contraseña)",
                  "Ver, reprogramar y cancelar turnos",
                  "Notificaciones por WhatsApp y email",
                  "Liberacion automatica de horarios",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-salmon-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-salmon-500" />
                    </div>
                    <span className="text-teal-800" style={{ fontSize: "0.9rem" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden bg-cream-200 shadow-lg">
                <img
                  src={featureImage2}
                  alt="Pacientes gestionando sus turnos"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-teal-800 mb-3" style={{ fontSize: "1.6rem", fontWeight: 700 }}>
              Por que Health Hub
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Smartphone,
                title: "Mas simple que WhatsApp",
                desc: "Tu paciente elige horario sin escribirte. Automatico.",
                color: "teal",
              },
              {
                icon: Shield,
                title: "Mas profesional",
                desc: "Link propio, perfil verificado, confirmaciones automaticas.",
                color: "teal",
              },
              {
                icon: RefreshCw,
                title: "Menos no-shows",
                desc: "Recordatorios 24h antes con opcion de confirmar, cancelar o reprogramar.",
                color: "salmon",
              },
              {
                icon: Clock,
                title: "Ahorra horas por semana",
                desc: "Sin coordinar horarios manualmente. El sistema hace todo.",
                color: "salmon",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-cream-50 border border-border hover:shadow-md transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${
                    item.color === "teal" ? "bg-teal-100" : "bg-salmon-100"
                  } flex items-center justify-center mb-4`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.color === "teal" ? "text-teal-600" : "text-salmon-500"
                    }`}
                  />
                </div>
                <h3 className="text-teal-800 mb-2" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <WhatsAppIllustration className="w-24 h-24 mx-auto mb-6" />
          <h2 className="text-teal-800 mb-4" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            Empieza hoy. Es gratis.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            Crea tu perfil en minutos, configura tu agenda y comparte tu link con tus pacientes.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            Crear mi perfil profesional
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <span className="text-teal-800" style={{ fontSize: "0.9rem", fontWeight: 600 }}>Health Hub</span>
          </div>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
            2026 Health Hub. Simplificando la salud.
          </p>
        </div>
      </footer>
    </div>
  );
}