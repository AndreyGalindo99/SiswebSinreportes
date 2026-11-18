import { useState } from "react";
import { Toaster } from "sonner";
import { AdminPayments } from "./components/AdminPayments";
import { ClientDashboard } from "./components/ClientDashboard";
import { ClientHistory } from "./components/ClientHistory";
import { EvidenceModule } from "./components/EvidenceModule";
import { HomePage } from "./components/HomePage";
import { LawyerCase } from "./components/LawyerCase";
import { LoadPayments } from "./components/LoadPayments";
import { Login } from "./components/Login";
import { ManageOffices } from "./components/ManageOffices";
import { ManageUsers } from "./components/ManageUsers";
import { ManagerPanel } from "./components/ManagerPanel";
import { OwnerPanel } from "./components/OwnerPanel";
import { PaymentsModule } from "./components/PaymentsModule";
import { ProfileModule } from "./components/ProfileModule";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setActiveTab("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setActiveTab("home");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "client-case":
        return <ClientDashboard onNavigate={setActiveTab} />;
      case "cases":
        return <LawyerCase />;
      case "evidence":
        return <EvidenceModule role={userRole} />;
      case "payments":
        return <PaymentsModule />;
      case "manager":
        return <ManagerPanel />;
      case "owner":
        return <OwnerPanel />;
      case "history":
        return <ClientHistory />;
      case "admin-payments":
        return <AdminPayments />;
      case "load-payments":
        return <LoadPayments />;
      case "manage-users":
        return <ManageUsers />;
      case "manage-offices":
        return <ManageOffices />;
      case "profile":
        return <ProfileModule />;
      default:
        return (
          <div className="flex min-h-screen items-center justify-center bg-background p-8">
            <div className="text-center">
              <h2 className="text-2xl text-slate-900 mb-2">Módulo en Desarrollo</h2>
              <p className="text-slate-600">Esta sección estará disponible próximamente</p>
            </div>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        role={userRole}
        onLogout={handleLogout}
      />
      <div className="min-w-0 flex-1 overflow-auto">
        {renderContent()}
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
