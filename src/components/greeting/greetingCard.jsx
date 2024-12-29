import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { logoutUser } from '@/features/user/userSlice';
const GreetingCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Get greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  // Format current date
  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Use default values if user data is not available
  const userName = user?.name || user?.username || "User";
  const avatarUrl = user?.avatar || "/images/avatar.jpg";

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md">
            <img
              src={avatarUrl}
              alt={`${userName}'s avatar`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/images/avatar.jpg"; // Fallback image
              }}
            />
          </div>

          {/* Message Content */}
          <div className="flex flex-col gap-2">
            <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
              <p className="text-black text-2xl font-medium">
                {greeting}, {userName}! 🙌
              </p>
            </div>
            <span className="text-gray-600 text-sm ml-4">{formattedDate}</span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default GreetingCard;