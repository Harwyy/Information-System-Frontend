import { useState, useEffect } from 'react';

export const useCoordinateForm = (coordinate, onSubmit) => {
  const [formData, setFormData] = useState({
    x: '',
    y: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (coordinate) {
      setFormData({
        x: coordinate.x?.toString() || '',
        y: coordinate.y?.toString() || '',
      });
    } else {
      setFormData({
        x: '',
        y: '',
      });
    }
    setErrors({});
  }, [coordinate]);

  const validateField = (name, value) => {
    if (value.trim() === '') return null;

    if (name === 'x') {
      const intValue = parseInt(value, 10);
      return isNaN(intValue) ? 'X must be a valid integer' : null;
    } else {
      const floatValue = parseFloat(value);
      return isNaN(floatValue) ? 'Y must be a valid number' : null;
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const xError = validateField('x', formData.x);
    const yError = validateField('y', formData.y);

    if (xError) newErrors.x = xError;
    if (yError) newErrors.y = yError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      x: formData.x.trim() ? parseInt(formData.x, 10) : null,
      y: formData.y.trim() ? parseFloat(formData.y) : null,
    };

    if (coordinate) {
      onSubmit({ ...submitData, id: coordinate.id });
    } else {
      onSubmit(submitData);
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};
