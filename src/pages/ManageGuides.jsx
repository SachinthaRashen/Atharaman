import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import GuideForm from '../components/forms/GuideForm';
import GuideView from '../components/views/GuideView';

const ManageGuides = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guides, setGuides] = useState([
    {
      id: 1,
      name: 'Ravi Perera',
      description: 'Experienced tour guide specializing in cultural sites',
      nic: '198456789V',
      businessEmail: 'ravi@guides.lk',
      personalNumber: '+94771234567',
      whatsappNumber: '+94771234567',
      languages: ['English', 'Sinhala', 'Tamil'],
      userId: 'user001',
      relatedLocations: ['Sigiriya', 'Kandy'],
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    }
  ]);

  const columns = [
    { key: 'name', label: 'Guide Name', sortable: true },
    { key: 'businessEmail', label: 'Email', sortable: true },
    { key: 'personalNumber', label: 'Phone', sortable: false },
    { key: 'languages', label: 'Languages', sortable: false, render: (value) => value.join(', ') },
  ];

  const handleAdd = () => {
    setModalType('add');
    setSelectedGuide(null);
    setShowModal(true);
  };

  const handleView = (guide) => {
    setModalType('view');
    setSelectedGuide(guide);
    setShowModal(true);
  };

  const handleEdit = (guide) => {
    setModalType('edit');
    setSelectedGuide(guide);
    setShowModal(true);
  };

  const handleDelete = (guide) => {
    if (window.confirm(`Are you sure you want to delete "${guide.name}"?`)) {
      setGuides(guides.filter(g => g.id !== guide.id));
    }
  };

  const handleSave = (guideData) => {
    if (modalType === 'add') {
      const newGuide = {
        ...guideData,
        id: Math.max(...guides.map(g => g.id)) + 1
      };
      setGuides([...guides, newGuide]);
    } else if (modalType === 'edit') {
      setGuides(guides.map(g => 
        g.id === selectedGuide.id ? { ...g, ...guideData } : g
      ));
    }
    setShowModal(false);
  };

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guides List</h1>
          <p className="text-gray-600 mt-1">Manage all tour guides in the system</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Add New
        </button>
      </div>

      <DataTable
        data={guides}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          modalType === 'add' ? 'Add New Guide' :
          modalType === 'edit' ? 'Edit Guide' : 'Guide Details'
        }
        size={modalType === 'view' ? 'large' : 'medium'}
      >
        {modalType === 'view' ? (
          <GuideView guide={selectedGuide} />
        ) : (
          <GuideForm
            guide={selectedGuide}
            onSave={handleSave}
            onCancel={() => setShowModal(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageGuides;