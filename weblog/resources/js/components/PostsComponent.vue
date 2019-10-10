<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="message" v-for="post in posts" :key="post.id">
                    <div class="message-header">
                        <p>{{post.post_title}}</p>
                        <button class="delete" aria-label="delete" @click="deletePost(post.id)"></button>
                    </div>

                    <div class="message-body">
                        {{post.post_content}}
                    </div>

                    <div class="has-text-right">
                        <router-link :to="{name:'posts.edit', params: {id: post.id}}">Edit</router-link>
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
            axios.get('api/posts')
                .then(({data}) => this.posts = data);
        },
        methods: {
            deletePost(postid) {
                axios.post(`api/posts/${postid}`, {'_method': 'DELETE'})// .then remove post from posts;
                axios.get('api/posts')
                .then(({data}) => this.posts = data);
            },
        }
    }
</script>
