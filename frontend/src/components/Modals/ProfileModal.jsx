import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CloseIcon, UserIcon, ShieldCheckIcon } from '../Icons';
import Input from '../Inputs/Input';
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';
import { useUser } from '../../context/UserContext';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'security'

  // General tab state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [generalLoading, setGeneralLoading] = useState(false);

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  // Handle General Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    setGeneralLoading(true);

    try {
      let profileImageUrl = user?.profileImageUrl;

      // If user selected a new file
      if (profilePic instanceof File) {
        const uploadRes = await uploadImage(profilePic);
        profileImageUrl = uploadRes.imageUrl;
      } else if (profilePic === null && user?.profileImageUrl) {
        profileImageUrl = null;
      }

      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        profileImageUrl,
      });

      if (response.data.success) {
        updateUser(response.data.user);
        toast.success('Profile updated successfully! ✨');
        onClose();
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setGeneralLoading(false);
    }
  };

  // Handle Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        toast.success('Password changed successfully! 🔒');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Account Settings</h3>
            <p className="text-xs text-slate-400">Manage your profile and security</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'general'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'security'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Security</span>
          </button>
        </div>

        {/* Tab 1: General Info */}
        {activeTab === 'general' && (
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={generalLoading}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-violet-700 text-white shadow-md shadow-purple-200 transition cursor-pointer disabled:opacity-60"
              >
                {generalLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Security / Password */}
        {activeTab === 'security' && (
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            <Input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              label="Current Password"
              placeholder="Enter current password"
              type="password"
            />

            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              placeholder="Min 6 characters"
              type="password"
            />

            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm New Password"
              placeholder="Re-type new password"
              type="password"
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={passwordLoading}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-violet-700 text-white shadow-md shadow-purple-200 transition cursor-pointer disabled:opacity-60"
              >
                {passwordLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
