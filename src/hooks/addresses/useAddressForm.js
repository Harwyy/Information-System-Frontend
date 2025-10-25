import { useState, useEffect } from 'react';

export const useAddressForm = (address, onSubmit) => {
  const [formData, setFormData] = useState({
    zipCode: '',
    locationId: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData({
        zipCode: address.zipCode || '',
        locationId: address.locationDTO?.id?.toString() || '',
      });
    } else {
      setFormData({
        zipCode: '',
        locationId: '',
      });
    }
    setErrors({});
  }, [address]);

  const validateField = () => {
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

    const zipCodeError = validateField('zipCode', formData.zipCode);
    const locationIdError = validateField('locationId', formData.locationId);

    if (zipCodeError) newErrors.zipCode = zipCodeError;
    if (locationIdError) newErrors.locationId = locationIdError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      zipCode: formData.zipCode.trim(),
      locationId: formData.locationId
        ? parseInt(formData.locationId, 10)
        : null,
    };

    if (address) {
      onSubmit({ ...submitData, id: address.id });
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
