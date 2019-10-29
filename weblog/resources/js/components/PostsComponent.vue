<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="message" v-for="post in posts" :key="post.id">
                    <div class="message-header">
                        <p>{{post.post_title}}</p>
                        <button class="delete" aria-label="delete" @click="deletePostAction(post)"></button>
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
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
    export default {
        mounted() {
            
        },
        created() {
            
        },
        methods: {
            ...mapActions([
                'deletePostAction',
            ])
        },
        computed: {
            ...mapState([
                'posts'
            ]),
            ...mapActions([
                'getAllPostsAction',
            ]),
        }
    }
</script>
