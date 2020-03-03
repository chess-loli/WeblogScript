<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <div>
                     <p>Title:</p>
                    <input type="text" class="form-control" name="post_title" placeholder="post title" v-model="form.post_title"  @keydown="form.errors.clear('post_title')">
                    <span class="help is-danger" v-if="form.errors.has('post_title')" v-text="form.errors.get('post_title')"></span>
                </div>
            </div>
            <div class="form-group">
                <div class="form-control">
                    <p>Content:</p>
                    <textarea class="textarea" name="post_content" placeholder="the content of your post goes here" v-model="form.post_content" @keydown="form.errors.clear('post_content')"></textarea>
                    <span class="help is-danger" v-if="form.errors.has('post_content')" v-text="form.errors.get('post_content')"></span>
                </div>
            </div>
            <div class="form-group">
                
                    <p>Category/Categories:</p>
                    <select class="form-control" name="category_id" v-for="category in categories" :key="category.id" v-model="form.category_id" multiple>
                        <option :value="category.id">{{ category.title }}</option>
                    </select>
                
            </div>
            <div class="form-group">
                <div class="form-control">
                    <button class="button is-primary" type="submit" :disabled="form.errors.any()">Create Post</button>

                </div>
            </div>
        </form>
    </div>
</template>


<script>
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
    export default {
        mounted() {
            this.form.user_id = this.current_user.id;
            this.$store.dispatch('getAllCategoriesAction');
        },
        data() {
            return {
                form: new Form({
                    post_title: '',
                    post_content: '',
                    user_id: '',
                    category_id: []
                }),
            }
        },
        methods: {            
            onSubmit() {
                this.$store.dispatch('createPostAction', this.form).then(() => {
                    this.$router.push('/')
                });
            },
        },
        computed: {
            ...mapState([
                'current_user',
                'auth_token', 
                'categories'
            ])
        },
    }
</script>