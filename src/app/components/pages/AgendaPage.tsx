import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  X,
  Save,
  Lock,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";
import {
  mockAppointments,
  mockWeeklyAvailability,
  mockProfessional,
  type WeeklyAvailability,
  type Appointment,
} from "../../data/mockData";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 to 19:00

function getWeekDates(offset: number): Date[] {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  startOfWeek.setDate(startOfWeek.getDate() + diff + offset * 7);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function formatDateISO(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function AgendaPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [view, setView] = useState<"calendar" | "availability">("calendar");
  const [availability, setAvailability] = useState<WeeklyAvailability[]>(
    mockWeeklyAvailability
  );
  const [blockedSlots, setBlockedSlots] = useState<
    { date: string; time: string }[]
  >([]);

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

  const todayStr = formatDateISO(new Date());

  const toggleDayEnabled = (dayOfWeek: number) => {
    setAvailability((prev) =>
      prev.map((d) =>
        d.dayOfWeek === dayOfWeek ? { ...d, enabled: !d.enabled } : d
      )
    );
  };

  const addSlot = (dayOfWeek: number) => {
    setAvailability((prev) =>
      prev.map((d) =>
        d.dayOfWeek === dayOfWeek
          ? {
              ...d,
              slots: [
                ...d.slots,
                {
                  start: "09:00",
                  end: "13:00",
                  locationId: mockProfessional.locations[0].id,
                },
              ],
            }
          : d
      )
    );
  };

  const removeSlot = (dayOfWeek: number, slotIndex: number) => {
    setAvailability((prev) =>
      prev.map((d) =>
        d.dayOfWeek === dayOfWeek
          ? { ...d, slots: d.slots.filter((_, i) => i !== slotIndex) }
          : d
      )
    );
  };

  const updateSlot = (
    dayOfWeek: number,
    slotIndex: number,
    field: string,
    value: string
  ) => {
    setAvailability((prev) =>
      prev.map((d) =>
        d.dayOfWeek === dayOfWeek
          ? {
              ...d,
              slots: d.slots.map((s, i) =>
                i === slotIndex ? { ...s, [field]: value } : s
              ),
            }
          : d
      )
    );
  };

  const toggleBlockSlot = (date: string, time: string) => {
    setBlockedSlots((prev) => {
      const exists = prev.some((s) => s.date === date && s.time === time);
      if (exists) return prev.filter((s) => !(s.date === date && s.time === time));
      return [...prev, { date, time }];
    });
  };

  const isBlocked = (date: string, time: string) =>
    blockedSlots.some((s) => s.date === date && s.time === time);

  const getAppointmentsForSlot = (
    date: string,
    hour: number
  ): Appointment[] => {
    return mockAppointments.filter(
      (a) =>
        a.date === date &&
        parseInt(a.startTime.split(":")[0]) === hour &&
        a.status !== "cancelado"
    );
  };

  const handleSaveAvailability = () => {
    toast.success("Disponibilidad actualizada", {
      description: "Tu agenda ha sido configurada correctamente.",
    });
  };

  const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const monthYear = weekDates[3].toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-teal-800" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Agenda
          </h1>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
            Gestiona tu calendario y disponibilidad
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("calendar")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              view === "calendar"
                ? "bg-teal-500 text-white shadow-sm"
                : "bg-white text-teal-700 border border-border hover:bg-teal-50"
            }`}
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            <CalendarDays className="w-4 h-4" />
            Calendario
          </button>
          <button
            onClick={() => setView("availability")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              view === "availability"
                ? "bg-teal-500 text-white shadow-sm"
                : "bg-white text-teal-700 border border-border hover:bg-teal-50"
            }`}
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            <Clock className="w-4 h-4" />
            Disponibilidad
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <CalendarView
          weekDates={weekDates}
          weekOffset={weekOffset}
          setWeekOffset={setWeekOffset}
          todayStr={todayStr}
          monthYear={monthYear}
          dayNames={dayNames}
          isBlocked={isBlocked}
          toggleBlockSlot={toggleBlockSlot}
          getAppointmentsForSlot={getAppointmentsForSlot}
          availability={availability}
        />
      ) : (
        <AvailabilityView
          availability={availability}
          toggleDayEnabled={toggleDayEnabled}
          addSlot={addSlot}
          removeSlot={removeSlot}
          updateSlot={updateSlot}
          onSave={handleSaveAvailability}
        />
      )}
    </div>
  );
}

