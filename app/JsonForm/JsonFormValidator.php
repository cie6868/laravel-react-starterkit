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
                $fieldRules = $fieldDef['validation'];
                if (isset($fieldDef['validationServer'])) {
                    $fieldRules .= '|' . $fieldDef['validationServer'];
                }

                $formRules[$fieldName] = $fieldRules;
            }
        }

        return $formRules;
    }

}
