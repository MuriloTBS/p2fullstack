<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    private function checkAdmin(Request $request)
    {
        if ($request->user('api')->role !== 'admin') {
            abort(response()->json(['message' => 'Acesso negado. Apenas administradores.'], 403));
        }
    }

    public function index(Request $request)
    {
        $this->checkAdmin($request);

        return response()->json(User::orderBy('id')->get(['id', 'name', 'email', 'role', 'created_at']));
    }

    public function store(Request $request)
    {
        $this->checkAdmin($request);

        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role'     => 'required|in:admin,user',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => $data['role'],
        ]);

        return response()->json($user->only(['id', 'name', 'email', 'role', 'created_at']), 201);
    }

    public function show(Request $request, User $user)
    {
        $this->checkAdmin($request);

        return response()->json($user->only(['id', 'name', 'email', 'role', 'created_at']));
    }

    public function update(Request $request, User $user)
    {
        $this->checkAdmin($request);

        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'role'     => 'required|in:admin,user',
        ]);

        $user->update([
            'name'  => $data['name'],
            'email' => $data['email'],
            'role'  => $data['role'],
            ...($data['password'] ? ['password' => Hash::make($data['password'])] : []),
        ]);

        return response()->json($user->only(['id', 'name', 'email', 'role', 'created_at']));
    }

    public function destroy(Request $request, User $user)
    {
        $this->checkAdmin($request);

        if ($user->id === $request->user('api')->id) {
            return response()->json(['message' => 'Você não pode remover sua própria conta.'], 422);
        }

        $user->delete();

        return response()->json(['message' => 'Usuário removido com sucesso.']);
    }
}
