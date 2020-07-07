<template>
   <div class="container" v-if="post">
        <div>
            <p>Title:</p>
            <p>{{ post.post_title }}</p>
        </div>
        
        <div>
            <p>Content:</p>
            <p>{{ post.post_content }}</p>
            <div>
                <img :src="post.post_image">
            </div>
        </div>

        <div>
            <p>Category/Categories:</p>
            <ul v-for="category in post.categories" :key="category.id">
                <li>{{ category.title }}</li>
            </ul>
        </div>
            
        <div>
            <p>First Posted At:</p>
            <p>{{ post.created_at }}</p>
        </div>

        <div>
            <p>last edited at:</p>
            <p>{{ post.updated_at }}</p>
        </div>
        <article class="media" v-for="comment in commentsOfPost" :key="comment.id">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="https://www.seoclerk.com/pics/27499-2cDw7R1524075001.jpg">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">       
                    {{ comment.comment_content }}
                </div>
            </div>
        </article>
        <form @submit.prevent="onSubmit">
            <article class="media">
                <figure class="media-left">
                    <p class="image is-64x64">
                        <img src="https://www.seoclerk.com/pics/27499-2cDw7R1524075001.jpg">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="field">
                        <p class="control">
                            <textarea class="textarea" name="comment_content" placeholder="Add a comment..." v-model="form.comment_content" @keydown="form.errors.clear('comment_content')"></textarea>
                            <span class="help is-danger" v-if="form.errors.has('comment_content')" v-text="form.errors.get('comment_content')"></span>
                        </p>
                    </div>
                    <nav class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <button type="submit" class="button is-info">Submit</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </article>
        </form>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';

export default {
    mounted() {
       this.fetchPostAction(`${this.$route.params.id}`);
       this.getAllCommentsAction();
       this.form.user_id = this.current_user.id;
       this.form.post_id = this.$route.params.id;
       
    },
    data() {
        return {
            form: new Form({
                comment_content: '',
                user_id: '',
                post_id: '',
                category_id: ''
            }),
            // commentsOfPost: this.getCommentsByID(this.$route.params.id)
            commentsOfPost: this.$store.getters['getCommentsByID'](this.$route.params.id)
        }
    },
    methods: {
        ...mapActions([
            'fetchPostAction',
            'getAllCommentsAction'
        ]),
        onSubmit() {
                this.$store.dispatch('createCommentAction', this.form).then(() => {
                    this.$router.push('/')
            });
        },
        // ...mapGetters([
        //     'getCommentsByID'
        // ]),
    },
    computed: {
        ...mapState([
            'posts',
            'current_user',
            'comments',
        ]),
        ...mapGetters({
            post: 'getSinglePost',
            
        }),
        
        
        
    }
}
</script>