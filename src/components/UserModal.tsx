'use client';

import { useUserContext, userActions } from '../context/UserContext';

export default function UserModal() {
  const { state, dispatch } = useUserContext();
  const { selectedUser } = state;

  if (!selectedUser) {
    return null;
  }

  const handleClose = () => {
    dispatch(userActions.selectUser(null));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-md font-bold text-gray-500">Name</label>
                <p className="text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">
                  Username
                </label>
                <p className="text-gray-900">{selectedUser.username}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">Email</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">Phone</label>
                <p className="text-gray-900">{selectedUser.phone}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">
                  Website
                </label>
                <p className="text-gray-900">{selectedUser.website}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-md font-bold text-gray-500">
                  Street
                </label>
                <p className="text-gray-900">{selectedUser.address.street}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">Suite</label>
                <p className="text-gray-900">{selectedUser.address.suite}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">City</label>
                <p className="text-gray-900">{selectedUser.address.city}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">
                  Zipcode
                </label>
                <p className="text-gray-900">{selectedUser.address.zipcode}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">
                  Coordinates
                </label>
                <p className="text-gray-900">
                  {selectedUser.address.geo.lat}, {selectedUser.address.geo.lng}
                </p>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Company</h3>
            <div className="space-y-3">
              <div>
                <label className="text-md font-bold text-gray-500">
                  Company Name
                </label>
                <p className="text-gray-900">{selectedUser.company.name}</p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">
                  Catch Phrase
                </label>
                <p className="text-gray-900">
                  {selectedUser.company.catchPhrase}
                </p>
              </div>
              <div>
                <label className="text-md font-bold text-gray-500">
                  Business Strategy
                </label>
                <p className="text-gray-900">{selectedUser.company.bs}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
