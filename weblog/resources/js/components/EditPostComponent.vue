<template>
   <div class="container">
        <form action="" method="POST">
            {{ method_field('PATCH') }}
            <div class="form-group">
                <div>
                    <input type="text" class="form-control" name="post_title" placeholder="post title" value="">
                </div>
            </div>
            <div class="form-group">
                <div>
                    <input type="textarea" class="form-control" name="post_content" placeholder="the content of your post goes here" value="">
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