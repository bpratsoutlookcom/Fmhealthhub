import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  CalendarDays,
  MapPin,
  Clock,
  Video,
  Building2,
  User,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Check,
  Stethoscope,
  MessageCircle,
  CalendarPlus,
} from "lucide-react";
import { toast } from "sonner";
import {
  mockProfessional,
  mockWeeklyAvailability,
  generateTimeSlots,
} from "../../data/mockData";
import heroImage from "figma:asset/12a47b9225913f93c9b4a7d2dd73c125f4564b57.png";
import { SuccessIllustration } from "../illustrations/HealthIllustrations";

type BookingStep = "browse" | "choose" | "confirm" | "success";

export function PublicProfile() {
  const navigate = useNavigate();
  const prof = mockProfessional;
  const timeSlots = useMemo(
    () => generateTimeSlots(prof, mockWeeklyAvailability),
    []
  );

  const [step, setStep] = useState<BookingStep>("browse");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState(prof.locations[0].id);
  const [selectedModality, setSelectedModality] = useState<"presencial" | "virtual">("presencial");
  const [patientForm, setPatientForm] = useState({
    name: "",
    email: "",
    phone: "",
    patientName: "",
    isDifferentPatient: false,
    notes: "",
  });
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);

  // Get unique available dates
  const availableDates = useMemo(() => {
    const dates = [
      ...new Set(
        timeSlots
          .filter(
            (s) => s.available && s.locationId === selectedLocation
          )
          .map((s) => s.date)
      ),
    ];
    return dates.sort();
  }, [timeSlots, selectedLocation]);

  // Get slots for selected date
  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    return timeSlots.filter(
      (s) =>
        s.date === selectedDate &&
        s.available &&
        s.locationId === selectedLocation
    );
  }, [timeSlots, selectedDate, selectedLocation]);

  // Group slots by morning/afternoon
  const morningSlots = slotsForDate.filter((s) => parseInt(s.startTime.split(":")[0]) < 13);
  const afternoonSlots = slotsForDate.filter((s) => parseInt(s.startTime.split(":")[0]) >= 13);

  const selectedSlotData = timeSlots.find((s) => s.id === selectedSlot);
  const selectedLocationData = prof.locations.find(
    (l) => l.id === selectedLocation
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientForm.name || !patientForm.email || !patientForm.phone) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }
    setStep("success");
    toast.success("Turno reservado con exito!");
  };

  const stepLabels = ["Ver horarios", "Elegir", "Confirmar"];
  const currentStepIndex = step === "browse" ? 0 : step === "choose" ? 1 : step === "confirm" ? 2 : -1;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <span className="text-teal-800 tracking-tight" style={{ fontSize: "1rem", fontWeight: 700 }}>
              Health Hub
            </span>
          </div>
          <button
            onClick={() => navigate("/mis-turnos")}
            className="px-3 py-1.5 rounded-lg text-teal-600 hover:bg-teal-50 transition-colors"
            style={{ fontSize: "0.8rem", fontWeight: 500 }}
          >
            Mis turnos
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Professional Card */}
        <div className="bg-white rounded-2xl border border-border p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-cream-200 shrink-0">
              <img
                src={heroImage}
                alt={prof.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-teal-800 mb-1" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                {prof.name}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="w-4 h-4 text-salmon-400" />
                <span className="text-salmon-500" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  {prof.specialty}
                </span>
              </div>
              <p className="text-muted-foreground mb-3" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                {prof.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {prof.locations.map((loc) => (
                  <span
                    key={loc.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700"
                    style={{ fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    <MapPin className="w-3 h-3" />
                    {loc.name}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-salmon-100 text-salmon-500" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                  <Clock className="w-3 h-3" />
                  {prof.consultDuration} min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-step indicator */}
        {step !== "success" && (
          <div className="flex items-center gap-1.5 sm:gap-2 mb-6">
            {stepLabels.map((label, idx) => (
              <div key={label} className="contents">
                {idx > 0 && (
                  <div className={`flex-1 h-0.5 rounded-full transition-colors ${
                    idx <= currentStepIndex ? "bg-teal-500" : "bg-cream-200"
                  }`} />
                )}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      idx === currentStepIndex
                        ? "bg-teal-500 text-white shadow-sm shadow-teal-500/30"
                        : idx < currentStepIndex
                        ? "bg-teal-100 text-teal-700"
                        : "bg-cream-200 text-muted-foreground"
                    }`}
                    style={{ fontSize: "0.7rem", fontWeight: 600 }}
                  >
                    {idx < currentStepIndex ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`hidden sm:inline ${
                      idx === currentStepIndex
                        ? "text-teal-800"
                        : idx < currentStepIndex
                        ? "text-teal-600"
                        : "text-muted-foreground"
                    }`}
                    style={{ fontSize: "0.8rem", fontWeight: 500 }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== STEP 1: BROWSE (Ver horarios) ===== */}
        {step === "browse" && (
          <div className="space-y-4">
            {/* Location & Modality selector */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-teal-800 mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Sede
                  </label>
                  <div className="flex gap-2">
                    {prof.locations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocation(loc.id);
                          setSelectedDate("");
                          setSelectedSlot("");
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all flex-1 ${
                          selectedLocation === loc.id
                            ? "bg-teal-500 text-white shadow-sm"
                            : "bg-cream-50 text-teal-700 border border-border hover:bg-cream-100"
                        }`}
                        style={{ fontSize: "0.8rem", fontWeight: 500 }}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{loc.name}</span>
                      </button>
                    ))}
                  </div>
                  {selectedLocationData && (
                    <p className="text-muted-foreground mt-2" style={{ fontSize: "0.75rem" }}>
                      {selectedLocationData.address}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-teal-800 mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Modalidad
                  </label>
                  <div className="flex gap-2">
                    {prof.modalities.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedModality(m)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all flex-1 ${
                          selectedModality === m
                            ? "bg-teal-500 text-white shadow-sm"
                            : "bg-cream-50 text-teal-700 border border-border hover:bg-cream-100"
                        }`}
                        style={{ fontSize: "0.8rem", fontWeight: 500 }}
                      >
                        {m === "presencial" ? (
                          <Building2 className="w-3.5 h-3.5" />
                        ) : (
                          <Video className="w-3.5 h-3.5" />
                        )}
                        {m === "presencial" ? "Presencial" : "Virtual"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Date selector - calendar strip */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="text-teal-800 mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                Fechas disponibles
              </h3>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "0.78rem" }}>
                Proximos {availableDates.length} dias con disponibilidad
              </p>
              {availableDates.length === 0 ? (
                <p className="text-muted-foreground py-4 text-center" style={{ fontSize: "0.85rem" }}>
                  No hay fechas disponibles para esta sede
                </p>
              ) : (
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                  {availableDates.map((dateStr) => {
                    const d = new Date(dateStr + "T12:00:00");
                    const slotsCount = timeSlots.filter(
                      (s) => s.date === dateStr && s.available && s.locationId === selectedLocation
                    ).length;
                    return (
                      <button
                        key={dateStr}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedSlot("");
                        }}
                        className={`flex flex-col items-center px-4 py-3 rounded-xl transition-all shrink-0 min-w-[82px] snap-start ${
                          selectedDate === dateStr
                            ? "bg-teal-500 text-white shadow-sm"
                            : "bg-cream-50 text-teal-800 border border-border hover:bg-cream-100"
                        }`}
                      >
                        <span style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                          {d.toLocaleDateString("es-AR", { weekday: "short" })}
                        </span>
                        <span style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3 }}>
                          {d.getDate()}
                        </span>
                        <span style={{ fontSize: "0.65rem", fontWeight: 400 }}>
                          {d.toLocaleDateString("es-AR", { month: "short" })}
                        </span>
                        <span
                          className={`mt-1 px-1.5 py-0.5 rounded-full ${
                            selectedDate === dateStr
                              ? "bg-white/20 text-white"
                              : "bg-teal-50 text-teal-600"
                          }`}
                          style={{ fontSize: "0.6rem", fontWeight: 500 }}
                        >
                          {slotsCount} turnos
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Preview of time slots for selected date */}
            {selectedDate && (
              <div className="bg-white rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-teal-800" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                      Horarios disponibles
                    </h3>
                    <p className="text-muted-foreground capitalize" style={{ fontSize: "0.8rem" }}>
                      {formatDate(selectedDate)}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-teal-50 rounded-lg text-teal-700" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                    {slotsForDate.length} disponibles
                  </span>
                </div>

                {slotsForDate.length === 0 ? (
                  <p className="text-muted-foreground py-4 text-center" style={{ fontSize: "0.85rem" }}>
                    No hay horarios disponibles para esta fecha
                  </p>
                ) : (
                  <div className="space-y-4">
                    {/* Morning slots */}
                    {morningSlots.length > 0 && (
                      <div>
                        <p className="text-muted-foreground mb-2 flex items-center gap-1.5" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                          <span className="w-1 h-1 rounded-full bg-teal-400" />
                          Manana
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                          {morningSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot.id)}
                              className={`py-2.5 rounded-xl transition-all ${
                                selectedSlot === slot.id
                                  ? "bg-teal-500 text-white shadow-sm ring-2 ring-teal-300"
                                  : "bg-cream-50 text-teal-700 border border-border hover:bg-teal-50 hover:border-teal-300"
                              }`}
                              style={{ fontSize: "0.85rem", fontWeight: 500 }}
                            >
                              {slot.startTime}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Afternoon slots */}
                    {afternoonSlots.length > 0 && (
                      <div>
                        <p className="text-muted-foreground mb-2 flex items-center gap-1.5" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                          <span className="w-1 h-1 rounded-full bg-salmon-400" />
                          Tarde
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                          {afternoonSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot.id)}
                              className={`py-2.5 rounded-xl transition-all ${
                                selectedSlot === slot.id
                                  ? "bg-teal-500 text-white shadow-sm ring-2 ring-teal-300"
                                  : "bg-cream-50 text-teal-700 border border-border hover:bg-teal-50 hover:border-teal-300"
                              }`}
                              style={{ fontSize: "0.85rem", fontWeight: 500 }}
                            >
                              {slot.startTime}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedSlot && (
                  <button
                    onClick={() => setStep("choose")}
                    className="w-full mt-5 py-3 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm flex items-center justify-center gap-2"
                    style={{ fontSize: "0.95rem", fontWeight: 600 }}
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===== STEP 2: CHOOSE (Elegir - Review selection) ===== */}
        {step === "choose" && selectedSlotData && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-border p-6">
              <h3 className="text-teal-800 mb-5" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                Revisa tu seleccion
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3.5 bg-teal-50 rounded-xl">
                  <CalendarDays className="w-5 h-5 text-teal-600 shrink-0" />
                  <div>
                    <p className="text-teal-800 capitalize" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      {formatDate(selectedSlotData.date)}
                    </p>
                    <p className="text-teal-600" style={{ fontSize: "0.85rem" }}>
                      {selectedSlotData.startTime} - {selectedSlotData.endTime} ({prof.consultDuration} min)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-cream-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-salmon-500 shrink-0" />
                  <div>
                    <p className="text-teal-800" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      {selectedLocationData?.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                      {selectedLocationData?.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-cream-50 rounded-xl">
                  {selectedModality === "presencial" ? (
                    <Building2 className="w-5 h-5 text-teal-600 shrink-0" />
                  ) : (
                    <Video className="w-5 h-5 text-teal-600 shrink-0" />
                  )}
                  <p className="text-teal-800" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                    Consulta {selectedModality === "presencial" ? "presencial" : "virtual"}
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-cream-50 rounded-xl">
                  <Stethoscope className="w-5 h-5 text-teal-600 shrink-0" />
                  <div>
                    <p className="text-teal-800" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      {prof.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                      {prof.specialty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Change selection hint */}
              <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 mb-5">
                <p className="text-muted-foreground text-center" style={{ fontSize: "0.78rem" }}>
                  Si queres cambiar el horario, podes volver al paso anterior
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("browse")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream-100 text-teal-700 hover:bg-cream-200 transition-all"
                  style={{ fontSize: "0.9rem", fontWeight: 500 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Cambiar
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  className="flex-1 py-2.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm flex items-center justify-center gap-2"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  Confirmar turno
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== STEP 3: CONFIRM (Patient data) ===== */}
        {step === "confirm" && selectedSlotData && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Booking form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-teal-800 mb-1" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  Completa tus datos
                </h3>
                <p className="text-muted-foreground mb-5" style={{ fontSize: "0.8rem" }}>
                  Los campos con * son obligatorios
                </p>
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div>
                    <label htmlFor="booking-name" className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="booking-name"
                        type="text"
                        value={patientForm.name}
                        onChange={(e) =>
                          setPatientForm({ ...patientForm, name: e.target.value })
                        }
                        placeholder="Tu nombre completo"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        style={{ fontSize: "0.9rem" }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      Telefono (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="booking-phone"
                        type="tel"
                        value={patientForm.phone}
                        onChange={(e) =>
                          setPatientForm({ ...patientForm, phone: e.target.value })
                        }
                        placeholder="+54 11 5566 7788"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        style={{ fontSize: "0.9rem" }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-email" className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="booking-email"
                        type="email"
                        value={patientForm.email}
                        onChange={(e) =>
                          setPatientForm({ ...patientForm, email: e.target.value })
                        }
                        placeholder="tu@email.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        style={{ fontSize: "0.9rem" }}
                        required
                      />
                    </div>
                  </div>

                  {/* Different patient toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setPatientForm({
                          ...patientForm,
                          isDifferentPatient: !patientForm.isDifferentPatient,
                        })
                      }
                      className={`w-10 h-6 rounded-full transition-all relative ${
                        patientForm.isDifferentPatient ? "bg-teal-500" : "bg-cream-300"
                      }`}
                      aria-label="El paciente es otra persona"
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-all ${
                          patientForm.isDifferentPatient ? "left-5" : "left-1"
                        }`}
                      />
                    </button>
                    <span className="text-teal-800" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      El paciente es otra persona
                    </span>
                  </div>

                  {patientForm.isDifferentPatient && (
                    <div>
                      <label htmlFor="patient-name" className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                        Nombre del paciente *
                      </label>
                      <input
                        id="patient-name"
                        type="text"
                        value={patientForm.patientName}
                        onChange={(e) =>
                          setPatientForm({
                            ...patientForm,
                            patientName: e.target.value,
                          })
                        }
                        placeholder="Nombre del paciente"
                        className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        style={{ fontSize: "0.9rem" }}
                      />
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label htmlFor="booking-notes" className="block text-teal-800 mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      Notas adicionales <span className="text-muted-foreground">(opcional)</span>
                    </label>
                    <textarea
                      id="booking-notes"
                      value={patientForm.notes}
                      onChange={(e) =>
                        setPatientForm({ ...patientForm, notes: e.target.value })
                      }
                      placeholder="Motivo de consulta, obra social, etc."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                      style={{ fontSize: "0.9rem" }}
                    />
                  </div>

                  {/* Notification preferences */}
                  <div className="p-4 bg-cream-50 rounded-xl border border-cream-200">
                    <p className="text-teal-800 mb-3" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                      Recibir notificaciones por:
                    </p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyWhatsApp}
                          onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                          className="w-4 h-4 rounded border-border text-teal-500 focus:ring-teal-500/20"
                        />
                        <span className="flex items-center gap-1.5 text-teal-700" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.checked)}
                          className="w-4 h-4 rounded border-border text-teal-500 focus:ring-teal-500/20"
                        />
                        <span className="flex items-center gap-1.5 text-teal-700" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep("choose")}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream-100 text-teal-700 hover:bg-cream-200 transition-all"
                      style={{ fontSize: "0.9rem", fontWeight: 500 }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm flex items-center justify-center gap-2"
                      style={{ fontSize: "0.95rem", fontWeight: 600 }}
                    >
                      Reservar turno
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Booking summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-border p-5 sticky top-20">
                <h3 className="text-teal-800 mb-4" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Resumen del turno
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                    <CalendarDays className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="text-teal-800 capitalize" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {formatDate(selectedSlotData.date)}
                      </p>
                      <p className="text-teal-600" style={{ fontSize: "0.8rem" }}>
                        {selectedSlotData.startTime} - {selectedSlotData.endTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl">
                    <MapPin className="w-4 h-4 text-salmon-500 shrink-0" />
                    <div>
                      <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {selectedLocationData?.name}
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                        {selectedLocationData?.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl">
                    {selectedModality === "presencial" ? (
                      <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                    ) : (
                      <Video className="w-4 h-4 text-teal-600 shrink-0" />
                    )}
                    <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                      {selectedModality === "presencial" ? "Presencial" : "Virtual"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                      {prof.consultDuration} minutos
                    </p>
                  </div>
                </div>

                {/* Notification info */}
                <div className="mt-4 p-3 bg-teal-50/50 rounded-xl border border-teal-100">
                  <p className="text-teal-700 flex items-center gap-1.5 mb-1" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                    <MessageCircle className="w-3 h-3" />
                    Notificaciones
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.72rem", lineHeight: 1.5 }}>
                    Recibiras confirmacion inmediata y recordatorio 24h antes
                    {notifyWhatsApp && notifyEmail ? " por WhatsApp y email" : notifyWhatsApp ? " por WhatsApp" : " por email"}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== SUCCESS ===== */}
        {step === "success" && (
          <div className="bg-white rounded-2xl border border-border p-8 max-w-lg mx-auto">
            <div className="text-center mb-6">
              <SuccessIllustration className="w-36 h-36 mx-auto mb-5" />
              <h2 className="text-teal-800 mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                Turno reservado!
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Tu turno fue registrado exitosamente.
              </p>
            </div>

            {/* Appointment details */}
            {selectedSlotData && (
              <div className="bg-teal-50 rounded-xl p-4 mb-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-teal-800 capitalize" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                    {formatDate(selectedSlotData.date)}, {selectedSlotData.startTime}hs
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-teal-800" style={{ fontSize: "0.85rem" }}>
                    {selectedLocationData?.name} - {selectedLocationData?.address}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-teal-800" style={{ fontSize: "0.85rem" }}>
                    {prof.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {selectedModality === "presencial" ? (
                    <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <Video className="w-4 h-4 text-teal-600 shrink-0" />
                  )}
                  <span className="text-teal-800" style={{ fontSize: "0.85rem" }}>
                    {selectedModality === "presencial" ? "Presencial" : "Virtual"}
                  </span>
                </div>
              </div>
            )}

            {/* Notifications sent */}
            <div className="bg-cream-50 rounded-xl p-4 mb-6 border border-cream-200">
              <p className="text-teal-800 mb-3" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                Notificaciones enviadas:
              </p>
              <div className="space-y-2">
                {notifyEmail && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-teal-600" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-teal-700" style={{ fontSize: "0.8rem" }}>
                        Confirmacion enviada a {patientForm.email || "tu email"}
                      </span>
                    </div>
                  </div>
                )}
                {notifyWhatsApp && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-teal-600" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-teal-700" style={{ fontSize: "0.8rem" }}>
                        Confirmacion enviada por WhatsApp
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-cream-200 flex items-center justify-center">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    Recordatorio 24h antes programado
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  toast.success("Evento agregado al calendario");
                }}
                className="w-full py-3 rounded-xl bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                <CalendarPlus className="w-4 h-4" />
                Agregar a mi calendario
              </button>
              <button
                onClick={() => navigate("/mis-turnos")}
                className="w-full py-3 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm"
                style={{ fontSize: "0.9rem", fontWeight: 600 }}
              >
                Ver mis turnos
              </button>
              <button
                onClick={() => {
                  setStep("browse");
                  setSelectedSlot("");
                  setSelectedDate("");
                  setPatientForm({
                    name: "",
                    email: "",
                    phone: "",
                    patientName: "",
                    isDifferentPatient: false,
                    notes: "",
                  });
                }}
                className="w-full py-3 rounded-xl bg-cream-100 text-teal-700 hover:bg-cream-200 transition-all"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                Reservar otro turno
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}