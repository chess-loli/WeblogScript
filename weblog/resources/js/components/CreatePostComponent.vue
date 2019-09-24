<template>
    <div class="container">
        <form action="" method="POST">
            <div class="form-group">
                <div>
                    <input type="text" class="form-control" name="post_title" placeholder="post title">
                </div>
            </div>
            <div class="form-group">
                <div>
                    <input type="textarea" class="form-control" name="post_content" placeholder="the content of your post goes here">
                </div>
            </div>
        </form>
    </div>
</template>


<script>
    export default {
        mounted() {
            
        },
        data() {
            return {
                post_title: '',
                post_content: ''
            }
        },
    }
</script>