<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class PostsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
    
        
        $posts = Post::orderBy('updated_at', 'DESC')->get();
        $posts->load('user');
        $posts->load('categories');
        // dd($request);
        if ($request->get('category_ids')) {
            // dd(request('category_ids'));
            $postsByCat = Post::whereHas('categories', function (Builder $query) {
                $query->whereIn('id', explode(',', request('category_ids')));
            })->get();
            // where()
            return $postsByCat;
        }
        return $posts;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // maak aparte request class voor validatie: 
        // https://laravel.com/docs/5.8/validation#form-request-validation
        $this->validate($request, ['post_title' => 'required', 'post_content' => 'required', 'user_id' => 'required']);
        $post = new Post();
        $post->post_title = request('post_title');
        $post->post_content = request('post_content');
        $post->user_id = request('user_id');
        $post->save();
        $post->categories()->attach($request->get('category_id'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        // eager load the user
        $post->load('user');
        $post->load('categories');
        return $post;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        $post->load('user');
        $post->load('categories');
        return $post;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $this->validate($request, ['post_title' => 'required', 'post_content' => 'required', 'user_id' => 'required']);
        $post->post_title = request('post_title');
        $post->post_content = request('post_content');
        $post->user_id = request('user_id');
        $post->save();
        $post->categories()->attach('category_id');

        
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();
    }
    // public function getPostsByCategories(Request $request, Post $post)
    // {
    //     $post->load('user');
    //     $post->load('categories');
    //     return $post;
    // }
}
