export interface Professional {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  description: string;
  avatar: string;
  locations: Location[];
  modalities: ("presencial" | "virtual")[];
  consultDuration: number; // minutes
  publicLink: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
}

export interface TimeSlot {
  id: string;
  date: string; // ISO date
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  locationId: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  locationId: string;
  locationName: string;
  modality: "presencial" | "virtual";
  status: "confirmado" | "pendiente" | "cancelado" | "reprogramado";
  professionalId: string;
  createdAt: string;
  notifications?: NotificationLog[];
}

export interface NotificationLog {
  id: string;
  channel: "email" | "whatsapp";
  type: "confirmacion" | "recordatorio" | "cancelacion" | "reprogramacion";
  sentAt: string;
  status: "enviado" | "entregado" | "leido" | "fallido";
}

export interface IntegrationConfig {
  whatsapp: {
    enabled: boolean;
    provider: string;
    phoneNumber: string;
    connected: boolean;
    templates: {
      confirmacion: string;
      recordatorio: string;
      cancelacion: string;
    };
  };
  email: {
    enabled: boolean;
    senderName: string;
    senderEmail: string;
    templates: {
      confirmacion: string;
      recordatorio: string;
      cancelacion: string;
    };
  };
  googleCalendar: {
    enabled: boolean;
    connected: boolean;
    calendarId: string;
    autoCreateEvent: boolean;
  };
}

export interface WeeklyAvailability {
  dayOfWeek: number; // 0-6 (Sun-Sat)
  dayName: string;
  slots: { start: string; end: string; locationId: string }[];
  enabled: boolean;
}

export const mockProfessional: Professional = {
  id: "prof-001",
  name: "Dra. Laura Mendez",
  slug: "laura-mendez",
  specialty: "Ginecologia y Obstetricia",
  description:
    "Mas de 15 anos de experiencia en salud femenina. Atencion personalizada y seguimiento integral. Especialista en embarazo de alto riesgo y salud reproductiva.",
  avatar: "",
  locations: [
    {
      id: "loc-001",
      name: "Consultorio Centro",
      address: "Av. Corrientes 1234, CABA",
      lat: -34.6037,
      lng: -58.3816,
    },
    {
      id: "loc-002",
      name: "Clinica Norte",
      address: "Av. Cabildo 2456, Belgrano",
      lat: -34.5609,
      lng: -58.4586,
    },
  ],
  modalities: ["presencial", "virtual"],
  consultDuration: 30,
  publicLink: "/dr/laura-mendez",
};

export const mockWeeklyAvailability: WeeklyAvailability[] = [
  { dayOfWeek: 0, dayName: "Domingo", slots: [], enabled: false },
  {
    dayOfWeek: 1,
    dayName: "Lunes",
    slots: [
      { start: "09:00", end: "13:00", locationId: "loc-001" },
      { start: "15:00", end: "19:00", locationId: "loc-001" },
    ],
    enabled: true,
  },
  {
    dayOfWeek: 2,
    dayName: "Martes",
    slots: [
      { start: "09:00", end: "13:00", locationId: "loc-002" },
    ],
    enabled: true,
  },
  {
    dayOfWeek: 3,
    dayName: "Miercoles",
    slots: [
      { start: "09:00", end: "13:00", locationId: "loc-001" },
      { start: "15:00", end: "19:00", locationId: "loc-001" },
    ],
    enabled: true,
  },
  {
    dayOfWeek: 4,
    dayName: "Jueves",
    slots: [
      { start: "10:00", end: "14:00", locationId: "loc-002" },
    ],
    enabled: true,
  },
  {
    dayOfWeek: 5,
    dayName: "Viernes",
    slots: [
      { start: "09:00", end: "12:00", locationId: "loc-001" },
    ],
    enabled: true,
  },
  { dayOfWeek: 6, dayName: "Sabado", slots: [], enabled: false },
];

