import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';

const Select = (props) => {
  const {field, currentValue, currentError, onValueChange} = props;

  const placeholderKey = useRef(Math.random());

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

      <select id={fieldId} name={field.name} className={fieldClasses} onChange={onChange} value={currentValue}>
        {field.placeholder && !currentValue && <option key={placeholderKey} value="">{field.placeholder}</option>}
        {Object.keys(field.options).map((value) => {
          return <option key={value} value={value}>{field.options[value]}</option>;
        })}
      </select>
    </div>
  );
};

Select.propTypes = {
  field: PropTypes.object,
  currentValue: PropTypes.string,
  currentError: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default Select;
