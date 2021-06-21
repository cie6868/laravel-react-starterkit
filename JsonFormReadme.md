# JSON Form Builder

Describe your form in JSON just once, and
1) display it on your frontend.
2) validate it on your frontend.
3) validate it on your backend.

Built for React and Laravel.

See sample form definitions in the `forms` directory.

Any names and keys used should be unique and avoid any spacing.

## Frontend Implementation (React)

Displaying a form on React is a simple matter of importing the JSON file and passing it to a `JsonForm` component. The component will handle validation and trigger the supplied `onSubmit` function when validation is successful.

On validation failure, error messages are generated and displayed above the form.

```jsx
import JsonForm from 'json-form-react/JsonForm';
const sampleFormJson = require('forms/register.json');

const currentValues = {
	field_name: 'A value',
	numeric_field_name: 123,
	checkbox_name: true
};

const MyComponent = () => {
	const onMySubmit = (values) => {
		// do whatever with values
	};

	return (
		<JsonForm
			json={sampleFormJson}
			values={currentValues}
			onSubmit={onMySubmit}/>
	);
};
```

|Prop|Description|
|--|--|
|`json`|The JSON form definition.|
|`values`|An object with key-value pairs defining current values for the fields, where available.|
|`onSubmit`|A function that has an attribute `values`, which will be an object of pairs of field names and their values. This function is only triggered if validation passes.|

Make sure the outgoing request to your Laravel backend directly contains the form fields. There is currently no backend support for placing the fields as an object within another field.

## Backend Implementation (Laravel)

On Laravel, we just need to extract the validation rules from the JSON form definition. This is done by our handy `JsonFormValidator` class and its `validate` function, placed within the relevant controller function.

Internally, this uses Laravel's built-in validation routine. Upon validation failure, it will break the current routine and return Laravel's formatted error messages as a response.

```php
use App\JsonForm\JsonFormValidator;

class SampleController extends Controller
{
	public function sampleFormSubmissionAction(Request $request)
	{
		$jfv = new JsonFormValidator(base_path('forms/sample.json'));
		$jfv->validate($request);

		// do whatever with $request
		// this code will not be reached if validation failed
	}
}
```

## Form Attributes

A form definition is a JSON object in its own file.

|Attribute|Required|Description|
|--|--|--|
|`name`|Required|A unique internal name for this form.|
|`fields`|Required|An array of field definition objects. See the section on *Field Attributes*.|
|`class`|Optional|For styling the form's HTML `<form>` element.|
|`submit`|Optional|A submit button definition. Should have a `label` and optionally a `class`.|

## Field Attributes

Each field definition is a JSON object within the `fields` array.

|Attribute|Required|Description|
|--|--|--|
|`name`|Required|A unique internal name for this field. This is prettified and displayed in frontend validation errors.|
|`label`|Required|The label for the field.|
|`type`|Required|The field type. See the section on *Field Types*.|
|`placeholder`|Optional|For `text` fields, this is displayed as a placeholder in the text box. For `select` fields, this is shown as the initial option when nothing is selected.|
|`defaultValue`|Optional|The initial value of the field before modification.|
|`options`|Optional|An object of key-value pairs. For `select` and `radio` field types, this defined the available options. For other field types, this acts as an `in` validation rule; i.e. validation succeeds only if the value entered matches a value in this attribute.|
|`validation`|Optional|A list of validation rules that can be applied on the frontend, separated by `|`. Many of these rules will also be applied on the backend. See the section on *Validation Rules*.|
|`validationServer`|Optional|A list of validation rules that only work on the backend (usually requiring database access). See the section on *Validation Rules*.|
|`class`|Optional|For styling the field's HTML `<input>` or `<select>` element.|
|`wrapperClass`|Optional|For styling the HTML `<div>` element that wraps the `<input>` and its `<label>`.|

## Field Types

These field types are self-explanatory and equivalent to their raw HTML implementation.

1) `text`
2) `password`
3) `email`
4) `date`
5) `number`
6) `select`
7) `checkbox`
8) `radio`

Note that `checkbox`  fields output either `true` or a falsy (in JavaScript) value. They cannot currently have a custom value string.

## Validation Rules

Validation rules follow [those used by Laravel](https://laravel.com/docs/8.x/validation), though some custom rules have been implemented according to our use cases. Thus, validation in Laravel is handled by its built-in validator, while we have implemented a custom validator for React.

In theory, any validation rule in Laravel can be used in a field's `validationServer`. The frontend will ignore any unknown rules listed in `validation`.

|Rule|Condition|Frontend|Backend|Success Case|
|--|--|--|--|--|
|`required`|`N`|&check;|&check;|A value is set.|
|`min`|`N`|&check;|&check;|For strings, the string length is at least `N`. For numbers, the number is greater than or equal to `N`.|
|`max`|`N`|&check;|&check;|For strings, the string length is at most `N`. For numbers, the number is less than or equal to `N`.|
|`gt`|`N`|&check;|&check;|A number greater than `N`.|
|`lt`|`N`|&check;|&check;|A number less than `N`.|
|`regex`|`pattern`|&check;|&check;|A match against `pattern`.|
|`alpha`||&check;|&check;|Only has alphabetical characters|
|`alpha_dash`||&check;|&check;|Only has alphabetical characters and dashes.|
|`numeric`||&check;|&check;|Only has numerical characters.|
|`email`||&check;|&check;|An email address. (Not reliable – best to rely on actual [email confirmation](https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression).)|
|`date`||&check;|&check;|Parseable by `new Date()` in JavaScript.|
|`nic_lk`||&check;||A valid Sri Lankan ID number. (Not reliable – try a validation calculation using the date of birth.)|
|`phone_lk`||&check;||A valid Sri Lankan phone number without country code. (Not realiable – better to use [libphonenumber](https://www.npmjs.com/package/libphonenumber-js) or text verification.|
|`in`|`a,b,...`|&check;|&check;|Matches one of the specified strings. This rule is automatically applied if you specify `options` for a field.|
|`exists`|`table,column`||&check;|Matches an existing value in `column` of `table` in the database.|

## Credits

 - [DxDy Digital](https://dxdydigital.com)
 - [Amalan](https://github.com/noahamalan)
 - [Chamath](https://github.com/cie6868)
 - [Raghu](http://github.com/raghuhvarman)
 - [Hari](https://github.com/hariidev)
 - [Yasika](yasikahivin)
 - [Sajana](https://github.com/sajana1829)
