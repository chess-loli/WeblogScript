<template>
   <div class="container">
        <form @submit.prevent="onSubmit">
            
            <div class="form-group">
                <div>
                    <p>Title:</p>
                    <input type="text" class="form-control" name="post_title" placeholder="post title" v-model="form.post_title" @keydown="form.errors.clear('post_title')">
                    <span class="help is-danger" v-if="form.errors.has('post_title')" v-text="form.errors.get('post_title')"></span>
                </div>
            </div>
            <div class="form-group">
                <div>
                    <p>Content:</p>
                    <textarea class="textarea" name="post_content" placeholder="the content of your post goes here" v-model="form.post_content" @keydown="form.errors.clear('post_content')"></textarea>
                    <span class="help is-danger" v-if="form.errors.has('post_content')" v-text="form.errors.get('post_content')"></span>
                </div>
            </div>
            <div class="form-group">
                <p>Category/Categories</p>
                <select class="form-control" name="category_id" v-model="form.category_id" multiple>
                    <option disabled value="">choose one or more that apply from this list</option>
                    <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
                </select>
            </div>
            <div class="form-group">
                <div>
                    <button class="button is-primary" type="submit" :disabled="form.errors.any()">confirm edit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
export default {
    mounted() {     
        this.$store.dispatch('getAllCategoriesAction'); 
        axios.get(`/api/posts/${this.$route.params.id}`)
                .then(({data}) => {
                    this.form = new Form(data);
                });               
    },
    data() {
        return {
            form: new Form({
                post_title: '',
                post_content: '',
                user_id: '',
                category_id: [],
            }),
        }
    },
    methods: {
        onSubmit() {
                var payload = {'formData': this.form, 'id': this.$route.params.id}
                this.$store.dispatch('editPostAction', payload).then(() => this.$router.push('/')).catch(errors => console.log(errors));
            }   
    },
    computed: {
        ...mapState([
            'categories',
            'current_user',
            'auth_token'
        ])
    },
    
}
</script>