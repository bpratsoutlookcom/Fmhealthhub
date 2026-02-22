import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/pages/LandingPage";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { DashboardHome } from "./components/pages/DashboardHome";
import { ProfileSetup } from "./components/pages/ProfileSetup";
import { AgendaPage } from "./components/pages/AgendaPage";
import { IntegrationsPage } from "./components/pages/IntegrationsPage";
import { PublicProfile } from "./components/pages/PublicProfile";
import { PatientAppointments } from "./components/pages/PatientAppointments";
import { LoginPage } from "./components/pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "perfil", Component: ProfileSetup },
      { path: "agenda", Component: AgendaPage },
      { path: "integraciones", Component: IntegrationsPage },
    ],
  },
  {
    path: "/dr/:slug",
    Component: PublicProfile,
  },
  {
    path: "/mis-turnos",
    Component: PatientAppointments,
  },
]);
