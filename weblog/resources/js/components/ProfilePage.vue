<template>
    <div>
        <div class="container">
            <h1 class="title">
                Profile
            </h1>
            <div class="field">
                <p class="control">
                    name: {{ user.name }}
                </p>
            </div>
            <div class="field">
                <p class="control">
                    email: {{ user.email }}
                </p>
            </div>
            <div class="field">
                <button>edit profile</button>
            </div>
        </div>
        <div class="container">
            <h1 class="title">
                Posts
            </h1>
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <div class="message" v-for="post in userPosts" :key="post.id">
                            <div class="message-header">
                                <p>{{post.post_title}}</p>
                                <button class="delete" aria-label="delete" @click="deletePostAction(post)"></button>
                            </div>

                            <div class="message-body">
                                <p>{{post.post_content}}</p>
                            </div>
                            <div class="has-text-right">
                                <p>{{post.updated_at}}</p>
                            </div>
                            <div class="has-text-right">
                                <router-link :to="{name:'posts.edit', params: {id: post.id}}">Edit</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <h1 class="title">
                Comments
            </h1>
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <div class="message" v-for="comment in userComments" :key="comment.id">
                            <div class="message-header">
                                <button class="delete" aria-label="delete" @click="deleteCommentAction(comment)"></button>
                            </div>
                            <div class="message-body">
                                <p>{{ comment.comment_content }}</p>
                            </div>
                            <div class="has-text-right">
                                <p>{{comment.updated_at}}</p>
                            </div>
                            <div class="has-text-right">
                                <router-link :to="{name:'comments.edit', params: {id: comment.id}}">Edit</router-link>
                            </div>
                        </div>
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
        this.getAllPostsAction();
        this.getAllCommentsAction();

        this.fetchUserAction().then(response => {
                this.user.name = response.data.name,
                this.user.email = response.data.email
            })
        .catch(errors => console.log(errors))
    },
    data() {
        return {
            // userPosts: [],
            user: {
                name: '',
                email: ''
            },
        }
    },
    methods: {
            ...mapActions([
                'deletePostAction',
                'getAllPostsAction',
                'editPostAction',
                'fetchUserAction',
                'getAllCommentsAction',
                'deleteCommentAction',
                'editCommentAction',
            ]),
        },
    computed: {
        ...mapState([
                'posts',
                'comments',
                'current_user',
                'auth_token',
            ]),
        ...mapGetters({
                userPosts: 'getPostsFromLoggedInUser',
                userComments: 'getCommentsFromLoggedInUser',
        }),
    }
}
</script>