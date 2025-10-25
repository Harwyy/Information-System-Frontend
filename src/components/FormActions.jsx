const FormActions = ({ isEdit = true, onCancel }) => {
  return (
    <div className="form-actions">
      <button type="submit" className="submit-btn">
        {isEdit ? 'Update' : 'Create'}
      </button>
      <button type="button" onClick={onCancel} className="cancel-btn">
        Back
      </button>
    </div>
  );
};

export default FormActions;
