import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import UserForm from '../components/forms/UserForm';
import UserView from '../components/views/UserView';

const ManageUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    {
      userId: 1,
      username: 'Ravi Perera',
      email: 'ravi@admin.lk',
      password: '1234',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'
    },
    {
      userId: 2,
      username: 'Ravi Perera',
      email: 'ravi@admin2.lk',
      password: '1234',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'
    },
    {
      userId: 3,
      username: 'Ravi Perera',
      email: 'ravi@admin3.lk',
      password: '1234',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'
    }
  ]);

  const columns = [
    { key: 'userId', label: 'User ID', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
  ];

  const handleAdd = () => {
    setModalType('add');
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleView = (user) => {
    setModalType('view');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalType('edit');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete "${user.username}"?`)) {
      setUsers(users.filter(u => u.id !== user.userId));
    }
  };

  const handleSave = (userData) => {
    if (modalType === 'add') {
      const newUser = {
        ...userData,
        userId: Math.max(...guides.map(u => u.userId)) + 1
      };
      setUsers([...users, newUser]);
    } else if (modalType === 'edit') {
      setUsers(users.map(u => 
        u.userId === selectedUser.userId ? { ...u, ...userData } : u
      ));
    }
    setShowModal(false);
  };

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administrators</h1>
          <p className="text-gray-600 mt-1">Manage all Admins of the system</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Add New
        </button>
      </div>

      <DataTable
        data={users}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          modalType === 'add' ? 'Add New User' :
          modalType === 'edit' ? 'Edit User' : 'User Details'
        }
        size={modalType === 'view' ? 'large' : 'medium'}
      >
        {modalType === 'view' ? (
          <UserView user={selectedUser} />
        ) : (
          <UserForm
            user={selectedUser}
            onSave={handleSave}
            onCancel={() => setShowModal(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageUsers;