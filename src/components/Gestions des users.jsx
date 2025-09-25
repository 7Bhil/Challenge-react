import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch, FaEdit, FaTrash, FaUserShield, FaUserPlus } from 'react-icons/fa';

const SuperAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    // Données simulées
    const mockUsers = [
      {
        id: 1,
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        role: 'admin',
        joinedAt: '2023-01-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Marie Martin',
        email: 'marie.martin@email.com',
        role: 'jury',
        joinedAt: '2023-02-20',
        status: 'active'
      },
      {
        id: 3,
        name: 'Pierre Lambert',
        email: 'pierre.lambert@email.com',
        role: 'user',
        joinedAt: '2023-03-10',
        status: 'active'
      },
      {
        id: 4,
        name: 'Sophie Moreau',
        email: 'sophie.moreau@email.com',
        role: 'user',
        joinedAt: '2023-04-05',
        status: 'suspended'
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user.role.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, role: newRole }
        : user
    );

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setShowEditModal(false);
    setSelectedUser(null);
    alert('Rôle utilisateur mis à jour avec succès!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  };

  const handleStatusToggle = (id) => {
    const updatedUsers = users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    );

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'superadmin':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Super Admin</span>;
      case 'admin':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Admin</span>;
      case 'jury':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Jury</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Utilisateur</span>;
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Actif</span>
      : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Suspendu</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-red-600 to-orange-700 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center">
              <FaUserShield className="mr-2" /> Gestion des Utilisateurs
            </h1>
            <p className="mt-2">Gérez les rôles et statuts des utilisateurs</p>
          </div>

          {/* Barre de recherche */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Rechercher par nom, email ou rôle..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Liste des utilisateurs */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <FaUser className="text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaEdit className="inline mr-1" /> Modifier
                      </button>
                      <button
                        onClick={() => handleStatusToggle(user.id)}
                        className={user.status === 'active' 
                          ? "text-yellow-600 hover:text-yellow-900" 
                          : "text-green-600 hover:text-green-900"}
                      >
                        {user.status === 'active' ? 'Suspendre' : 'Activer'}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="inline mr-1" /> Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de modification */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Modifier le rôle de {selectedUser.name}
            </h3>
            
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau rôle
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
                <option value="jury">Jury</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                <FaUserPlus className="mr-2" /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminUsers;