import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  MapPin,
  Video,
  ChevronRight,
  Copy,
  Check,
  RefreshCw,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";
import { mockAppointments, mockProfessional, type Appointment } from "../../data/mockData";
import { EmptyStateIllustration } from "../illustrations/HealthIllustrations";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  confirmado: {
    label: "Confirmado",
    color: "text-teal-700",
    bg: "bg-teal-50",
    icon: CheckCircle2,
  },
  pendiente: {
    label: "Pendiente",
    color: "text-amber-700",
    bg: "bg-amber-50",
    icon: AlertCircle,
  },
  cancelado: {
    label: "Cancelado",
    color: "text-red-600",
    bg: "bg-red-50",
    icon: XCircle,
  },
  reprogramado: {
    label: "Reprogramado",
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: RefreshCw,
  },
};

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dateOnly = (d: Date) => d.toISOString().split("T")[0];

  if (dateOnly(date) === dateOnly(today)) return "Hoy";
  if (dateOnly(date) === dateOnly(tomorrow)) return "Manana";

  return date.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function DashboardHome() {
  const navigate = useNavigate();
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState<string>("todos");

  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = mockAppointments.filter((a) => a.date === today && a.status !== "cancelado");
  const confirmedCount = mockAppointments.filter((a) => a.status === "confirmado" && a.date >= today).length;
  const pendingCount = mockAppointments.filter((a) => a.status === "pendiente").length;
  const cancelledCount = mockAppointments.filter((a) => a.status === "cancelado").length;

  const upcomingAppointments = mockAppointments
    .filter((a) => {
      if (filter === "todos") return a.date >= today;
      return a.date >= today && a.status === filter;
    })
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`healthhub.com${mockProfessional.publicLink}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-teal-800" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Hola, {mockProfessional.name.split(" ")[1]} 👋
          </h1>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
            {todayAppointments.length > 0
              ? `Tenes ${todayAppointments.length} turno${todayAppointments.length > 1 ? "s" : ""} hoy`
              : "No tenes turnos para hoy"}
          </p>
        </div>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-border hover:bg-teal-50 transition-all self-start"
        >
          {linkCopied ? (
            <Check className="w-4 h-4 text-teal-500" />
          ) : (
            <Copy className="w-4 h-4 text-teal-600" />
          )}
          <span className="text-teal-700" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
            {linkCopied ? "Link copiado!" : "Copiar mi link publico"}
          </span>
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={CalendarDays}
          label="Turnos hoy"
          value={todayAppointments.length}
          color="teal"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Confirmados"
          value={confirmedCount}
          color="teal"
        />
        <StatsCard
          icon={AlertCircle}
          label="Pendientes"
          value={pendingCount}
          color="amber"
        />
        <StatsCard
          icon={XCircle}
          label="Cancelados"
          value={cancelledCount}
          color="red"
        />
      </div>

      {/* Appointments list */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-teal-800" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            Proximos turnos
          </h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "todos", label: "Todos" },
              { key: "confirmado", label: "Confirmados" },
              { key: "pendiente", label: "Pendientes" },
              { key: "cancelado", label: "Cancelados" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === f.key
                    ? "bg-teal-500 text-white"
                    : "bg-cream-100 text-muted-foreground hover:bg-cream-200"
                }`}
                style={{ fontSize: "0.78rem", fontWeight: 500 }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyStateIllustration className="w-40 h-32 mx-auto mb-4 opacity-60" />
            <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
              No hay turnos para mostrar
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {upcomingAppointments.map((apt) => (
              <AppointmentRow key={apt.id} appointment={apt} />
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/dashboard/agenda")}
          className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border hover:shadow-md transition-all group text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-200 transition-colors">
            <CalendarDays className="w-5 h-5 text-teal-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-teal-800" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              Gestionar agenda
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              Horarios y disponibilidad
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-teal-600 transition-colors" />
        </button>
        <button
          onClick={() => navigate("/dashboard/perfil")}
          className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border hover:shadow-md transition-all group text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-salmon-100 flex items-center justify-center shrink-0 group-hover:bg-salmon-200 transition-colors">
            <Users className="w-5 h-5 text-salmon-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-teal-800" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              Editar perfil
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              Informacion profesional
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-teal-600 transition-colors" />
        </button>
        <button
          onClick={() => navigate("/dashboard/integraciones")}
          className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border hover:shadow-md transition-all group text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-200 transition-colors">
            <Zap className="w-5 h-5 text-teal-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-teal-800" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              Integraciones
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              WhatsApp, Email, Calendar
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-teal-600 transition-colors" />
        </button>
      </div>
    </div>
  );
}

function StatsCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "teal" | "amber" | "red";
}) {
  const colorMap = {
    teal: { bg: "bg-teal-50", iconColor: "text-teal-600", textColor: "text-teal-800" },
    amber: { bg: "bg-amber-50", iconColor: "text-amber-600", textColor: "text-amber-800" },
    red: { bg: "bg-red-50", iconColor: "text-red-500", textColor: "text-red-700" },
  };
  const c = colorMap[color];

  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
        <Icon className={`w-4 h-4 ${c.iconColor}`} />
      </div>
      <p className={`${c.textColor}`} style={{ fontSize: "1.5rem", fontWeight: 700 }}>
        {value}
      </p>
      <p className="text-muted-foreground" style={{ fontSize: "0.78rem" }}>
        {label}
      </p>
    </div>
  );
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  const status = statusConfig[appointment.status];
  const StatusIcon = status.icon;

  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-cream-50 transition-colors">
      {/* Time */}
      <div className="text-center shrink-0 w-16">
        <p className="text-teal-800" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
          {appointment.startTime}
        </p>
        <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
          {formatDateLabel(appointment.date)}
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-border shrink-0" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-teal-800 truncate" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
          {appointment.patientName}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
            <MapPin className="w-3 h-3" />
            {appointment.locationName}
          </span>
          {appointment.modality === "virtual" && (
            <span className="flex items-center gap-1 text-teal-600" style={{ fontSize: "0.75rem" }}>
              <Video className="w-3 h-3" />
              Virtual
            </span>
          )}
        </div>
      </div>

      {/* Status */}
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${status.bg} ${status.color} shrink-0`}
        style={{ fontSize: "0.75rem", fontWeight: 500 }}
      >
        <StatusIcon className="w-3 h-3" />
        <span className="hidden sm:inline">{status.label}</span>
      </div>
    </div>
  );
}