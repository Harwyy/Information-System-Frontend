import { useState, useEffect } from 'react';

export const useOrganizationForm = (organization, onSubmit) => {
  const [formData, setFormData] = useState({
    name: '',
    coordinatesId: '',
    officialAddressId: '',
    annualTurnover: '',
    employeesCount: '',
    fullName: '',
    type: '',
    rating: '',
    postalAddressId: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name || '',
        coordinatesId: organization.coordinatesResponse?.id || '',
        officialAddressId: organization.officialAddressResponse?.id || '',
        annualTurnover: organization.annualTurnover || '',
        employeesCount: organization.employeesCount || '',
        fullName: organization.fullName || '',
        type: organization.type || '',
        rating: organization.rating || '',
        postalAddressId: organization.postalAddressResponse?.id || '',
      });
    } else {
      setFormData({
        name: '',
        coordinatesId: '',
        officialAddressId: '',
        annualTurnover: '',
        employeesCount: '',
        fullName: '',
        type: '',
        rating: '',
        postalAddressId: '',
      });
    }
    setErrors({});
  }, [organization]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value?.trim()) return 'Name is required';
        return null;
      case 'fullName':
        if (!value?.trim()) return 'Full Name is required';
        return null;
      case 'coordinatesId':
        if (!value) return 'Coordinates are required';
        return null;
      case 'officialAddressId':
        if (!value) return 'Official Address is required';
        return null;
      case 'postalAddressId':
        if (!value) return 'Postal Address is required';
        return null;
      case 'type':
        if (!value) return 'Type is required';
        return null;
      case 'annualTurnover':
        if (!value || parseFloat(value) <= 0)
          return 'Annual Turnover must be greater than 0';
        return null;
      case 'employeesCount':
        if (value && parseInt(value) <= 0)
          return 'Employees Count must be greater than 0';
        return null;
      case 'rating':
        if (value && parseFloat(value) <= 0)
          return 'Rating must be greater than 0';
        return null;
      default:
        return null;
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

    Object.keys(formData).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      coordinatesId: parseInt(formData.coordinatesId),
      officialAddressId: parseInt(formData.officialAddressId),
      annualTurnover: parseFloat(formData.annualTurnover),
      employeesCount: formData.employeesCount
        ? parseInt(formData.employeesCount)
        : null,
      fullName: formData.fullName.trim(),
      type: formData.type,
      rating: formData.rating ? parseFloat(formData.rating) : null,
      postalAddressId: parseInt(formData.postalAddressId),
    };

    if (organization) {
      onSubmit({ ...submitData, id: organization.id });
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
