<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ComputerUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {

        return [
            'name' => 'required|unique:computers,name,' . $this->id,
            'user' => 'required',
            'workgroup' => 'required',
            'processor' => 'required',
            'ram' => 'required',
            'storage' => 'required',
            'motherboard' => 'required',
            'case' => 'required|string',
            'power_supply' => 'required',
            'operating_system' => 'required',
            'operating_system_activation' => 'required|boolean',
            'room_id' => 'required',
            'condition' => 'required|numeric',
            'specification' => 'nullable',
            'accessories' => 'array',
            'softwares' => 'array'
        ];
    }
}
