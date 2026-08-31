import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '../../context/UserContext';
import { getInitials } from '../../utils/helper';
import { WalletIcon, LogOutIcon, MenuIcon, CloseIcon, UserIcon } from '../Icons';
import ProfileModal from '../Modals/ProfileModal';

const Navbar = ({ activeMenu, openSideMenu, setOpenSideMenu }) => {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleLogout = (e) => {
    e.stopPropagation();
    clearUser();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      <header className="flex items-center justify-between bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-xs">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-100 lg:hidden cursor-pointer transition"
            aria-label="Toggle navigation menu"
          >
            {openSideMenu ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-white shadow-sm shadow-purple-200">
              <WalletIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                Track<span className="text-primary">Me</span>
              </h1>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider hidden sm:inline">
                Finance Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Active Page indicator on larger screens */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Overview & Analytics</span>
        </div>

        {/* Right: User Profile & Logout */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user && (
            <div
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-2.5 sm:gap-3 bg-slate-50 hover:bg-purple-50/60 border border-slate-200/70 hover:border-purple-200 py-1.5 px-2.5 sm:px-3.5 rounded-xl cursor-pointer transition group"
              title="Click to edit account settings"
            >
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full object-cover border border-primary/40 group-hover:border-primary transition"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-100 text-primary font-bold text-xs flex items-center justify-center border border-purple-200 group-hover:bg-primary group-hover:text-white transition">
                  {getInitials(user.fullName || 'User')}
                </div>
              )}

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-tight group-hover:text-primary transition">
                  {user.fullName || 'Member'}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {user.email}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="ml-1 sm:ml-2 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                title="Log Out"
              >
                <LogOutIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Profile Settings Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
