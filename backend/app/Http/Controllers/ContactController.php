<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return Contact::all();
    }

    public function store(Request $request)
    {
        return Contact::create($request->all());
    }

    public function show(string $contact)
    {
        $contact = Contact::with('phones')->findOrFail($contact);
        return response()->json($contact);
    }

    public function update(Request $request, string $contact)
    {
        $contact = Contact::findOrFail($contact);
        $contact->update($request->all());
        return $contact;
    }

    public function destroy(string $contact)
    {
        return Contact::destroy($contact);
    }
}
