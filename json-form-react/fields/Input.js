import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

const Input = (props) => {
  const {field, currentValue, currentError, onValueChange} = props;

  const fieldId = `jsfr-field-${field.name}`;
  const fieldClasses = `jsfr-field ${field.class} ${currentError ? 'jsfr-field-error' : ''}`;
  const fieldWrapperClasses = `jsfr-field-wrapper ${field.wrapperClass} ${currentError ? 'jsfr-field-wrapper-error' : ''}`;

  const onChange = useCallback((ev) => {
    onValueChange(ev.target.name, ev.target.value);
  }, [onValueChange]);

  return (
    <div className={fieldWrapperClasses}>
      <label htmlFor={fieldId}>
        {field.label}
      </label>

      <input
        id={fieldId}
        type={field.type}
        name={field.name}
        value={currentValue || ''}
        placeholder={field.placeholder}
        className={fieldClasses}
        onChange={onChange}/>
    </div>
  );
};

Input.propTypes = {
  field: PropTypes.object,
  currentValue: PropTypes.string,
  currentError: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default Input;
