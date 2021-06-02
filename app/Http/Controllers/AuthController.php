<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\JsonForm\JsonFormValidator;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [
                'login',
            ]
        ]);
    }

    public function login(Request $request)
    {
        (new JsonFormValidator(base_path('forms/login.json')))->validate($request);

        $credentials = [
            'username' => $request->username,
            'password' => $request->password,
        ];

        $token = $this->guard()->attempt($credentials);
        if (!$token) {
            return response()->json([
                'message' => 'Invalid username or password.',
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    public function me()
    {
        return response()->json($this->guard()->user());
    }

    public function logout()
    {
        $this->guard()->logout();

        return response()->json([
            'message' => 'Logged out.',
        ]);
    }

    private function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function guard()
    {
        return Auth::guard();
    }

    public function createAccount(Request $request)
    {
        (new JsonFormValidator(base_path('forms/createAccount.json')))->validate($request);

        return response()->json([
            'message' => 'User has been added',
        ], 200);
    }
}
