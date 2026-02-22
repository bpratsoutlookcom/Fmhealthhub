import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  CalendarDays,
  Clock,
  MapPin,
  Video,
  Building2,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Mail,
  ArrowRight,
  Phone,
  Stethoscope,
  MessageCircle,
  CalendarPlus,
  ChevronDown,
  ChevronUp,
  Send,
  Check,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { mockAppointments, mockProfessional, type Appointment } from "../../data/mockData";
import {
  EmptyStateIllustration,
  MagicLinkIllustration,
} from "../illustrations/HealthIllustrations";

type AccessMethod = "email" | "whatsapp" | null;

export function PatientAppointments() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessMethod, setAccessMethod] = useState<AccessMethod>(null);
  const [accessEmail, setAccessEmail] = useState("");
  const [accessPhone, setAccessPhone] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [appointments, setAppointments] = useState(
    mockAppointments.filter((a) => a.patientEmail === "maria@email.com")
  );
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"proximos" | "historial">("proximos");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const today = new Date().toISOString().split("T")[0];

  const upcomingAppointments = appointments
    .filter((a) => a.date >= today && a.status !== "cancelado")
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });

  const pastAppointments = appointments
    .filter((a) => a.date < today || a.status === "cancelado")
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleAccessByEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessEmail) {
      toast.error("Ingresa tu email");
      return;
    }
    toast.success("Link de acceso enviado!", {
      description: `Revisa tu email ${accessEmail}`,
    });
    // Simulate magic link authentication
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 500);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessPhone) {
      toast.error("Ingresa tu numero de telefono");
      return;
    }
    setOtpSent(true);
    toast.success("Codigo enviado por WhatsApp", {
      description: `Revisa tu WhatsApp en ${accessPhone}`,
    });
  };

  const handleVerifyOtp = () => {
    const code = otpCode.join("");
    if (code.length < 6) {
      toast.error("Completa el codigo de 6 digitos");
      return;
    }
    // Simulate OTP verification
    toast.success("Verificacion exitosa!");
    setIsAuthenticated(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleCancel = (aptId: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status: "cancelado" as const } : a))
    );
    setShowCancelModal(null);
    setCancelReason("");
    toast.success("Turno cancelado", {
      description: "El horario ha sido liberado automaticamente. Recibiras confirmacion por email y WhatsApp.",
    });
  };

  const handleReschedule = (aptId: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status: "cancelado" as const } : a))
    );
    setShowRescheduleModal(null);
    toast.success("Turno liberado", {
      description: "Te redirigimos para elegir un nuevo horario.",
    });
    navigate(`/dr/${mockProfessional.slug}`);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    const todayDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(todayDate.getDate() + 1);

    const dateOnly = (d: Date) => d.toISOString().split("T")[0];

    if (dateOnly(date) === dateOnly(todayDate)) return "Hoy";
    if (dateOnly(date) === dateOnly(tomorrow)) return "Manana";

    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  // ===== ACCESS SCREEN =====
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-50">
        {/* Header */}
        <nav className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-white" />
              </div>
              <span className="text-teal-800 tracking-tight" style={{ fontSize: "1rem", fontWeight: 700 }}>
                Health Hub
              </span>
            </button>
          </div>
        </nav>

        <div className="max-w-md mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <MagicLinkIllustration className="w-32 h-32 mx-auto mb-6" />
            <h1 className="text-teal-800 mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Accede a tus turnos
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
              Sin contraseña. Elige como queres acceder.
            </p>
          </div>

          {/* Access method tabs */}
          <div className="flex bg-cream-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => {
                setAccessMethod("email");
                setOtpSent(false);
                setOtpCode(["", "", "", "", "", ""]);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                accessMethod === "email" || accessMethod === null
                  ? "bg-white text-teal-800 shadow-sm"
                  : "text-muted-foreground hover:text-teal-700"
              }`}
              style={{ fontSize: "0.85rem", fontWeight: 500 }}
            >
              <Mail className="w-4 h-4" />
              Link por email
            </button>
            <button
              onClick={() => {
                setAccessMethod("whatsapp");
                setOtpSent(false);
                setOtpCode(["", "", "", "", "", ""]);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                accessMethod === "whatsapp"
                  ? "bg-white text-teal-800 shadow-sm"
                  : "text-muted-foreground hover:text-teal-700"
              }`}
              style={{ fontSize: "0.85rem", fontWeight: 500 }}
            >
              <MessageCircle className="w-4 h-4" />
              Codigo WhatsApp
            </button>
          </div>

          {/* EMAIL access */}
          {(accessMethod === "email" || accessMethod === null) && (
            <div className="bg-white rounded-2xl border border-border p-6">
              <form onSubmit={handleAccessByEmail} className="space-y-4">
                <div>
                  <label htmlFor="access-email" className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Email con el que reservaste
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="access-email"
                      type="email"
                      value={accessEmail}
                      onChange={(e) => setAccessEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      style={{ fontSize: "0.9rem" }}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm flex items-center justify-center gap-2"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  <Send className="w-4 h-4" />
                  Enviar link de acceso
                </button>
              </form>
              <p className="text-muted-foreground text-center mt-4" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                Recibiras un email con un link unico y seguro para ver tus turnos. El link expira en 24 horas.
              </p>
            </div>
          )}

          {/* WHATSAPP access */}
          {accessMethod === "whatsapp" && (
            <div className="bg-white rounded-2xl border border-border p-6">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label htmlFor="access-phone" className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      Numero de WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="access-phone"
                        type="tel"
                        value={accessPhone}
                        onChange={(e) => setAccessPhone(e.target.value)}
                        placeholder="+54 11 5566 7788"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        style={{ fontSize: "0.9rem" }}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm flex items-center justify-center gap-2"
                    style={{ fontSize: "0.95rem", fontWeight: 600 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar codigo por WhatsApp
                  </button>
                  <p className="text-muted-foreground text-center" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                    Recibiras un codigo de 6 digitos por WhatsApp para verificar tu identidad.
                  </p>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-teal-800 mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>
                      Ingresa el codigo
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                      Enviamos un codigo de 6 digitos a {accessPhone}
                    </p>
                  </div>

                  {/* OTP input */}
                  <div className="flex gap-2 justify-center">
                    {otpCode.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`w-11 h-13 text-center rounded-xl border-2 transition-all outline-none ${
                          digit
                            ? "border-teal-500 bg-teal-50 text-teal-800"
                            : "border-border bg-cream-50 text-teal-800"
                        } focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20`}
                        style={{ fontSize: "1.2rem", fontWeight: 600 }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={otpCode.join("").length < 6}
                    className="w-full py-3 rounded-xl bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2"
                    style={{ fontSize: "0.95rem", fontWeight: 600 }}
                  >
                    Verificar
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => {
                        setOtpCode(["", "", "", "", "", ""]);
                        toast.success("Nuevo codigo enviado");
                      }}
                      className="text-teal-600 hover:text-teal-700 transition-colors"
                      style={{ fontSize: "0.8rem", fontWeight: 500 }}
                    >
                      Reenviar codigo
                    </button>
                    <span className="text-muted-foreground mx-2" style={{ fontSize: "0.8rem" }}>|</span>
                    <button
                      onClick={() => setOtpSent(false)}
                      className="text-muted-foreground hover:text-teal-600 transition-colors"
                      style={{ fontSize: "0.8rem", fontWeight: 500 }}
                    >
                      Cambiar numero
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info box */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-teal-50 rounded-xl border border-teal-100">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-teal-700" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
              No necesitas crear cuenta. Accedes con el email o telefono que usaste al reservar tu turno.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== AUTHENTICATED VIEW =====
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <span className="text-teal-800 tracking-tight" style={{ fontSize: "1rem", fontWeight: 700 }}>
              Health Hub
            </span>
          </button>
          <button
            onClick={() => navigate(`/dr/${mockProfessional.slug}`)}
            className="px-4 py-1.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-colors flex items-center gap-1.5"
            style={{ fontSize: "0.8rem", fontWeight: 500 }}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Nuevo turno
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-teal-800 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Mis turnos
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
            {upcomingAppointments.length > 0
              ? `Tenes ${upcomingAppointments.length} turno${upcomingAppointments.length > 1 ? "s" : ""} proximo${upcomingAppointments.length > 1 ? "s" : ""}`
              : "No tenes turnos proximos"}
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex bg-cream-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab("proximos")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
              activeTab === "proximos"
                ? "bg-white text-teal-800 shadow-sm"
                : "text-muted-foreground hover:text-teal-700"
            }`}
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            <CalendarDays className="w-4 h-4" />
            Proximos ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab("historial")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
              activeTab === "historial"
                ? "bg-white text-teal-800 shadow-sm"
                : "text-muted-foreground hover:text-teal-700"
            }`}
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            <Clock className="w-4 h-4" />
            Historial ({pastAppointments.length})
          </button>
        </div>

        {/* Upcoming Tab */}
        {activeTab === "proximos" && (
          <>
            {upcomingAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-8 text-center">
                <EmptyStateIllustration className="w-40 h-32 mx-auto mb-4 opacity-60" />
                <p className="text-teal-800 mb-1" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                  No tenes turnos proximos
                </p>
                <p className="text-muted-foreground mb-5" style={{ fontSize: "0.85rem" }}>
                  Reserva un nuevo turno con tu profesional
                </p>
                <button
                  onClick={() => navigate(`/dr/${mockProfessional.slug}`)}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm inline-flex items-center gap-2"
                  style={{ fontSize: "0.85rem", fontWeight: 600 }}
                >
                  <CalendarDays className="w-4 h-4" />
                  Reservar turno
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <PatientAppointmentCard
                    key={apt.id}
                    appointment={apt}
                    expanded={expandedAppointment === apt.id}
                    onToggleExpand={() =>
                      setExpandedAppointment(
                        expandedAppointment === apt.id ? null : apt.id
                      )
                    }
                    onCancel={() => setShowCancelModal(apt.id)}
                    onReschedule={() => setShowRescheduleModal(apt.id)}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* History Tab */}
        {activeTab === "historial" && (
          <>
            {pastAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-8 text-center">
                <EmptyStateIllustration className="w-40 h-32 mx-auto mb-4 opacity-60" />
                <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                  No tenes historial de turnos
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pastAppointments.map((apt) => (
                  <PatientAppointmentCard
                    key={apt.id}
                    appointment={apt}
                    isPast
                    expanded={expandedAppointment === apt.id}
                    onToggleExpand={() =>
                      setExpandedAppointment(
                        expandedAppointment === apt.id ? null : apt.id
                      )
                    }
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-teal-800 mb-1" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                Cancelar turno?
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                El horario sera liberado automaticamente para otros pacientes.
              </p>
            </div>

            {/* Cancel reason */}
            <div className="mb-4">
              <label className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                Motivo (opcional)
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-cream-50 border border-border text-teal-800 outline-none focus:border-teal-500"
                style={{ fontSize: "0.85rem" }}
              >
                <option value="">Seleccionar motivo...</option>
                <option value="personal">Motivo personal</option>
                <option value="salud">Motivo de salud</option>
                <option value="horario">No me sirve el horario</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Notification info */}
            <div className="p-3 bg-cream-50 rounded-xl mb-5 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-muted-foreground" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                Recibiras confirmacion de cancelacion por email y WhatsApp.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(null);
                  setCancelReason("");
                }}
                className="flex-1 py-2.5 rounded-xl bg-cream-100 text-teal-700 hover:bg-cream-200 transition-all"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                Volver
              </button>
              <button
                onClick={() => handleCancel(showCancelModal)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
                style={{ fontSize: "0.9rem", fontWeight: 600 }}
              >
                Si, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-teal-800 mb-1" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                Reprogramar turno?
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                Tu turno actual sera cancelado y el horario liberado. Podras elegir un nuevo horario disponible.
              </p>
            </div>

            {/* Steps preview */}
            <div className="p-3 bg-teal-50 rounded-xl mb-5 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center" style={{ fontSize: "0.65rem", fontWeight: 600 }}>1</div>
                <span className="text-teal-700" style={{ fontSize: "0.8rem" }}>Tu turno actual se cancela</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center" style={{ fontSize: "0.65rem", fontWeight: 600 }}>2</div>
                <span className="text-teal-700" style={{ fontSize: "0.8rem" }}>El horario se libera automaticamente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center" style={{ fontSize: "0.65rem", fontWeight: 600 }}>3</div>
                <span className="text-teal-700" style={{ fontSize: "0.8rem" }}>Elegis un nuevo horario</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRescheduleModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-cream-100 text-teal-700 hover:bg-cream-200 transition-all"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                Volver
              </button>
              <button
                onClick={() => handleReschedule(showRescheduleModal)}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all"
                style={{ fontSize: "0.9rem", fontWeight: 600 }}
              >
                Si, reprogramar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== APPOINTMENT CARD COMPONENT =====
function PatientAppointmentCard({
  appointment,
  isPast = false,
  expanded = false,
  onToggleExpand,
  onCancel,
  onReschedule,
  formatDate,
}: {
  appointment: Appointment;
  isPast?: boolean;
  expanded?: boolean;
  onToggleExpand?: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
  formatDate: (d: string) => string;
}) {
  const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
    confirmado: { label: "Confirmado", color: "text-teal-700", bg: "bg-teal-50", icon: CheckCircle2 },
    pendiente: { label: "Pendiente", color: "text-amber-700", bg: "bg-amber-50", icon: AlertCircle },
    cancelado: { label: "Cancelado", color: "text-red-600", bg: "bg-red-50", icon: XCircle },
    reprogramado: { label: "Reprogramado", color: "text-blue-600", bg: "bg-blue-50", icon: RefreshCw },
  };

  const status = statusConfig[appointment.status];
  const StatusIcon = status.icon;
  const notifications = appointment.notifications || [];

  return (
    <div className={`bg-white rounded-2xl border border-border overflow-hidden transition-all ${isPast ? "opacity-70" : ""}`}>
      {/* Main card content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-teal-800 capitalize" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              {formatDate(appointment.date)}
            </p>
            <p className="text-teal-600" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              {appointment.startTime} - {appointment.endTime}
            </p>
          </div>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${status.bg} ${status.color}`}
            style={{ fontSize: "0.75rem", fontWeight: 500 }}
          >
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Stethoscope className="w-3.5 h-3.5 shrink-0" />
            <span style={{ fontSize: "0.8rem" }}>{mockProfessional.name} — {mockProfessional.specialty}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span style={{ fontSize: "0.8rem" }}>{appointment.locationName}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            {appointment.modality === "virtual" ? (
              <Video className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <Building2 className="w-3.5 h-3.5 shrink-0" />
            )}
            <span style={{ fontSize: "0.8rem" }}>
              {appointment.modality === "presencial" ? "Presencial" : "Virtual"}
            </span>
          </div>
        </div>

        {/* Notification badges */}
        {notifications.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {notifications.map((n) => (
              <span
                key={n.id}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
                  n.status === "leido"
                    ? "bg-teal-50 text-teal-600"
                    : n.status === "entregado"
                    ? "bg-cream-100 text-teal-700"
                    : n.status === "fallido"
                    ? "bg-red-50 text-red-500"
                    : "bg-cream-100 text-muted-foreground"
                }`}
                style={{ fontSize: "0.65rem", fontWeight: 500 }}
              >
                {n.channel === "whatsapp" ? (
                  <MessageCircle className="w-2.5 h-2.5" />
                ) : (
                  <Mail className="w-2.5 h-2.5" />
                )}
                {n.type === "confirmacion" ? "Confirmacion" : n.type === "recordatorio" ? "Recordatorio" : "Cancelacion"}
                {n.status === "leido" && <Check className="w-2.5 h-2.5" />}
              </span>
            ))}
          </div>
        )}

        {/* Actions for upcoming appointments */}
        {!isPast && appointment.status !== "cancelado" && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
            {appointment.status === "pendiente" && (
              <button
                onClick={() =>
                  toast.success("Turno confirmado!", {
                    description: "Recibiras un recordatorio 24h antes.",
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all"
                style={{ fontSize: "0.8rem", fontWeight: 500 }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirmar
              </button>
            )}
            <button
              onClick={() => toast.success("Evento agregado al calendario")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-100 text-teal-700 hover:bg-cream-200 transition-all"
              style={{ fontSize: "0.8rem", fontWeight: 500 }}
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              Calendario
            </button>
            <button
              onClick={onReschedule}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-100 text-teal-700 hover:bg-cream-200 transition-all"
              style={{ fontSize: "0.8rem", fontWeight: 500 }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reprogramar
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
              style={{ fontSize: "0.8rem", fontWeight: 500 }}
            >
              <X className="w-3.5 h-3.5" />
              Cancelar
            </button>
          </div>
        )}

        {/* Expand details */}
        {notifications.length > 0 && (
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-1 w-full justify-center pt-3 text-muted-foreground hover:text-teal-600 transition-colors"
            style={{ fontSize: "0.75rem", fontWeight: 500 }}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Ocultar detalles
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Ver historial de notificaciones
              </>
            )}
          </button>
        )}
      </div>

      {/* Expanded notification history */}
      {expanded && notifications.length > 0 && (
        <div className="px-5 pb-5 pt-0">
          <div className="bg-cream-50 rounded-xl p-4 border border-cream-200">
            <p className="text-teal-800 mb-3" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
              Historial de notificaciones
            </p>
            <div className="space-y-2.5">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    n.channel === "whatsapp" ? "bg-teal-100" : "bg-salmon-100"
                  }`}>
                    {n.channel === "whatsapp" ? (
                      <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
                    ) : (
                      <Mail className="w-3.5 h-3.5 text-salmon-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-teal-800" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      {n.type === "confirmacion" ? "Confirmacion" : n.type === "recordatorio" ? "Recordatorio" : n.type === "cancelacion" ? "Cancelacion" : "Reprogramacion"} — {n.channel === "whatsapp" ? "WhatsApp" : "Email"}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                      {n.sentAt} — {n.status === "leido" ? "Leido" : n.status === "entregado" ? "Entregado" : n.status === "enviado" ? "Enviado" : "Fallido"}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    n.status === "leido" ? "bg-teal-500" : n.status === "entregado" ? "bg-teal-300" : n.status === "fallido" ? "bg-red-400" : "bg-cream-300"
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}