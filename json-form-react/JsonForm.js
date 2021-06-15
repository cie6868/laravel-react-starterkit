import Checkbox from './fields/Checkbox';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import Input from './fields/Input';
import JsonFormValidator from './utilities/JsonFormValidator';
import Radio from './fields/Radio';
import Select from './fields/Select';

const JsonForm = (props) => {

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // populate fields initially
  useEffect(() => {
    const newState = {};

    // populate with current values
    props.values && Object.entries(props.values).map(([fieldName, fieldValue]) => {
      newState[fieldName] = fieldValue ? fieldValue.toString() : '';
    });

    // populate with default values if empty
    props.json.fields.forEach((field) => {
      if (typeof newState[field.name] === 'undefined') {
        newState[field.name] = field.defaultValue ? field.defaultValue.toString() : '';
      }
    });

    setFormData({
      ...formData,
      ...newState,
    });
  }, [props.json, props.values]);

  const formClasses = `jsfr-form ${props.json.fieldClass}`;
  const submitLabel = props.json.submit ? props.json.submit.label : 'Submit';
  const submitClasses = props.json.submit ? props.json.submit.class : '';

  const onValueChange = useCallback((fieldName, newValue) => {
    setFormData({
      ...formData,
      [fieldName]: newValue,
    });
  }, [formData]);

  const onSubmitClick = useCallback((ev) => {
    ev.preventDefault();

    const validator = new JsonFormValidator(props.json);
    const errorList = validator.validateForm(formData);
    setFormErrors(errorList);

    if (errorList._count === 0) {
      props.onSubmit(formData);
    }
  }, [props.json, formData]);

  const errors = formErrors && formErrors._count > 0 && Object.entries(formErrors).map(([fieldName, errorText]) => {
    return !fieldName.startsWith('_') && (
      <li key={fieldName}>{errorText}</li>
    );
  });

  const fields = props.json.fields && props.json.fields.map((field) => {
    if (field.type === 'select') {
      return (
        <Select
          key={field.name}
          field={field}
          currentValue={formData[field.name]}
          hasError={formErrors[field.name]}
          onValueChange={onValueChange}/>
      );
    } else if (field.type === 'radio') {
      return (
        <Radio
          key={field.name}
          field={field}
          currentValue={formData[field.name]}
          hasError={formErrors[field.name]}
          onValueChange={onValueChange}/>
      );
    } else if (field.type === 'checkbox') {
      return (
        <Checkbox
          key={field.name}
          field={field}
          currentValue={formData[field.name]}
          hasError={formErrors[field.name]}
          onValueChange={onValueChange}/>
      );
    } else {
      return (
        <Input
          key={field.name}
          field={field}
          currentValue={formData[field.name]}
          hasError={formErrors[field.name]}
          onValueChange={onValueChange}/>
      );
    }
  });

  return (
    <form className={formClasses}>
      {errors && <ul className="jsfr-errors">{errors}</ul>}

      {fields}

      <button
        type="submit"
        className={submitClasses}
        onClick={onSubmitClick}>
        {submitLabel}
      </button>
    </form>
  );

};

JsonForm.propTypes = {
  json: PropTypes.object,
  values: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default React.memo(JsonForm);
