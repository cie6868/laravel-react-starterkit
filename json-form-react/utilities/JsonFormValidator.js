export default class JsonFormValidator {

  constructor(json) {
    this.json = json;
  }

  validateForm(values) {
    const errorList = {};
    let errorCount = 0;

    for (const [fieldName, fieldValue] of Object.entries(values)) {
      const errorText = this._validateField(fieldName, fieldValue);
      if (errorText) {
        errorList[fieldName] = errorText;
        errorCount += 1;
      }
    }

    errorList['_count'] = errorCount;

    return errorList;
  }

  _validateField(fieldName, fieldValue) {
    let returnErrorText = null;

    const fieldDef = this.json.fields.find((f) => f.name === fieldName);
    for (const rule of fieldDef.validation.split('|')) {
      const errorText = this._decipherAndValidate(rule, fieldValue);
      if (errorText) {
        returnErrorText = errorText.replace('__FIELD_NAME__', this._formatFieldName(fieldName));

        // halt at the first validation error for this field
        break;
      }
    }

    return returnErrorText;
  }

  /**
   * Deciphers the validation rule and applies the appropriate validation to return an error text if the value invalid.
   * @param {String} rule Validation rule with conditions
   * @param {String} value Field value to be validated
   * @returns {String|Null} Validation error text for this field, or null
   */
  _decipherAndValidate(rule, value) {
    const ruleTitle = rule.split(':')[0];
    const ruleConditions = rule.split(':')[1];

    switch (ruleTitle) {
    case 'required':
      return this._required(value);
    case 'min':
      return this._min(ruleConditions, value);
    case 'max':
      return this._max(ruleConditions, value);
    case 'regex':
      return this._regex(ruleConditions, value);
    case 'accepted':
      return this._accepted(value);

    default:
      // ignore unknown rules
      return null;
    }
  }

  /**
   * Make the field name human-readable.
   * @param {String} fieldName Machine name for the field
   * @returns {String} Human-readable name for the field
   */
  _formatFieldName(fieldName) {
    return fieldName.toLowerCase().split(/_/g).map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
  }

  _required(value) {
    if (!value) {
      return 'The value for __FIELD_NAME__ cannot be empty.';
    }

    return null;
  }

  _min(condition, value) {
    const limit = parseInt(condition);

    if (isNaN(value)) {
      if (value.length < limit) {
        return `The value for __FIELD_NAME__ should be at least ${limit} characters.`;
      }
    } else {
      if (value < limit) {
        return `The value for __FIELD_NAME__ should be more than or equal to ${limit}.`;
      }
    }

    return null;
  }

  _max(condition, value) {
    const limit = parseInt(condition);

    if (isNaN(value)) {
      if (value.length < limit) {
        return `The value for __FIELD_NAME__ should be at most ${limit} characters.`;
      }
    } else {
      if (value < limit) {
        return `The value for __FIELD_NAME__ should be less than or equal to ${limit}.`;
      }
    }

    return null;
  }

  _regex(condition, value) {
    const regexCondition = new RegExp(condition.replaceAll('/', ''));
    if (regexCondition.test(value)) {
      return null;
    } else {
      return 'The value for __FIELD_NAME__ should contain only letters and spaces';
    }
  }

  _accepted(value) {
    console.log(value);
    if (value == 1 || value == true || value == 'on' || value == 'yes') {
      return null;
    } else
      return '__FIELD_NAME__ has to be accepted';
  }
}
