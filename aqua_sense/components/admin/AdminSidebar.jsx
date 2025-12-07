'use client';

import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  History, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  Droplets,
  UserX,
  Eye,
  Home
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: History, label: 'Batch History', path: '/admin/batch-history' },
    { 
      icon: Users, 
      label: 'Users Management', 
      path: '/admin/users'
      // subItems: [
      //   { icon: Eye, label: 'View Users', path: '/admin/users' },
      //   { icon: UserX, label: 'Delete User', path: '/admin/users/delete' }
      // ]
    },
    { icon: MessageSquare, label: 'Customer Queries', path: '/admin/queries' },
    { icon: FileText, label: 'Staff Reports', path: '/admin/reports' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: Home, label: 'Home Page', path: '/' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    router.push('/');
  };

  return (
    <aside className="relative w-72 h-screen bg-gradient-to-br from-shakespeare-50 via-shakespeare-100 to-shakespeare-200 border-r border-shakespeare-300/30 overflow-hidden">
      {/* Animated water background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-shakespeare-400/30 to-transparent animate-wave" />
        <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-aqua-teal/30 to-transparent animate-wave" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating water droplets */}
      <div className="absolute top-20 left-10 w-3 h-3 rounded-full bg-shakespeare-400/30 animate-float" />
      <div className="absolute top-40 right-8 w-2 h-2 rounded-full bg-aqua-teal/40 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-60 left-16 w-2.5 h-2.5 rounded-full bg-shakespeare-500/30 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative h-full flex flex-col p-6">
        {/* Logo/Brand */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-shakespeare-500 to-shakespeare-700 flex items-center justify-center shadow-lg shadow-shakespeare-500/30 animate-liquid-morph">
            <Droplets className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-shakespeare-950">AquaSense</h1>
            <p className="text-xs text-shakespeare-700">Admin Panel</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-shakespeare-400 scrollbar-track-shakespeare-200">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <div key={idx}>
                <button
                  onClick={() => router.push(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-2xl
                    font-medium text-sm transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white shadow-lg shadow-shakespeare-500/30' 
                      : 'text-shakespeare-800 hover:bg-shakespeare-200/50 hover:text-shakespeare-950'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
                
                {/* Sub-items */}
                {item.subItems && isActive && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.subItems.map((subItem, subIdx) => {
                      const SubIcon = subItem.icon;
                      return (
                        <button
                          key={subIdx}
                          onClick={() => router.push(subItem.path)}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-shakespeare-700 hover:bg-shakespeare-200/50 hover:text-shakespeare-950 transition-all duration-200"
                        >
                          <SubIcon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-3 px-4 py-3 rounded-2xl
            bg-gradient-to-r from-orange-accent/10 to-orange-accent/20
            text-orange-accent font-medium text-sm
            hover:from-orange-accent hover:to-orange-accent/90 hover:text-white
            transition-all duration-300 border border-orange-accent/30
          "
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
