<template>
   <div class="container">
        <form @submit.prevent="onSubmit" @keydown="form.errors.clear()">
            
            <div class="form-group">
                <div>
                    <p>Title:</p>
                    <input type="text" class="form-control" name="post_title" placeholder="post title" v-model="form.post_title">
                    <span class="help is-danger" v-if="form.errors.has('post_title')" v-text="form.errors.get('post_title')"></span>
                </div>
            </div>
            <div class="form-group">
                <div>
                    <p>Content:</p>
                   <textarea class="textarea" name="post_content" placeholder="the content of your post goes here" v-model="form.post_content"></textarea>
                    <span class="help is-danger" v-if="form.errors.has('post_content')" v-text="form.errors.get('post_content')"></span>
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
            form: this.post,
            post: axios.get('/posts/:post.id')
                .then(({data}) => this.post = data)
        }
    },
    onSubmit() {
                this.form.patch('/posts/:post.id/edit')   
            }   
}
</script>