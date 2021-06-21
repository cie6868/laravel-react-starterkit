import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

const Radio = (props) => {
  const {field, currentValue, currentError, onValueChange} = props;

  const fieldId = `jsfr-field-${field.name}`;
  const fieldClasses = `jsfr-field ${field.class} ${currentError ? 'jsfr-field-error' : ''}`;
  const fieldWrapperClasses = `jsfr-field-wrapper ${field.wrapperClass} ${currentError ? 'jsfr-field-wrapper-error' : ''}`;
  const radioWrapperClass = 'jsfr-field-radio';

  const onChange = useCallback((ev) => {
    onValueChange(ev.target.name, ev.target.value);
  }, [onValueChange]);

  return (
    <div className={fieldWrapperClasses}>
      <p>{field.label}</p>

      {Object.keys(field.options).map((value) => {
        const radioId = `${fieldId}-${value}`;
        const isChecked = value === currentValue;

        return (
          <div key={value} className={radioWrapperClass}>
            <input
              id={radioId}
              type="radio"
              name={field.name}
              value={value}
              checked={isChecked}
              className={fieldClasses}
              onChange={onChange}/>

            <label htmlFor={radioId}>
              {field.options[value]}
            </label>
          </div>
        );
      })}
    </div>
  );
};

Radio.propTypes = {
  field: PropTypes.object,
  currentValue: PropTypes.string,
  currentError: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default Radio;