const today = new Date();
const formatDate = (d: Date) => d.toISOString().split("T")[0];

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const mockAppointments: Appointment[] = [
  {
    id: "apt-001",
    patientName: "Maria Garcia",
    patientEmail: "maria@email.com",
    patientPhone: "+5491155667788",
    date: formatDate(today),
    startTime: "09:00",
    endTime: "09:30",
    locationId: "loc-001",
    locationName: "Consultorio Centro",
    modality: "presencial",
    status: "confirmado",
    professionalId: "prof-001",
    createdAt: formatDate(addDays(today, -3)),
    notifications: [
      { id: "n-001", channel: "email", type: "confirmacion", sentAt: formatDate(addDays(today, -3)), status: "entregado" },
      { id: "n-002", channel: "whatsapp", type: "confirmacion", sentAt: formatDate(addDays(today, -3)), status: "leido" },
      { id: "n-003", channel: "whatsapp", type: "recordatorio", sentAt: formatDate(addDays(today, -1)), status: "leido" },
    ],
  },
  {
    id: "apt-002",
    patientName: "Ana Rodriguez",
    patientEmail: "ana@email.com",
    patientPhone: "+5491144556677",
    date: formatDate(today),
    startTime: "09:30",
    endTime: "10:00",
    locationId: "loc-001",
    locationName: "Consultorio Centro",
    modality: "presencial",
    status: "confirmado",
    professionalId: "prof-001",
    createdAt: formatDate(addDays(today, -2)),
    notifications: [
      { id: "n-004", channel: "email", type: "confirmacion", sentAt: formatDate(addDays(today, -2)), status: "entregado" },
      { id: "n-005", channel: "whatsapp", type: "recordatorio", sentAt: formatDate(addDays(today, -1)), status: "entregado" },
    ],
  },
  {
    id: "apt-003",
    patientName: "Carolina Lopez",
    patientEmail: "carolina@email.com",
    patientPhone: "+5491133445566",
    date: formatDate(today),
    startTime: "10:00",
    endTime: "10:30",
    locationId: "loc-001",
    locationName: "Consultorio Centro",
    modality: "virtual",
    status: "pendiente",
    professionalId: "prof-001",
    createdAt: formatDate(addDays(today, -1)),
    notifications: [
      { id: "n-006", channel: "email", type: "confirmacion", sentAt: formatDate(addDays(today, -1)), status: "entregado" },
      { id: "n-007", channel: "whatsapp", type: "confirmacion", sentAt: formatDate(addDays(today, -1)), status: "enviado" },
    ],
  },
  {
    id: "apt-004",
    patientName: "Paula Martinez",
    patientEmail: "paula@email.com",
    patientPhone: "+5491122334455",
    date: formatDate(addDays(today, 1)),
    startTime: "10:00",
    endTime: "10:30",
    locationId: "loc-002",
    locationName: "Clinica Norte",
    modality: "presencial",
    status: "confirmado",
    professionalId: "prof-001",
    createdAt: formatDate(addDays(today, -1)),
  },
  {
    id: "apt-005",
    patientName: "Sofia Fernandez",
    patientEmail: "sofia@email.com",
    patientPhone: "+5491166778899",
    date: formatDate(addDays(today, 1)),
    startTime: "11:00",
    endTime: "11:30",
    locationId: "loc-002",
    locationName: "Clinica Norte",
    modality: "presencial",
    status: "pendiente",
    professionalId: "prof-001",
    createdAt: formatDate(today),
  },
  {
    id: "apt-006",
    patientName: "Lucia Ruiz",
    patientEmail: "lucia@email.com",
    patientPhone: "+5491177889900",
    date: formatDate(addDays(today, 2)),
    startTime: "09:00",
    endTime: "09:30",
    locationId: "loc-001",
    locationName: "Consultorio Centro",
    modality: "presencial",
    status: "confirmado",
    professionalId: "prof-001",
    createdAt: formatDate(today),
  },
  {
    id: "apt-007",
    patientName: "Valentina Diaz",
    patientEmail: "valentina@email.com",
    patientPhone: "+5491188990011",
    date: formatDate(addDays(today, -1)),
    startTime: "15:00",
    endTime: "15:30",
    locationId: "loc-001",
    locationName: "Consultorio Centro",
    modality: "virtual",
    status: "cancelado",
    professionalId: "prof-001",
    createdAt: formatDate(addDays(today, -5)),
    notifications: [
      { id: "n-008", channel: "email", type: "cancelacion", sentAt: formatDate(addDays(today, -2)), status: "entregado" },
      { id: "n-009", channel: "whatsapp", type: "cancelacion", sentAt: formatDate(addDays(today, -2)), status: "leido" },
    ],
  },
  {
    id: "apt-008",
    patientName: "Camila Torres",
    patientEmail: "camila@email.com",
    patientPhone: "+5491199001122",
    date: formatDate(addDays(today, 3)),
    startTime: "15:00",
    endTime: "15:30",
    locationId: "loc-001",
    locationName: "Consultorio Centro",
    modality: "presencial",
    status: "confirmado",
    professionalId: "prof-001",
    createdAt: formatDate(today),
  },
];

