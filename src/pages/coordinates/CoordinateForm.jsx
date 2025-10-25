import FormActions from '../../components/FormActions';
import FormInput from '../../components/FormInput';
import { useCoordinateForm } from '../../hooks/coordintes/useCoordinateForm';

const CoordinateForm = ({ coordinate, onSubmit, onCancel }) => {
  const { formData, errors, handleInputChange, handleSubmit } =
    useCoordinateForm(coordinate, onSubmit);

  const isEdit = coordinate;
  const formTitle = isEdit ? 'Update coordinate' : 'Create new coordinate';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{formTitle}</h2>

        {errors.form && <div className="form-error">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="coordinate-form">
          <FormInput
            label="Coordinate X (Long)"
            name="x"
            value={formData.x}
            onChange={handleInputChange}
            error={errors.x}
            step="1"
            placeholder="Enter integer value (e.g., 123)"
          />

          <FormInput
            label="Coordinate Y (Float)"
            name="y"
            value={formData.y}
            onChange={handleInputChange}
            error={errors.y}
            step="any"
            placeholder="Enter decimal value (e.g., 45.67)"
          />

          <FormActions isEdit={isEdit} onCancel={onCancel} />
        </form>
      </div>
    </div>
  );
};

export default CoordinateForm;
