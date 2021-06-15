<?php

namespace App\JsonForm;

use Illuminate\Http\Request;

class JsonFormValidator
{

    private $formDef;

    public function __construct($pathToJson)
    {
        $jsonString = file_get_contents($pathToJson);
        $this->formDef = json_decode($jsonString, true);
    }

    /**
     * Validate the request according to the form definition. Upon failure, Laravel will respond automatically and die.
     */
    public function validate(Request $request)
    {
        $rulesArray = $this->generateValidationRuleset();
        $request->validate($rulesArray);
    }

    private function generateValidationRuleset()
    {
        $formRules = [];
        foreach ($this->formDef['fields'] as $fieldDef) {
            $fieldName = $fieldDef['name'];

            if (isset($fieldDef['validation'])) {
                $fieldRules = explode('|', $fieldDef['validation']);

                $fieldRulesFinal = [];
                foreach ($fieldRules as $rule) {
                    if ($this->checkRulePossibleInLaravel($rule)) {
                        array_push($fieldRulesFinal, $rule);
                    }
                }

                // validate from available options
                if (isset($fieldDef['options'])) {
                    array_push($fieldRulesFinal, $this->generateOptionsValidation($fieldDef['options']));
                }

                // server-only validations
                if (isset($fieldDef['validationServer'])) {
                    array_push($fieldRulesFinal, $fieldDef['validationServer']);
                }

                $formRules[$fieldName] = implode('|', $fieldRulesFinal);
            }
        }

        return $formRules;
    }

    /**
     * Some rules are not implemented in Laravel. List those here.
     */
    private function checkRulePossibleInLaravel($rule)
    {
        $impossible = [
            'nic_lk',
            'phone_lk'
        ];

        return !in_array($rule, $impossible);
    }

    /**
     * Some rules need to be reformatted to work in laravel. List those here.
     */
    private function generateOptionsValidation($options)
    {
        $validOptions = [];
        foreach ($options as $value => $label) {
            array_push($validOptions, $value);
        }

        return 'in:' . implode(',', $validOptions);
    }

}
