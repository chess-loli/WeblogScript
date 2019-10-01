<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="message" v-for="post in posts" :key="post.id">
                    <div class="message-header">
                        {{post.post_title}}
                    </div>

                    <div class="message-body">
                        {{post.post_content}}
                    </div>

                    <div>
                        <router-link to="/posts/:post.id/edit/">Edit</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            
        },
        data() {
            return {
                posts: []
            }
        },
        created() {
            axios.get('/posts')
                .then(({data}) => this.posts = data);
        },
    }
</script>
