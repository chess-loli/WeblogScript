<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Traits\UploadTrait;
use Illuminate\Support\Str;

class PostsController extends Controller
{
    use UploadTrait;
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
        if ($request->get('category_ids')) {
            $postsByCat = Post::whereHas('categories', function (Builder $query) {
                $query->whereIn('id', explode(',', request('category_ids')));
            })->get();
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
        $this->validate($request, ['post_title' => 'required', 'post_content' => 'required', 'user_id' => 'required', 'post_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:8000']);
        $post = new Post();
        $post->post_title = request('post_title');
        $post->post_content = request('post_content');
        $post->user_id = request('user_id');
        if ($request->has('post_image') && $request->post_image != null) {
            $image = $request->file('post_image');
            $name = Str::slug($request->input('post_title')).'_'.time();
            $folder = '/uploads/images/';
            $filepath = $folder . $name. '.' . $image->getClientOriginalExtension();
            $this->uploadOne($image, $folder, 'public', $name);
            $post->post_image = $filepath;
        } else if ($request->post_image == null){
            $post->post_image = null;
        }
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

        if ($request->has('post_image')) {
            $image = $request->file('post_image');
            $name = Str::slug($request->input('post_title')).'_'.time();
            $folder = '/uploads/images/';
            $filepath = $folder . $name. '.' . $image->getClientOriginalExtension();
            $this->uploadOne($image, $folder, 'public', $name);
            $post->post_image = $filepath;
        }

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
