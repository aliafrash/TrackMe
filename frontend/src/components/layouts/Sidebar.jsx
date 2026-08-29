import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '../../context/UserContext';
import { HomeIcon, TrendingUpIcon, TrendingDownIcon, LogOutIcon } from '../Icons';

const SIDEBAR_LINKS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: HomeIcon,
    path: '/dashboard',
  },
  {
    id: 'income',
    label: 'Income',
    icon: TrendingUpIcon,
    path: '/income',
  },
  {
    id: 'expense',
    label: 'Expense',
    icon: TrendingDownIcon,
    path: '/expense',
  },
];

const Sidebar = ({ activeMenu, openSideMenu, setOpenSideMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearUser } = useUser();

  const handleNavigate = (path) => {
    navigate(path);
    if (setOpenSideMenu) {
      setOpenSideMenu(false);
    }
  };

  const handleLogout = () => {
    clearUser();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {openSideMenu && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setOpenSideMenu(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[61px] left-0 h-screen lg:h-[calc(100vh-61px)] w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out ${
          openSideMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation Items */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </span>

          {SIDEBAR_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-purple-200 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Feature Teaser / Logout */}
        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
          {/* Mini Pro tip card */}
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-900">
            <span className="font-semibold block mb-0.5">💡 Smart Tip</span>
            <p className="text-[11px] text-purple-700 leading-relaxed">
              Track daily expenses regularly to uncover actionable financial insights.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <LogOutIcon className="w-5 h-5 text-slate-400 hover:text-red-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
