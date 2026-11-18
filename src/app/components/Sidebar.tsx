import { BarChart3, Banknote, Building2, CreditCard, FileClock, FileText, Home, Landmark, LogOut, MessageSquare, Settings2, Upload, User, UsersRound } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: string;
  onLogout: () => void;
}

export function Sidebar({ activeTab, onTabChange, role, onLogout }: SidebarProps) {
  const clientMenuItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "client-case", label: "Mi caso", icon: FileText },
    { id: "evidence", label: "Evidencias", icon: Upload },
    { id: "payments", label: "Pagos", icon: CreditCard },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "profile", label: "Perfil", icon: User },
  ];

  const lawyerMenuItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "cases", label: "Casos", icon: UsersRound },
    { id: "evidence", label: "Evidencias", icon: Upload },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "history", label: "Historial cliente", icon: FileClock },
    { id: "profile", label: "Perfil", icon: User },
  ];

  const managerMenuItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "manager", label: "Panel gerencial", icon: BarChart3 },
    { id: "history", label: "Historial cliente", icon: FileClock },
    { id: "admin-payments", label: "Panel de pagos", icon: CreditCard },
    { id: "load-payments", label: "Cargar pagos", icon: Banknote },
    { id: "profile", label: "Perfil", icon: User },
  ];

  const ownerMenuItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "owner", label: "Panel ejecutivo", icon: Building2 },
    { id: "history", label: "Historial cliente", icon: FileClock },
    { id: "admin-payments", label: "Panel de pagos", icon: CreditCard },
    { id: "manage-users", label: "Administrar usuarios", icon: Settings2 },
    { id: "manage-offices", label: "Administrar oficinas", icon: Landmark },
    { id: "profile", label: "Perfil", icon: User },
  ];

  const getMenuItems = () => {
    if (role === "abogado") return lawyerMenuItems;
    if (role === "gerente") return managerMenuItems;
    if (role === "dueño") return ownerMenuItems;
    return clientMenuItems;
  };

  const menuItems = getMenuItems();

  const getRoleTitle = () => {
    if (role === "gerente") return "Gestión";
    if (role === "dueño") return "Ejecutivo";
    if (role === "abogado") return "Equipo legal";
    return "Portal cliente";
  };

  return (
    <aside className="flex h-screen w-[76px] shrink-0 flex-col bg-sidebar lg:w-64">
      <div className="border-b border-sidebar-border px-4 py-6 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="hidden lg:block">
            <h2 className="font-bold text-sidebar-foreground">Áurea Legal</h2>
            <p className="text-xs text-sidebar-foreground/60">{getRoleTitle()}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3 lg:p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              title={item.label}
              className={`flex w-full items-center justify-center gap-3 rounded-md px-3 py-3 text-left text-sm transition-colors lg:justify-start lg:px-4 ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden lg:block">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3 lg:p-4">
        <button
          onClick={onLogout}
          title="Cerrar sesión"
          className="flex w-full items-center justify-center gap-3 rounded-md px-3 py-3 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent lg:justify-start lg:px-4"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden lg:block">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
