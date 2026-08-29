import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [openSideMenu, setOpenSideMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !loading) {
      navigate('/login');
    }
  }, [loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeMenu={activeMenu}
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />

      {/* Main Body: Sidebar + Dynamic Content */}
      <div className="flex flex-1 relative">
        <Sidebar
          activeMenu={activeMenu}
          openSideMenu={openSideMenu}
          setOpenSideMenu={setOpenSideMenu}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-61px)] overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
