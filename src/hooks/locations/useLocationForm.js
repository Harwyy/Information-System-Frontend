import { useState, useEffect } from 'react';

export const useLocationForm = (location, onSubmit) => {
  const [formData, setFormData] = useState({
    x: '',
    y: '',
    z: '',
    name: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location) {
      setFormData({
        x: location.x?.toString() || '',
        y: location.y?.toString() || '',
        z: location.z?.toString() || '',
        name: location.name || '',
      });
    } else {
      setFormData({
        x: '',
        y: '',
        z: '',
        name: '',
      });
    }
    setErrors({});
  }, [location]);

  const validateField = (name, value) => {
    if (name === 'z') {
      if (value.trim() === '') return 'Z is required';
      const floatValue = parseFloat(value);
      return isNaN(floatValue) ? 'Z must be a valid float number' : null;
    }
    return null;
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
    const zError = validateField('z', formData.z);
    const nameError = validateField('name', formData.name);

    if (xError) newErrors.x = xError;
    if (yError) newErrors.y = yError;
    if (zError) newErrors.z = zError;
    if (nameError) newErrors.name = nameError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      x: parseFloat(formData.x),
      y: parseFloat(formData.y),
      z: parseFloat(formData.z),
      name: formData.name.trim() || null,
    };

    if (location) {
      onSubmit({ ...submitData, id: location.id });
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
