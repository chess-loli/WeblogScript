<!DOCTYPE html>
<html lang="eng">
<meta name="csrf-token" content="{{ csrf_token() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>weblog</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
    </head>
    <body>
        <div id="app">
            @include ('layouts.header')

            <section class="section">
                <div class="container">
                    <router-view></router-view>
                </div>
            </section>
        </div>

        <script src="./js/app.js"></script>
    </body>
</html>
