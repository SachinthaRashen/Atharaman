import React, { useState, useEffect } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import RequestView from '../components/views/RequestView';
import { getAdminRoleRequests, approveRoleRequest, rejectRoleRequest } from '../../services/api';
import { Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ManageRequests = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth(); // Get user from AuthContext

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getAdminRoleRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Flatten the data for the table to handle nested properties
  const flattenedRequests = requests.map(request => ({
    id: request.id,
    requestType: request.role?.name || 'Unknown',
    applicantName: request.user?.name || 'Unknown',
    status: request.status,
    submittedDate: request.created_at,
    // Include the full request object for actions and modal
    _rawData: request
  }));

  const columns = [
    { key: 'requestType', label: 'Request Type', sortable: true, render: (value) => (
      <span className="capitalize">{value.replace('_', ' ')}</span>
    )},
    { key: 'applicantName', label: 'Applicant Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        value === 'accepted' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'submittedDate', label: 'Submitted', sortable: true, render: (value) => 
      new Date(value).toLocaleDateString()
    },
  ];

  const handleView = (request) => {
    setSelectedRequest(request._rawData);
    setShowModal(true);
  };

  const handleAccept = async (request) => {
    if (window.confirm(`Are you sure you want to accept the request from "${request.applicantName}"?`)) {
      try {
        await approveRoleRequest(request.id);
        fetchRequests(); // Refresh the list
      } catch (error) {
        console.error('Error approving request:', error);
        alert('Error approving request: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleReject = async (request) => {
    if (window.confirm(`Are you sure you want to reject the request from "${request.applicantName}"?`)) {
      try {
        await rejectRoleRequest(request.id);
        fetchRequests(); // Refresh the list
      } catch (error) {
        console.error('Error rejecting request:', error);
        alert('Error rejecting request: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading requests...</div>;
  }

  return (
    <div className="mt-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Requests</h1>
        <p className="text-gray-600 mt-1">Review and manage registration requests</p>
        <p className="text-sm text-gray-500 mt-1">Total requests: {requests.length}</p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No pending requests found.</p>
        </div>
      ) : (
        <>
          <DataTable
            data={flattenedRequests}
            columns={columns}
            onView={handleView}
            customActions={(request) => (
              <div className="flex items-center space-x-2">
                {/* View Button */}
                <button
                  onClick={() => handleView(request)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                  title="View Request"
                >
                  <Eye size={16} />
                </button>

                {/* Accept/Reject Buttons (only for pending requests) */}
                {request.status === 'pending' && user?.role === 'Admin' && (
                  <>
                    <button
                      onClick={() => handleAccept(request)}
                      className="text-green-600 hover:text-green-800 px-2 py-1 rounded hover:bg-green-50"
                      title="Accept"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                      title="Reject"
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {/* Status indicator for non-pending requests */}
                {request.status !== 'pending' && (
                  <span className="text-gray-400 text-sm">
                    {request.status === 'accepted' ? 'Accepted' : 'Rejected'}
                  </span>
                )}
              </div>
            )}
          />

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Request Details"
            size="large"
          >
            {selectedRequest && (
              <RequestView request={selectedRequest} />
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ManageRequests;