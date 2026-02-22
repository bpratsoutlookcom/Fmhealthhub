import React, { useState } from "react";
import {
  User,
  MapPin,
  Clock,
  Link2,
  Plus,
  Trash2,
  Save,
  Copy,
  Check,
  Building2,
  Video,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { mockProfessional } from "../../data/mockData";
import featureImage from "figma:asset/6e0b4ac764995516584fb48a9bca8009cce69f88.png";

export function ProfileSetup() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [profile, setProfile] = useState({
    name: mockProfessional.name,
    specialty: mockProfessional.specialty,
    description: mockProfessional.description,
    consultDuration: mockProfessional.consultDuration,
    modalities: mockProfessional.modalities as string[],
  });
  const [locations, setLocations] = useState(mockProfessional.locations);

  const handleSave = () => {
    toast.success("Perfil actualizado correctamente", {
      description: "Los cambios se reflejaran en tu perfil publico.",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`healthhub.com/dr/${mockProfessional.slug}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        id: `loc-${Date.now()}`,
        name: "",
        address: "",
      },
    ]);
  };

  const removeLocation = (id: string) => {
    setLocations(locations.filter((l) => l.id !== id));
  };

  const updateLocation = (id: string, field: string, value: string) => {
    setLocations(
      locations.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const toggleModality = (modality: string) => {
    setProfile((prev) => ({
      ...prev,
      modalities: prev.modalities.includes(modality)
        ? prev.modalities.filter((m) => m !== modality)
        : [...prev.modalities, modality],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-teal-800" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Mi Perfil Profesional
          </h1>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
            Esta informacion se mostrara en tu pagina publica de turnos
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-sm self-start"
          style={{ fontSize: "0.9rem", fontWeight: 600 }}
        >
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
      </div>

      {/* Public link */}
      <div className="bg-teal-50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
            <Link2 className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-teal-800" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              Tu link publico
            </p>
            <p className="text-teal-600" style={{ fontSize: "0.8rem" }}>
              healthhub.com/dr/{mockProfessional.slug}
            </p>
          </div>
        </div>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-teal-200 hover:bg-teal-100 transition-all"
          style={{ fontSize: "0.8rem", fontWeight: 500 }}
        >
          {linkCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-teal-700">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-teal-700">Copiar link</span>
            </>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center">
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <h2 className="text-teal-800" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                Informacion basica
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="prof-name"
                  className="block text-teal-800 mb-1.5"
                  style={{ fontSize: "0.8rem", fontWeight: 500 }}
                >
                  Nombre completo
                </label>
                <input
                  id="prof-name"
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>

              <div>
                <label
                  htmlFor="specialty"
                  className="block text-teal-800 mb-1.5"
                  style={{ fontSize: "0.8rem", fontWeight: 500 }}
                >
                  Especialidad
                </label>
                <div className="relative">
                  <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="specialty"
                    type="text"
                    value={profile.specialty}
                    onChange={(e) =>
                      setProfile({ ...profile, specialty: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-teal-800 mb-1.5"
                  style={{ fontSize: "0.8rem", fontWeight: 500 }}
                >
                  Descripcion breve
                </label>
                <textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) =>
                    setProfile({ ...profile, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                  style={{ fontSize: "0.9rem", fontFamily: "'Public Sans', sans-serif" }}
                />
              </div>
            </div>
          </div>

          {/* Consultation settings */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-salmon-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-salmon-500" />
              </div>
              <h2 className="text-teal-800" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                Configuracion de consulta
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-teal-800 mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  Duracion de consulta
                </label>
                <div className="flex gap-2">
                  {[15, 20, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() =>
                        setProfile({ ...profile, consultDuration: mins })
                      }
                      className={`px-4 py-2 rounded-xl transition-all ${
                        profile.consultDuration === mins
                          ? "bg-teal-500 text-white shadow-sm"
                          : "bg-cream-50 text-teal-700 hover:bg-cream-200 border border-border"
                      }`}
                      style={{ fontSize: "0.8rem", fontWeight: 500 }}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-teal-800 mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  Modalidad de atencion
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleModality("presencial")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                      profile.modalities.includes("presencial")
                        ? "bg-teal-500 text-white shadow-sm"
                        : "bg-cream-50 text-teal-700 hover:bg-cream-200 border border-border"
                    }`}
                    style={{ fontSize: "0.85rem", fontWeight: 500 }}
                  >
                    <Building2 className="w-4 h-4" />
                    Presencial
                  </button>
                  <button
                    onClick={() => toggleModality("virtual")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                      profile.modalities.includes("virtual")
                        ? "bg-teal-500 text-white shadow-sm"
                        : "bg-cream-50 text-teal-700 hover:bg-cream-200 border border-border"
                    }`}
                    style={{ fontSize: "0.85rem", fontWeight: 500 }}
                  >
                    <Video className="w-4 h-4" />
                    Virtual
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="text-teal-800" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                  Sedes
                </h2>
              </div>
              <button
                onClick={addLocation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition-all"
                style={{ fontSize: "0.8rem", fontWeight: 500 }}
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar sede
              </button>
            </div>

            <div className="space-y-4">
              {locations.map((loc, idx) => (
                <div
                  key={loc.id}
                  className="p-4 rounded-xl bg-cream-50 border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-teal-700" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                      Sede {idx + 1}
                    </span>
                    {locations.length > 1 && (
                      <button
                        onClick={() => removeLocation(loc.id)}
                        className="p-1 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
                        aria-label="Eliminar sede"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-muted-foreground mb-1" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={loc.name}
                        onChange={(e) =>
                          updateLocation(loc.id, "name", e.target.value)
                        }
                        placeholder="Ej: Consultorio Centro"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground mb-1" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                        Direccion
                      </label>
                      <input
                        type="text"
                        value={loc.address}
                        onChange={(e) =>
                          updateLocation(loc.id, "address", e.target.value)
                        }
                        placeholder="Ej: Av. Corrientes 1234"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-border focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-border p-5 text-center">
              <p className="text-muted-foreground mb-3" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                Vista previa del perfil
              </p>
              <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-teal-700" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  {profile.name
                    .split(" ")
                    .filter((_, i) => i === 0 || i === profile.name.split(" ").length - 1)
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <p className="text-teal-800 mb-0.5" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                {profile.name}
              </p>
              <p className="text-salmon-500 mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                {profile.specialty}
              </p>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                {profile.description.substring(0, 120)}...
              </p>
              <div className="space-y-2 text-left">
                {locations.filter(l => l.name).map((loc) => (
                  <div
                    key={loc.id}
                    className="flex items-center gap-2 px-3 py-2 bg-cream-50 rounded-lg"
                  >
                    <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                    <span className="text-teal-800 truncate" style={{ fontSize: "0.75rem" }}>
                      {loc.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {profile.modalities.map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700"
                    style={{ fontSize: "0.7rem", fontWeight: 500 }}
                  >
                    {m === "presencial" ? "Presencial" : "Virtual"}
                  </span>
                ))}
                <span className="px-2.5 py-1 rounded-lg bg-salmon-100 text-salmon-500" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                  {profile.consultDuration} min
                </span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src={featureImage} alt="Gestion profesional" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}