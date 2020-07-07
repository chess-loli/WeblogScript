<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="has-text-left">
                    <category-filter></category-filter>
                </div>

                <article class="message is-primary" v-for="post in posts" :key="post.id">
                    <div class="message-header">
                        <p>{{post.post_title}}</p>
                    </div>
                    <div class="message-body">
                        {{post.post_content}}
                        <div>
                            <img :src="post.post_image">
                        </div>
                    </div>
                    <div class="has-text-left">
                        <router-link :to="{name:'posts.show', params: {id: post.id}}">view comments</router-link>
                    </div>
                    <div class="has-text-right">
                        {{post.updated_at}}
                    </div>
                    <div class="message-footer">
                        <p v-for="category in post.categories" :key="category.id"><i>{{category.title}}</i></p>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
    import CategoryFilterComponentVue from './CategoryFilterComponent.vue';
    export default {
        mounted() {
            
        },
        created() {
            this.getAllPostsAction();
        },
        data() {
            return {
       
            }
        },
        methods: {
            ...mapActions([
                'getAllPostsAction',
            ]),
        },
        computed: {
            ...mapState([
                'posts',
                'current_user',
                'comments',
                'categories'
            ]),
        },
        components: {
            'category-filter' : CategoryFilterComponentVue
        }
    }
</script>
