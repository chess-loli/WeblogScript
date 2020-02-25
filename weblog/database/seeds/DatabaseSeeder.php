<?php

use Illuminate\Database\Seeder;
use App\Post;
use App\Category;
use Faker\Factory as Faker;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('users')->insert([
        //     'name' => Str::random(10),
        //     'email' => 'admin@gmail.com',
        //     'password' => bcrypt('password'),
        // ]);

        DB::table('categories')->delete();

        DB::table('categories')->insert([
            'title' => 'pokemon'
        ]);
        DB::table('categories')->insert([
            'title' => 'anime'
        ]);
        DB::table('categories')->insert([
            'title' => 'league of legends'
        ]);
        DB::table('categories')->insert([
            'title' => 'uwu'
        ]);
        DB::table('categories')->insert([
            'title' => 'doctorial documented diseases derived down the docks'
        ]);
        DB::table('categories')->insert([
            'title' => 'is that spaceboy'
        ]);
        DB::table('categories')->insert([
            'title' => 'uwu number 2'
        ]);
        DB::table('categories')->insert([
            'title' => 'more uwu'
        ]);
        DB::table('categories')->insert([
            'title' => 'even more uwu'
        ]);
        DB::table('categories')->insert([
            'title' => 'all the uwu'
        ]);



        $faker = Faker::create();
        $categories = Category::all()->pluck('id')->toArray();
        $posts = Post::all();

        foreach($posts as $post) {
            $post->category_id = $faker->randomElement($categories);
        }
    }
}