function CalendarView({
  weekDates,
  weekOffset,
  setWeekOffset,
  todayStr,
  monthYear,
  dayNames,
  isBlocked,
  toggleBlockSlot,
  getAppointmentsForSlot,
  availability,
}: {
  weekDates: Date[];
  weekOffset: number;
  setWeekOffset: (v: number) => void;
  todayStr: string;
  monthYear: string;
  dayNames: string[];
  isBlocked: (date: string, time: string) => boolean;
  toggleBlockSlot: (date: string, time: string) => void;
  getAppointmentsForSlot: (date: string, hour: number) => Appointment[];
  availability: WeeklyAvailability[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Calendar header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <button
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="p-2 rounded-xl hover:bg-cream-100 text-teal-700 transition-colors"
          aria-label="Semana anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <p className="text-teal-800 capitalize" style={{ fontSize: "1rem", fontWeight: 600 }}>
            {monthYear}
          </p>
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="text-teal-500 hover:text-teal-600 mt-0.5"
              style={{ fontSize: "0.75rem", fontWeight: 500 }}
            >
              Ir a hoy
            </button>
          )}
        </div>
        <button
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="p-2 rounded-xl hover:bg-cream-100 text-teal-700 transition-colors"
          aria-label="Semana siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Day headers */}
          <div className="grid grid-cols-8 border-b border-border">
            <div className="p-3" />
            {weekDates.map((date) => {
              const dateStr = formatDateISO(date);
              const isToday = dateStr === todayStr;
              return (
                <div
                  key={dateStr}
                  className={`p-3 text-center ${isToday ? "bg-teal-50" : ""}`}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                    {dayNames[date.getDay()]}
                  </p>
                  <p
                    className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                      isToday ? "bg-teal-500 text-white" : "text-teal-800"
                    }`}
                    style={{ fontSize: "0.85rem", fontWeight: isToday ? 700 : 500 }}
                  >
                    {date.getDate()}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Time slots */}
          {HOURS.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-border last:border-b-0">
              <div className="p-2 flex items-start justify-end pr-3 pt-3">
                <span className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                  {String(hour).padStart(2, "0")}:00
                </span>
              </div>
              {weekDates.map((date) => {
                const dateStr = formatDateISO(date);
                const isToday = dateStr === todayStr;
                const timeStr = `${String(hour).padStart(2, "0")}:00`;
                const blocked = isBlocked(dateStr, timeStr);
                const appointments = getAppointmentsForSlot(dateStr, hour);
                const dayAvail = availability.find(
                  (a) => a.dayOfWeek === date.getDay()
                );
                const isAvailable =
                  dayAvail?.enabled &&
                  dayAvail.slots.some(
                    (s) =>
                      hour >= parseInt(s.start.split(":")[0]) &&
                      hour < parseInt(s.end.split(":")[0])
                  );

                return (
                  <div
                    key={dateStr}
                    className={`min-h-[56px] p-1 border-l border-border relative cursor-pointer transition-colors
                      ${isToday ? "bg-teal-50/50" : ""}
                      ${blocked ? "bg-red-50/50" : ""}
                      ${!isAvailable && !blocked ? "bg-cream-100/50" : ""}
                      hover:bg-teal-50/30`}
                    onClick={() => {
                      if (appointments.length === 0) {
                        toggleBlockSlot(dateStr, timeStr);
                      }
                    }}
                  >
                    {blocked && (
                      <div className="absolute inset-1 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-red-400" />
                      </div>
                    )}
                    {appointments.map((apt) => (
                      <div
                        key={apt.id}
                        className={`rounded-lg p-1.5 mb-0.5 ${
                          apt.status === "confirmado"
                            ? "bg-teal-100 border border-teal-200"
                            : "bg-amber-100 border border-amber-200"
                        }`}
                      >
                        <p
                          className={`truncate ${
                            apt.status === "confirmado"
                              ? "text-teal-800"
                              : "text-amber-800"
                          }`}
                          style={{ fontSize: "0.65rem", fontWeight: 600 }}
                        >
                          {apt.patientName.split(" ")[0]}
                        </p>
                        <p className="text-muted-foreground truncate" style={{ fontSize: "0.6rem" }}>
                          {apt.startTime}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="p-3 border-t border-border flex flex-wrap gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-teal-100 border border-teal-200" />
          <span className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>Confirmado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-100 border border-amber-200" />
          <span className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>Pendiente</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-100 border border-red-200" />
          <span className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>Bloqueado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-cream-100 border border-border" />
          <span className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>No disponible</span>
        </div>
      </div>
    </div>
  );
}

function AvailabilityView({
  availability,
  toggleDayEnabled,
  addSlot,
  removeSlot,
  updateSlot,
  onSave,
}: {
  availability: WeeklyAvailability[];
  toggleDayEnabled: (day: number) => void;
  addSlot: (day: number) => void;
  removeSlot: (day: number, index: number) => void;
  updateSlot: (day: number, index: number, field: string, value: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="text-teal-800" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
            Disponibilidad semanal
          </h2>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm"
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>

        <div className="divide-y divide-border">
          {availability.map((day) => (
            <div key={day.dayOfWeek} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDayEnabled(day.dayOfWeek)}
                    className={`w-10 h-6 rounded-full transition-all relative ${
                      day.enabled ? "bg-teal-500" : "bg-cream-300"
                    }`}
                    aria-label={`${day.enabled ? "Desactivar" : "Activar"} ${day.dayName}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-all ${
                        day.enabled ? "left-5" : "left-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`${day.enabled ? "text-teal-800" : "text-muted-foreground"}`}
                    style={{ fontSize: "0.9rem", fontWeight: 500 }}
                  >
                    {day.dayName}
                  </span>
                </div>
                {day.enabled && (
                  <button
                    onClick={() => addSlot(day.dayOfWeek)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-all"
                    style={{ fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    <Plus className="w-3 h-3" />
                    Franja
                  </button>
                )}
              </div>

              {day.enabled && (
                <div className="space-y-2 ml-13">
                  {day.slots.length === 0 ? (
                    <p className="text-muted-foreground ml-[52px]" style={{ fontSize: "0.8rem" }}>
                      Sin horarios configurados
                    </p>
                  ) : (
                    day.slots.map((slot, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 ml-[52px] flex-wrap"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={slot.start}
                            onChange={(e) =>
                              updateSlot(day.dayOfWeek, idx, "start", e.target.value)
                            }
                            className="px-3 py-1.5 rounded-lg bg-cream-50 border border-border focus:border-teal-500 outline-none"
                            style={{ fontSize: "0.8rem", fontFamily: "'Public Sans', sans-serif" }}
                          />
                          <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                            a
                          </span>
                          <input
                            type="time"
                            value={slot.end}
                            onChange={(e) =>
                              updateSlot(day.dayOfWeek, idx, "end", e.target.value)
                            }
                            className="px-3 py-1.5 rounded-lg bg-cream-50 border border-border focus:border-teal-500 outline-none"
                            style={{ fontSize: "0.8rem", fontFamily: "'Public Sans', sans-serif" }}
                          />
                        </div>
                        <select
                          value={slot.locationId}
                          onChange={(e) =>
                            updateSlot(day.dayOfWeek, idx, "locationId", e.target.value)
                          }
                          className="px-3 py-1.5 rounded-lg bg-cream-50 border border-border focus:border-teal-500 outline-none"
                          style={{ fontSize: "0.8rem", fontFamily: "'Public Sans', sans-serif" }}
                        >
                          {mockProfessional.locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeSlot(day.dayOfWeek, idx)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                          aria-label="Eliminar franja"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}