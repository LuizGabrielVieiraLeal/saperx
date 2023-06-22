<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use Illuminate\Http\Request;

class PhoneController extends Controller
{
    public function index()
    {
        return Phone::all();
    }

    public function store(Request $request)
    {
        return Phone::create($request->all());
    }

    public function show(string $phone)
    {
        return Phone::findOrFail($phone);
    }

    public function update(Request $request, string $phone)
    {
        $phone = Phone::findOrFail($phone);
        $phone->update($request->all());
        return $phone;
    }

    public function destroy(string $phone)
    {
        return Phone::destroy($phone);
    }
}
