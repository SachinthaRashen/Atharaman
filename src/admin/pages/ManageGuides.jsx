import React, { useState, useEffect } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import GuideForm from '../components/forms/GuideForm';
import GuideView from '../components/views/GuideView';
import { 
  getGuides, 
  getGuideById, 
  createGuide, 
  updateGuide, 
  deleteGuide 
} from '../../services/api';

const ManageGuides = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch guides on component mount
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await getGuides();
        setGuides(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching guides:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGuides();
  }, []);

  const columns = [
    { key: 'guideName', label: 'Guide Name', sortable: true },
    { key: 'guideNic', label: 'NIC', sortable: true },
    { key: 'businessMail', label: 'Email', sortable: true },
    { key: 'personalNumber', label: 'Phone', sortable: true },
  ];

  const handleAdd = () => {
    setModalType('add');
    setSelectedGuide(null);
    setShowModal(true);
  };

  const handleView = async (guide) => {
    try {
      // Fetch full guide details if needed
      const response = await getGuideById(guide.id);
      setModalType('view');
      setSelectedGuide(response.data);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching guide details:', err);
    }
  };

  const handleEdit = (guide) => {
    setModalType('edit');
    setSelectedGuide(guide);
    setShowModal(true);
  };

  const handleDelete = async (guide) => {
    if (window.confirm(`Are you sure you want to delete "${guide.guideName}"?`)) {
      try {
        await deleteGuide(guide.id);
        setGuides(guides.filter(g => g.id !== guide.id));
      } catch (err) {
        console.error('Error deleting guide:', err);
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      const response = modalType === 'add'
        ? await createGuide(formData)
        : await updateGuide(selectedGuide.id, formData);

      setGuides(prev => modalType === 'add'
        ? [...prev, response.data.guide]
        : prev.map(g => g.id === response.data.guide.id ? {
            ...response.data.guide,
            languages: Array.isArray(response.data.guide.languages) 
              ? response.data.guide.languages 
              : [],
            locations: Array.isArray(response.data.guide.locations)
              ? response.data.guide.locations
              : []
          } : g)
      );
      setShowModal(false);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  if (isLoading) return <div>Loading guides...</div>;
  if (error) return <div>Error: {error}</div>;

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