export const mockIntegrationConfig: IntegrationConfig = {
  whatsapp: {
    enabled: true,
    provider: "Twilio",
    phoneNumber: "+5491100001111",
    connected: true,
    templates: {
      confirmacion: "Hola {{nombre}}, tu turno con {{profesional}} fue confirmado para el {{fecha}} a las {{hora}}. Sede: {{sede}}. Para gestionar tu turno: {{link}}",
      recordatorio: "Recordatorio: Tenes turno manana {{fecha}} a las {{hora}} con {{profesional}}. Responde SI para confirmar o NO para cancelar.",
      cancelacion: "Tu turno del {{fecha}} a las {{hora}} con {{profesional}} fue cancelado. Para reprogramar: {{link}}",
    },
  },
  email: {
    enabled: true,
    senderName: "Health Hub",
    senderEmail: "turnos@healthhub.com",
    templates: {
      confirmacion: "Tu turno ha sido confirmado",
      recordatorio: "Recordatorio de tu turno de manana",
      cancelacion: "Tu turno ha sido cancelado",
    },
  },
  googleCalendar: {
    enabled: false,
    connected: false,
    calendarId: "",
    autoCreateEvent: true,
  },
};

// Generate time slots for the next 14 days
export function generateTimeSlots(
  professional: Professional,
  availability: WeeklyAvailability[]
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const now = new Date();

  for (let i = 0; i < 14; i++) {
    const date = addDays(now, i);
    const dayOfWeek = date.getDay();
    const dayAvail = availability.find((a) => a.dayOfWeek === dayOfWeek);

    if (!dayAvail || !dayAvail.enabled) continue;

    for (const slot of dayAvail.slots) {
      const startHour = parseInt(slot.start.split(":")[0]);
      const endHour = parseInt(slot.end.split(":")[0]);
      const duration = professional.consultDuration;

      for (let h = startHour; h < endHour; h++) {
        for (let m = 0; m < 60; m += duration) {
          if (h === endHour - 1 && m + duration > 60) continue;
          const startTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
          const endM = m + duration;
          const endH = h + Math.floor(endM / 60);
          const endMin = endM % 60;
          const endTime = `${String(endH).padStart(2, "0")}:${String(endMin).padStart(2, "0")}`;
          const dateStr = formatDate(date);

          const isBooked = mockAppointments.some(
            (a) =>
              a.date === dateStr &&
              a.startTime === startTime &&
              a.status !== "cancelado"
          );

          slots.push({
            id: `slot-${dateStr}-${startTime}`,
            date: dateStr,
            startTime,
            endTime,
            locationId: slot.locationId,
            available: !isBooked,
          });
        }
      }
    }
  }

  return slots;
}