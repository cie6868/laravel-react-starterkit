import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

const Checkbox = (props) => {
  const {field, currentValue, currentError, onValueChange} = props;

  const isChecked = field.value === currentValue;

  const fieldId = `jsfr-field-${field.name}`;
  const fieldClasses = `jsfr-field ${field.class} ${currentError ? 'jsfr-field-error' : ''}`;
  const fieldWrapperClasses = `jsfr-field-wrapper ${field.wrapperClass} ${currentError ? 'jsfr-field-wrapper-error' : ''}`;

  const onChange = useCallback((ev) => {
    onValueChange(ev.target.name, ev.target.checked ? ev.target.value : '');
  }, [onValueChange]);

  return (
    <div className={fieldWrapperClasses}>
      <input
        id={fieldId}
        type="checkbox"
        name={field.name}
        value={field.value}
        checked={isChecked}
        className={fieldClasses}
        onChange={onChange}/>

      <label htmlFor={fieldId}>
        {field.label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  field: PropTypes.object,
  currentValue: PropTypes.string,
  currentError: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default Checkbox;
