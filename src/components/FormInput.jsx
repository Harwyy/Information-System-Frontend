const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  step,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        placeholder={placeholder}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput;
