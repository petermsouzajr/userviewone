'use client';

import { useUserContext, userActions } from '../context/UserContext';
import { Button, Modal } from './ui';

export default function UserModal() {
  const { state, dispatch } = useUserContext();
  const { selectedUser } = state;

  const handleClose = () => {
    dispatch(userActions.selectUser(null));
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <Modal
      isOpen={!!selectedUser}
      onClose={handleClose}
      title="User Details"
      size="xl"
      closeOnBackdrop={true}
      closeOnEscape={true}
    >
      <div className="space-y-6">
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
              <label className="text-md font-bold text-gray-500">Website</label>
              <p className="text-gray-900">{selectedUser.website}</p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-md font-bold text-gray-500">Street</label>
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
              <label className="text-md font-bold text-gray-500">Zipcode</label>
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
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
