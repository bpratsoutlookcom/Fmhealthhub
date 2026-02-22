import React, { useState } from "react";
import {
  MessageCircle,
  Mail,
  CalendarDays,
  Check,
  X,
  Send,
  Edit3,
  Eye,
  AlertCircle,
  CheckCircle2,
  Copy,
  Link2,
} from "lucide-react";
import { toast } from "sonner";
import { mockIntegrationConfig, type IntegrationConfig } from "../../data/mockData";
import {
  GoogleCalendarIllustration,
} from "../illustrations/HealthIllustrations";

export function IntegrationsPage() {
  const [config, setConfig] = useState<IntegrationConfig>(mockIntegrationConfig);
  const [activeSection, setActiveSection] = useState<"whatsapp" | "email" | "gcal" | null>("whatsapp");
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [showWhatsAppPreview, setShowWhatsAppPreview] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const toggleWhatsApp = () => {
    setConfig((prev) => ({
      ...prev,
      whatsapp: { ...prev.whatsapp, enabled: !prev.whatsapp.enabled },
    }));
    toast.success(config.whatsapp.enabled ? "WhatsApp desactivado" : "WhatsApp activado");
  };

  const toggleEmail = () => {
    setConfig((prev) => ({
      ...prev,
      email: { ...prev.email, enabled: !prev.email.enabled },
    }));
    toast.success(config.email.enabled ? "Email desactivado" : "Email activado");
  };

  const toggleGoogleCalendar = () => {
    if (!config.googleCalendar.connected) {
      toast.info("Conecta tu cuenta de Google primero");
      return;
    }
    setConfig((prev) => ({
      ...prev,
      googleCalendar: { ...prev.googleCalendar, enabled: !prev.googleCalendar.enabled },
    }));
  };

  const handleConnectGoogle = () => {
    toast.success("Conectando con Google Calendar...", {
      description: "En produccion, esto abriria el flujo OAuth de Google.",
    });
    setConfig((prev) => ({
      ...prev,
      googleCalendar: {
        ...prev.googleCalendar,
        connected: true,
        enabled: true,
        calendarId: "dra.laura.mendez@gmail.com",
      },
    }));
  };

  const handleDisconnectGoogle = () => {
    setConfig((prev) => ({
      ...prev,
      googleCalendar: {
        ...prev.googleCalendar,
        connected: false,
        enabled: false,
        calendarId: "",
      },
    }));
    toast.success("Google Calendar desconectado");
  };

  const handleTestWhatsApp = () => {
    toast.success("Mensaje de prueba enviado", {
      description: "Se envio un WhatsApp de prueba al numero configurado.",
    });
  };

  const handleTestEmail = () => {
    toast.success("Email de prueba enviado", {
      description: "Se envio un email de prueba.",
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-teal-800" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Integraciones
          </h1>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
            Configura tus canales de comunicacion y sincronizacion
          </p>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <IntegrationStatusCard
          icon={MessageCircle}
          name="WhatsApp Business"
          status={config.whatsapp.connected ? "conectado" : "desconectado"}
          enabled={config.whatsapp.enabled}
          description="Confirmaciones, recordatorios y cancelaciones"
          color="teal"
          onClick={() => setActiveSection(activeSection === "whatsapp" ? null : "whatsapp")}
          isActive={activeSection === "whatsapp"}
        />
        <IntegrationStatusCard
          icon={Mail}
          name="Email Transaccional"
          status="configurado"
          enabled={config.email.enabled}
          description="Confirmaciones y notificaciones por email"
          color="salmon"
          onClick={() => setActiveSection(activeSection === "email" ? null : "email")}
          isActive={activeSection === "email"}
        />
        <IntegrationStatusCard
          icon={CalendarDays}
          name="Google Calendar"
          status={config.googleCalendar.connected ? "conectado" : "desconectado"}
          enabled={config.googleCalendar.enabled}
          description="Sincroniza turnos con tu calendario"
          color="teal"
          onClick={() => setActiveSection(activeSection === "gcal" ? null : "gcal")}
          isActive={activeSection === "gcal"}
        />
      </div>

      {/* ===== WHATSAPP SECTION ===== */}
      {activeSection === "whatsapp" && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-teal-800" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    WhatsApp Business API
                  </h2>
                  <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    via {config.whatsapp.provider}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleWhatsApp}
                className={`w-12 h-7 rounded-full transition-all relative ${
                  config.whatsapp.enabled ? "bg-teal-500" : "bg-cream-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-1 transition-all ${
                    config.whatsapp.enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Connection status */}
            <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <div className="flex-1">
                <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Conectado — Numero: {config.whatsapp.phoneNumber}
                </p>
                <p className="text-teal-600" style={{ fontSize: "0.75rem" }}>
                  Proveedor: {config.whatsapp.provider} | Estado: Activo
                </p>
              </div>
              <button
                onClick={handleTestWhatsApp}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-all"
                style={{ fontSize: "0.78rem", fontWeight: 500 }}
              >
                <Send className="w-3.5 h-3.5" />
                Enviar prueba
              </button>
            </div>

            {/* Message templates */}
            <div>
              <h3 className="text-teal-800 mb-4" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                Plantillas de mensajes
              </h3>
              <div className="space-y-3">
                {(["confirmacion", "recordatorio", "cancelacion"] as const).map((type) => (
                  <TemplateCard
                    key={type}
                    type={type}
                    channel="whatsapp"
                    template={config.whatsapp.templates[type]}
                    isEditing={editingTemplate === `whatsapp-${type}`}
                    onEdit={() =>
                      setEditingTemplate(
                        editingTemplate === `whatsapp-${type}` ? null : `whatsapp-${type}`
                      )
                    }
                    onSave={(newTemplate) => {
                      setConfig((prev) => ({
                        ...prev,
                        whatsapp: {
                          ...prev.whatsapp,
                          templates: { ...prev.whatsapp.templates, [type]: newTemplate },
                        },
                      }));
                      setEditingTemplate(null);
                      toast.success("Plantilla guardada");
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Variables reference */}
            <div className="p-4 bg-cream-50 rounded-xl border border-cream-200">
              <p className="text-teal-800 mb-2" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                Variables disponibles
              </p>
              <div className="flex flex-wrap gap-2">
                {["{{nombre}}", "{{profesional}}", "{{fecha}}", "{{hora}}", "{{sede}}", "{{link}}"].map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      navigator.clipboard?.writeText(v);
                      toast.success("Variable copiada");
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-border text-teal-700 hover:bg-teal-50 transition-colors"
                    style={{ fontSize: "0.72rem", fontWeight: 500 }}
                  >
                    <Copy className="w-2.5 h-2.5" />
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp preview */}
            <div>
              <button
                onClick={() => setShowWhatsAppPreview(!showWhatsAppPreview)}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                <Eye className="w-4 h-4" />
                {showWhatsAppPreview ? "Ocultar" : "Ver"} previsualizacion
              </button>
              {showWhatsAppPreview && (
                <div className="mt-3 max-w-sm mx-auto">
                  <div className="bg-[#E5DDD5] rounded-2xl p-4 space-y-2">
                    <div className="bg-[#DCF8C6] rounded-xl rounded-tr-none px-3 py-2 ml-auto max-w-[85%]">
                      <p className="text-[#303030]" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                        {config.whatsapp.templates.confirmacion
                          .replace("{{nombre}}", "Maria")
                          .replace("{{profesional}}", "Dra. Laura Mendez")
                          .replace("{{fecha}}", "lunes 24 de febrero")
                          .replace("{{hora}}", "09:00")
                          .replace("{{sede}}", "Consultorio Centro")
                          .replace("{{link}}", "healthhub.com/mis-turnos")}
                      </p>
                      <p className="text-right text-[#8E8E8E] mt-1" style={{ fontSize: "0.6rem" }}>
                        09:30 ✓✓
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== EMAIL SECTION ===== */}
      {activeSection === "email" && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-salmon-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-salmon-500" />
                </div>
                <div>
                  <h2 className="text-teal-800" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    Email Transaccional
                  </h2>
                  <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    Notificaciones automaticas por email
                  </p>
                </div>
              </div>
              <button
                onClick={toggleEmail}
                className={`w-12 h-7 rounded-full transition-all relative ${
                  config.email.enabled ? "bg-teal-500" : "bg-cream-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-1 transition-all ${
                    config.email.enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Sender config */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  Nombre del remitente
                </label>
                <input
                  type="text"
                  value={config.email.senderName}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      email: { ...prev.email, senderName: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div>
                <label className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  Email del remitente
                </label>
                <input
                  type="email"
                  value={config.email.senderEmail}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      email: { ...prev.email, senderEmail: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
            </div>

            {/* Email types */}
            <div>
              <h3 className="text-teal-800 mb-4" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                Emails automaticos
              </h3>
              <div className="space-y-3">
                {[
                  {
                    type: "confirmacion" as const,
                    icon: CheckCircle2,
                    title: "Confirmacion de turno",
                    desc: "Se envia inmediatamente al reservar un turno",
                    trigger: "Al reservar",
                  },
                  {
                    type: "recordatorio" as const,
                    icon: AlertCircle,
                    title: "Recordatorio",
                    desc: "Se envia 24 horas antes del turno",
                    trigger: "24h antes",
                  },
                  {
                    type: "cancelacion" as const,
                    icon: X,
                    title: "Cancelacion",
                    desc: "Se envia al cancelar un turno",
                    trigger: "Al cancelar",
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="flex items-center gap-4 p-4 bg-cream-50 rounded-xl border border-cream-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-salmon-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-salmon-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {item.title}
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        {item.desc}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-cream-200 text-muted-foreground shrink-0" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                      {item.trigger}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email preview */}
            <div>
              <button
                onClick={() => setShowEmailPreview(!showEmailPreview)}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                <Eye className="w-4 h-4" />
                {showEmailPreview ? "Ocultar" : "Ver"} previsualizacion de email
              </button>
              {showEmailPreview && (
                <div className="mt-3 max-w-md mx-auto bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                  {/* Email header */}
                  <div className="p-4 bg-teal-500">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center">
                        <CalendarDays className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        Health Hub
                      </span>
                    </div>
                  </div>
                  {/* Email body */}
                  <div className="p-5 space-y-3">
                    <h4 className="text-teal-800" style={{ fontSize: "1rem", fontWeight: 600 }}>
                      Tu turno ha sido confirmado
                    </h4>
                    <p className="text-muted-foreground" style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>
                      Hola Maria, tu turno con Dra. Laura Mendez fue confirmado.
                    </p>
                    <div className="p-3 bg-teal-50 rounded-lg space-y-1.5">
                      <p className="text-teal-800" style={{ fontSize: "0.8rem" }}>
                        📅 Lunes 24 de febrero, 09:00hs
                      </p>
                      <p className="text-teal-800" style={{ fontSize: "0.8rem" }}>
                        📍 Consultorio Centro - Av. Corrientes 1234
                      </p>
                      <p className="text-teal-800" style={{ fontSize: "0.8rem" }}>
                        🏥 Presencial — 30 minutos
                      </p>
                    </div>
                    <div className="text-center pt-2">
                      <div className="inline-block px-5 py-2 bg-teal-500 text-white rounded-lg" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                        Ver mis turnos
                      </div>
                    </div>
                  </div>
                  {/* Email footer */}
                  <div className="px-5 py-3 bg-cream-50 border-t border-border">
                    <p className="text-muted-foreground text-center" style={{ fontSize: "0.65rem" }}>
                      Este email fue enviado por Health Hub. Si no reservaste este turno, ignora este mensaje.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Test button */}
            <div className="flex justify-end">
              <button
                onClick={handleTestEmail}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-salmon-100 text-salmon-500 hover:bg-salmon-200 transition-all"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                <Send className="w-4 h-4" />
                Enviar email de prueba
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== GOOGLE CALENDAR SECTION ===== */}
      {activeSection === "gcal" && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-teal-800" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    Google Calendar
                  </h2>
                  <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    Sincronizacion unidireccional
                  </p>
                </div>
              </div>
              {config.googleCalendar.connected && (
                <button
                  onClick={toggleGoogleCalendar}
                  className={`w-12 h-7 rounded-full transition-all relative ${
                    config.googleCalendar.enabled ? "bg-teal-500" : "bg-cream-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-1 transition-all ${
                      config.googleCalendar.enabled ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {!config.googleCalendar.connected ? (
              <>
                {/* Not connected state */}
                <div className="text-center py-4">
                  <GoogleCalendarIllustration className="w-32 h-32 mx-auto mb-4" />
                  <h3 className="text-teal-800 mb-2" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                    Conecta tu Google Calendar
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                    Cada turno confirmado se agrega automaticamente como evento en tu Google Calendar. Sincronizacion unidireccional (solo crea eventos).
                  </p>
                  <button
                    onClick={handleConnectGoogle}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    <Link2 className="w-4 h-4" />
                    Conectar Google Calendar
                  </button>
                </div>

                {/* What it does */}
                <div className="p-4 bg-cream-50 rounded-xl border border-cream-200">
                  <p className="text-teal-800 mb-3" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    Que hace esta integracion?
                  </p>
                  <div className="space-y-2">
                    {[
                      "Crea un evento en Google Calendar por cada turno confirmado",
                      "Incluye datos del paciente, sede y modalidad",
                      "Elimina el evento si el turno se cancela",
                      "No lee ni modifica otros eventos de tu calendario",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-teal-600" />
                        </div>
                        <span className="text-teal-700" style={{ fontSize: "0.8rem" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Connected state */}
                <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <div className="flex-1">
                    <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                      Conectado — {config.googleCalendar.calendarId}
                    </p>
                    <p className="text-teal-600" style={{ fontSize: "0.75rem" }}>
                      Sincronizacion unidireccional activa
                    </p>
                  </div>
                  <button
                    onClick={handleDisconnectGoogle}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream-100 text-red-500 hover:bg-red-50 transition-all"
                    style={{ fontSize: "0.78rem", fontWeight: 500 }}
                  >
                    <X className="w-3.5 h-3.5" />
                    Desconectar
                  </button>
                </div>

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-teal-800" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    Configuracion
                  </h3>

                  <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                    <div>
                      <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        Crear evento automaticamente
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        Al confirmar un turno, se crea un evento en Google Calendar
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          googleCalendar: {
                            ...prev.googleCalendar,
                            autoCreateEvent: !prev.googleCalendar.autoCreateEvent,
                          },
                        }))
                      }
                      className={`w-10 h-6 rounded-full transition-all relative ${
                        config.googleCalendar.autoCreateEvent ? "bg-teal-500" : "bg-cream-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-all ${
                          config.googleCalendar.autoCreateEvent ? "left-5" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Event preview */}
                  <div className="p-4 bg-cream-50 rounded-xl border border-cream-200">
                    <p className="text-teal-800 mb-3" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                      Vista previa del evento
                    </p>
                    <div className="bg-white rounded-lg p-3 border-l-4 border-teal-500 space-y-1.5">
                      <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Turno — Maria Garcia
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        Lun 24 feb, 09:00 - 09:30
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        📍 Consultorio Centro — Av. Corrientes 1234
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        📞 +5491155667788 | 📧 maria@email.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <AlertCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-teal-700" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
                    La sincronizacion es unidireccional: Health Hub crea/elimina eventos en tu calendario, pero los cambios que hagas directamente en Google Calendar no se reflejan en Health Hub.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== STATUS CARD COMPONENT =====
function IntegrationStatusCard({
  icon: Icon,
  name,
  status,
  enabled,
  description,
  color,
  onClick,
  isActive,
}: {
  icon: React.ElementType;
  name: string;
  status: "conectado" | "configurado" | "desconectado";
  enabled: boolean;
  description: string;
  color: "teal" | "salmon";
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 rounded-2xl border transition-all group ${
        isActive
          ? "bg-white border-teal-500 shadow-sm"
          : "bg-white border-border hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          color === "teal" ? "bg-teal-100" : "bg-salmon-100"
        }`}>
          <Icon className={`w-5 h-5 ${color === "teal" ? "text-teal-600" : "text-salmon-500"}`} />
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${
          status === "conectado" || status === "configurado"
            ? "bg-teal-50 text-teal-600"
            : "bg-cream-100 text-muted-foreground"
        }`} style={{ fontSize: "0.65rem", fontWeight: 500 }}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === "conectado" || status === "configurado"
              ? enabled ? "bg-teal-500" : "bg-cream-300"
              : "bg-cream-300"
          }`} />
          {status === "conectado" ? (enabled ? "Activo" : "Pausado") : status === "configurado" ? (enabled ? "Activo" : "Pausado") : "Desconectado"}
        </div>
      </div>
      <p className="text-teal-800 mb-0.5" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
        {name}
      </p>
      <p className="text-muted-foreground" style={{ fontSize: "0.78rem" }}>
        {description}
      </p>
    </button>
  );
}

// ===== TEMPLATE CARD COMPONENT =====
function TemplateCard({
  type,
  channel,
  template,
  isEditing,
  onEdit,
  onSave,
}: {
  type: "confirmacion" | "recordatorio" | "cancelacion";
  channel: "whatsapp" | "email";
  template: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (newTemplate: string) => void;
}) {
  const [editValue, setEditValue] = useState(template);
  const typeLabels = {
    confirmacion: { label: "Confirmacion", icon: CheckCircle2, color: "text-teal-600 bg-teal-50" },
    recordatorio: { label: "Recordatorio", icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
    cancelacion: { label: "Cancelacion", icon: X, color: "text-red-500 bg-red-50" },
  };
  const info = typeLabels[type];
  const InfoIcon = info.icon;

  return (
    <div className="p-4 bg-cream-50 rounded-xl border border-cream-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${info.color}`}>
            <InfoIcon className="w-3 h-3" />
          </div>
          <span className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            {info.label}
          </span>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors"
          style={{ fontSize: "0.75rem", fontWeight: 500 }}
        >
          <Edit3 className="w-3 h-3" />
          {isEditing ? "Cancelar" : "Editar"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-white border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
            style={{ fontSize: "0.8rem" }}
          />
          <div className="flex justify-end">
            <button
              onClick={() => onSave(editValue)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-all"
              style={{ fontSize: "0.78rem", fontWeight: 500 }}
            >
              <Check className="w-3 h-3" />
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
          {template}
        </p>
      )}
    </div>
  );
}