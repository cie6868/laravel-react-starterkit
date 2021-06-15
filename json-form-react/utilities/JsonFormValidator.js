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
    const valueTrimmed = fieldValue.toString().trim();
    const fieldDef = this.json.fields.find((f) => f.name === fieldName);
    let rules = fieldDef.validation;

    // automatically do validation against options, if available
    if (fieldDef.options != undefined) {
      const optionsStr = Object.keys(fieldDef.options).join(',');
      rules = rules + '|in:' + optionsStr;
    }

    // validate against each rule
    const isRequired = rules.split('|').includes('required');
    let returnErrorText = null;
    let errorText = null;
    for (const rule of rules.split('|')) {
      // avoid unnecessary validations if optional and empty
      if (!isRequired && !valueTrimmed) {
        continue;
      }

      errorText = this._decipherAndValidate(rule, valueTrimmed);
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
    case 'gt':
      return this._gt(ruleConditions, value);
    case 'lt':
      return this._lt(ruleConditions, value);
    case 'regex':
      return this._regex(ruleConditions, value);
    case 'alpha':
      return this._alpha(value);
    case 'alpha_dash':
      return this._alphaDash(value);
    case 'numeric':
      return this._numeric(value);
    case 'email':
      return this._email(value);
    case 'date':
      return this._date(value);
    case 'nic_lk':
      return this._nicLk(value);
    case 'phone_lk':
      return this._phoneLk(value);
    case 'in':
      return this._in(ruleConditions, value);
    default:
      console.log('Unknown validation:', ruleTitle);

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

  _gt(condition, value) {
    const limit = parseInt(condition);

    if (!isNaN(value)) {
      if (value <= limit) {
        return `The value for __FIELD_NAME__ should be greater than ${limit}.`;
      }
    }

    return null;
  }

  _lt(condition, value) {
    const limit = parseInt(condition);

    if (!isNaN(value)) {
      if (value >= limit) {
        return `The value for __FIELD_NAME__ should be less than ${limit}.`;
      }
    }

    return null;
  }

  _regex(condition, value) {
    const regexCondition = new RegExp(condition.replaceAll('/', ''));
    if (regexCondition.test(value)) {
      return null;
    } else {
      return 'The value for __FIELD_NAME__ is invalid.';
    }
  }

  _alpha(value) {
    if (!value.match(/^[A-Za-z]+$/)) {
      return '__FIELD_NAME__ has non-alphabetical characters.';
    }

    return null;
  }

  _alphaDash(value) {
    if (!value.match(/^[A-Za-z-]+$/)) {
      return '__FIELD_NAME__ has non-alphabetical characters.';
    }

    return null;
  }

  _numeric(value) {
    if (!value.match(/^[0-9]+$/)) {
      return '__FIELD_NAME__ is not a number.';
    }

    return null;
  }

  _email(value) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value.match(emailRegex)) {
      return '__FIELD_NAME__ does not have a valid email address.';
    }

    return null;
  }

  _date(value) {
    const timestamp = Date.parse(value);

    if (isNaN(timestamp)) {
      return '__FIELD_NAME__ does not have a valid date.';
    }

    return null;
  }

  _nicLk(value) {
    if (!value.match(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)) {
      return '__FIELD_NAME__ is not a valid NIC number.';
    }

    return null;
  }

  _phoneLk(value) {
    // filter out leading zeroes and other characters, then validate
    if (!value.replace(/0|\D/g,'').match(/^[0-9]{9}$/)) {
      return '__FIELD_NAME__ is not a valid phone number.';
    }

    return null;
  }

  _in(options, value) {
    if (!options.split(',').includes(value)) {
      return '__FIELD_NAME__ is not valid.';
    }

    return null;
  }
}
