import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingIndicator from '../components/LoadingIndicator';
import NotificationsContainer from '../components/NotificationsContainer';
import { useNotifications } from '../hooks/useNotifications';
import SpecialOperationAPI from '../services/specialOperationAPI';

import '../styles/components/specialOperation.css';

const SpecialOperation = () => {
  const navigate = useNavigate();
  const { notifications, addNotification, removeNotification } =
    useNotifications();

  const [loading, setLoading] = useState({
    updateCount: false,
    maxOfficial: false,
    groupFullname: false,
    joinOrganizations: false,
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    data: null,
    title: '',
  });

  const [organizations, setOrganizations] = useState([]);
  const [selectedFirstOrg, setSelectedFirstOrg] = useState('');
  const [selectedSecondOrg, setSelectedSecondOrg] = useState('');

  const openModal = (type, data, title) => {
    setModal({
      isOpen: true,
      type,
      data,
      title,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      data: null,
      title: '',
    });
  };

  const handleUpdateEmployeeCount = async id => {
    setLoading(prev => ({ ...prev, updateCount: true }));

    try {
      await SpecialOperationAPI.updateEmployeeCount(id);
      openModal('success', null, 'Operation Successful');
      addNotification('Employee count updated successfully', 'success');
    } catch (error) {
      addNotification(error.message, 'error');
    } finally {
      setLoading(prev => ({ ...prev, updateCount: false }));
    }
  };

  const handleGetMaxOfficialAddress = async () => {
    setLoading(prev => ({ ...prev, maxOfficial: true }));

    try {
      const organization = await SpecialOperationAPI.getMaxOfficialAddress();
      openModal(
        'maxOfficial',
        organization,
        'Organization with Max Official Address'
      );
      addNotification('Organization retrieved successfully', 'success');
    } catch (error) {
      addNotification(error.message, 'error');
    } finally {
      setLoading(prev => ({ ...prev, maxOfficial: false }));
    }
  };

  const handleGroupByFullName = async () => {
    setLoading(prev => ({ ...prev, groupFullname: true }));

    try {
      const data = await SpecialOperationAPI.getGroupedFullName();
      openModal('groupFullname', data, 'Organizations Grouped by Full Name');
      addNotification('Grouped data retrieved successfully', 'success');
    } catch (error) {
      addNotification(error.message, 'error');
    } finally {
      setLoading(prev => ({ ...prev, groupFullname: false }));
    }
  };

  const handleJoinOrganizations = async () => {
    if (!selectedFirstOrg || !selectedSecondOrg) {
      addNotification('Please select both organizations', 'error');
      return;
    }

    if (selectedFirstOrg === selectedSecondOrg) {
      addNotification('Please select two different organizations', 'error');
      return;
    }

    setLoading(prev => ({ ...prev, joinOrganizations: true }));

    try {
      const requestData = {
        firstOrganizationId: parseInt(selectedFirstOrg),
        secondOrganizationId: parseInt(selectedSecondOrg),
        organization: {},
      };

      const result = await SpecialOperationAPI.joinOrganizations(requestData);
      openModal(
        'joinOrganizations',
        result,
        'Organizations Joined Successfully'
      );
      addNotification('Organizations joined successfully', 'success');

      setSelectedFirstOrg('');
      setSelectedSecondOrg('');
    } catch (error) {
      addNotification(error.message, 'error');
    } finally {
      setLoading(prev => ({ ...prev, joinOrganizations: false }));
    }
  };

  const loadOrganizations = async () => {
    try {
      const orgs = await SpecialOperationAPI.getAllOrganizations();
      setOrganizations(orgs.content || []);
    } catch (error) {
      addNotification('Failed to load organizations', 'error');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderModalContent = () => {
    switch (modal.type) {
      case 'success':
        return (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Operation Completed Successfully</h3>
            <p>The requested operation has been completed successfully.</p>
          </div>
        );
      case 'maxOfficial':
        return (
          <div className="modal-content-v2">
            <h4>Organization Details:</h4>
            <pre className="result-pre">
              {JSON.stringify(modal.data, null, 2)}
            </pre>
          </div>
        );
      case 'groupFullname':
        return (
          <div className="modal-content-v2">
            <h4>Grouped Results:</h4>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {modal.data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.fullName}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'joinOrganizations':
        return (
          <div className="modal-content-v2">
            <h4>Join Operation Result:</h4>
            <pre className="result-pre">
              {JSON.stringify(modal.data, null, 2)}
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="special-operation-page">
      <LoadingIndicator
        loading={
          loading.updateCount ||
          loading.maxOfficial ||
          loading.groupFullname ||
          loading.joinOrganizations
        }
        loadingText="Processing operation..."
      />

      <NotificationsContainer
        notifications={notifications}
        onRemoveNotification={removeNotification}
        position="top-right"
        autoClose={true}
        autoCloseDelay={5000}
        maxNotifications={3}
      />

      <div className="special-operations-grid">
        <div className="operation-card">
          <div className="operation-icon">👥</div>
          <h2>Update Employee Count</h2>
          <p>Update the employee count for a specific organization by ID</p>

          <div className="operation-controls">
            <input
              type="number"
              id="organizationId"
              placeholder="Enter organization ID"
              className="operation-input"
            />
            <button
              onClick={() => {
                const id = document.getElementById('organizationId').value;
                if (id) {
                  handleUpdateEmployeeCount(id);
                } else {
                  addNotification('Please enter an organization ID', 'error');
                }
              }}
              disabled={loading.updateCount}
              className="operation-btn operation-btn-primary"
            >
              {loading.updateCount ? 'Updating...' : 'Update Count'}
            </button>
          </div>
        </div>

        <div className="operation-card">
          <div className="operation-icon">🏢</div>
          <h2>Max Official Address</h2>
          <p>
            Retrieve the organization with the maximum official address value
          </p>

          <div className="operation-controls">
            <button
              onClick={handleGetMaxOfficialAddress}
              disabled={loading.maxOfficial}
              className="operation-btn operation-btn-accent"
            >
              {loading.maxOfficial ? 'Loading...' : 'Get Organization'}
            </button>
          </div>
        </div>

        <div className="operation-card">
          <div className="operation-icon">📊</div>
          <h2>Group by Full Name</h2>
          <p>Get count of organizations grouped by full name</p>

          <div className="operation-controls">
            <button
              onClick={handleGroupByFullName}
              disabled={loading.groupFullname}
              className="operation-btn operation-btn-warning"
            >
              {loading.groupFullname ? 'Loading...' : 'Get Grouped Data'}
            </button>
          </div>
        </div>

        <div className="operation-card">
          <div className="operation-icon">🔗</div>
          <h2>Join Organizations</h2>
          <p>Join two organizations together</p>

          <div className="operation-controls">
            <div className="select-group">
              <div className="select-wrapper">
                <select
                  value={selectedFirstOrg}
                  onChange={e => setSelectedFirstOrg(e.target.value)}
                  className="operation-select"
                  onFocus={loadOrganizations}
                >
                  <option value="">Select first organization</option>
                  {organizations.map(org => (
                    <option key={org.id} value={org.id}>
                      {org.name} (ID: {org.id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-wrapper">
                <select
                  value={selectedSecondOrg}
                  onChange={e => setSelectedSecondOrg(e.target.value)}
                  className="operation-select"
                  onFocus={loadOrganizations}
                >
                  <option value="">Select second organization</option>
                  {organizations.map(org => (
                    <option
                      key={org.id}
                      value={org.id}
                      disabled={org.id.toString() === selectedFirstOrg}
                    >
                      {org.name} (ID: {org.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleJoinOrganizations}
              disabled={
                loading.joinOrganizations ||
                !selectedFirstOrg ||
                !selectedSecondOrg
              }
              className="operation-btn operation-btn-success"
            >
              {loading.joinOrganizations ? 'Joining...' : 'Join Organizations'}
            </button>
          </div>
        </div>
      </div>

      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          <span className="back-arrow">←</span>
          Back
        </button>
      </div>

      {modal.isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content-wrapper"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>{modal.title}</h3>
              <button className="modal-close-btn" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">{renderModalContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialOperation;
