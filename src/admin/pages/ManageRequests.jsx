import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import RequestView from '../components/views/RequestView';

const ManageRequests = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([
    {
      id: 1,
      requestType: 'Guide Registration',
      status: 'Pending',
      username: 'ravi_guide',
      name: 'Ravi Perera',
      description: 'Experienced tour guide with 5 years in the industry',
      nic: '198456789V',
      businessEmail: 'ravi@email.com',
      personalNumber: '+94771234567',
      whatsappNumber: '+94771234567',
      submittedDate: '2024-01-15'
    },
    {
      id: 2,
      requestType: 'Shop Owner Registration',
      status: 'Pending',
      username: 'sunil_shop',
      name: 'Sunil Fernando',
      description: 'Traditional craft shop owner',
      nic: '197234567V',
      businessEmail: 'sunil@crafts.lk',
      personalNumber: '+94712345678',
      whatsappNumber: '+94712345678',
      submittedDate: '2024-01-16'
    }
  ]);

  const columns = [
    { key: 'requestType', label: 'Request Type', sortable: true },
    { key: 'name', label: 'Applicant Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        value === 'Approved' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'submittedDate', label: 'Submitted', sortable: true },
  ];

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleAccept = (request) => {
    if (window.confirm(`Are you sure you want to accept the request from "${request.name}"?`)) {
      setRequests(requests.map(r => 
        r.id === request.id ? { ...r, status: 'Approved' } : r
      ));
    }
  };

  const handleReject = (request) => {
    if (window.confirm(`Are you sure you want to reject the request from "${request.name}"?`)) {
      setRequests(requests.map(r => 
        r.id === request.id ? { ...r, status: 'Rejected' } : r
      ));
    }
  };

  return (
    <div className="mt-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Requests</h1>
        <p className="text-gray-600 mt-1">Review and manage registration requests</p>
      </div>

      <DataTable
        data={requests}
        columns={columns}
        onView={handleView}
        customActions={(request) => (
          <>
            {request.status === 'Pending' && (
              <>
                <button
                  onClick={() => handleAccept(request)}
                  className="text-green-600 hover:text-green-800 mr-2"
                  title="Accept"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request)}
                  className="text-red-600 hover:text-red-800"
                  title="Reject"
                >
                  Reject
                </button>
              </>
            )}
          </>
        )}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Request Details"
        size="medium"
      >
        <RequestView request={selectedRequest} />
      </Modal>
    </div>
  );
};

export default ManageRequests;