import React from 'react';
import useAuth from '../../Hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
                    {/* Avatar */}
                    <img
                        className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
                        src={user?.photoURL || "/default-avatar.png"}
                        alt="User Avatar"
                    />

                    {/* User Info */}
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-2xl font-bold text-gray-800">{user?.displayName || "No Name"}</h2>
                        <p className="text-gray-600">{user?.email || "No Email Provided"}</p>
                        <p className="text-gray-500">Role: <span className="font-medium text-orange-500">{user?.role || "User"}</span></p>
                        <p className="text-gray-500">Joined: {user?.createdAt || "N/A"}</p>

                        {/* Edit Profile */}
                        <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
