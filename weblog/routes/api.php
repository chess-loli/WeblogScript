<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Post;
Route::get('/posts', function () {
    return Post::get();
});
Route::resource('comments', 'CommentsController');
Route::resource('posts', 'PostsController');
Route::resource('users', 'UsersController');
Route::resource('categories', 'CategoriesController');
Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
});
use App\Comment;
Route::get('/comments', function () {
    return Comment::get();
});
use App\Category;
Route::get('/categories', function () {
    return Category::get();
});