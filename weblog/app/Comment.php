<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user() 
    {
        return $this->belongsto(User::class);
    }

    public function post() 
    {
        return $this->belongsto(Post::class);
    }
}
