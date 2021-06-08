import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import JsonFormValidator from './utilities/JsonFormValidator';

const JsonForm = (props) => {

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const newState = {};
    props.json.fields.forEach((field) => {
      newState[field.name] = field.value ? field.value : '';
    });

    setFormData({
      ...formData,
      ...newState,
    });
  }, [props.json]);

  const formClasses = `jsfr-form ${props.json.fieldClass}`;
  const submitLabel = props.json.submit ? props.json.submit.label : 'Submit';
  const submitClasses = props.json.submit ? props.json.submit.class : '';

  const onChange = useCallback((ev) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
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
    const fieldId = `jsfr-field-${field.name}`;
    const fieldClasses = `jsfr-field ${field.class} ${formErrors[field.name] ? 'jsfr-field-error' : ''}`;
    const fieldWrapperClasses = `jsfr-field-wrapper ${field.wrapperClass} ${formErrors[field.name] ? 'jsfr-field-wrapper-error' : ''}`;
    //check for drop down
    if (field.type === 'select') {
      return (
        <div key={field.name} className={fieldWrapperClasses}>
          <label htmlFor={fieldId}>
            {field.label}
          </label>
          <select id={fieldId} name={field.name} className={fieldClasses} onChange={onChange}>
            {Object.keys(field.options).map((keys) => {
              return <option key={keys} value={field.options[keys]}>{field.options[keys]}</option>;
            })}
          </select>
        </div>
      );
    }
    else
      return (
        <div key={field.name} className={fieldWrapperClasses}>
          <label htmlFor={fieldId}>
            {field.label}
          </label>

          <input
            id={fieldId}
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            placeholder={field.placeholder}
            className={fieldClasses}
            onChange={onChange}
          />
        </div>
      );
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
  onSubmit: PropTypes.func,
};

export default React.memo(JsonForm);
