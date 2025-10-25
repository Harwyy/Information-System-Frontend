import FormActions from '../../components/FormActions';
import FormInput from '../../components/FormInput';
import { useLocationForm } from '../../hooks/locations/useLocationForm';

const LocationForm = ({ location, onSubmit, onCancel }) => {
  const { formData, errors, handleInputChange, handleSubmit } = useLocationForm(
    location,
    onSubmit
  );

  const isEdit = location;
  const formTitle = isEdit ? 'Update location' : 'Create new location';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{formTitle}</h2>

        {errors.form && <div className="form-error">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="coordinate-form">
          <FormInput
            label="Location X (Float)"
            name="x"
            value={formData.x}
            onChange={handleInputChange}
            error={errors.x}
            step="any"
            placeholder="Enter decimal value (e.g., 45.67)"
          />

          <FormInput
            label="Location Y (Double)"
            name="y"
            value={formData.y}
            onChange={handleInputChange}
            error={errors.y}
            step="any"
            placeholder="Enter decimal value (e.g., 45.67)"
          />

          <FormInput
            label="Location Z (Float)"
            name="z"
            value={formData.z}
            onChange={handleInputChange}
            error={errors.z}
            step="any"
            placeholder="Enter decimal value (e.g., 45.67)"
          />

          <FormInput
            label="Location Name (String)"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            placeholder="Moscow"
          />

          <FormActions isEdit={isEdit} onCancel={onCancel} />
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
