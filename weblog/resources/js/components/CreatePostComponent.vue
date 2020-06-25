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
                <p>Content:</p>
                <div>
                    <textarea class="textarea" name="post_content" placeholder="the content of your post goes here" v-model="form.post_content" @keydown="form.errors.clear('post_content')"></textarea>
                    <span class="help is-danger" v-if="form.errors.has('post_content')" v-text="form.errors.get('post_content')"></span>
                </div>
            </div>
            <div class="form-group">
                <p>Category/Categories:</p>
                <div>
                    <!-- <select name="category_id" v-model="form.category_id" multiple>
                        <option disabled value="">choose one or more that apply from this list</option>
                        <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
                    </select>    -->
                    <label class="typo__label">Search:</label>
                    <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="pick some" label="title" track-by="title" :preselect-first="false">
                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                    </multiselect>
                </div>
            </div>
            <div class="form-group">
                <div>
                    <input type="file" name="post_image" id="post_image">
                </div>
            </div>
            <div class="form-group">
                <div>
                    <button class="button is-primary" type="submit" :disabled="form.errors.any()">Create Post</button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
    import Multiselect from "vue-multiselect";
    export default {
        mounted() {
            this.form.user_id = this.current_user.id;
            this.$store.dispatch('getAllCategoriesAction').then((data) => {
            for (let i = 0; i < data.length; i++) {
                const idAndTitle = {id: data[i].id, title: data[i].title};
                this.options.push(idAndTitle);                
            }
        });        
        },
        components: {
            Multiselect
        },
        data() {
            return {
                value: [],
                options: [],
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
                for (let i = 0; i < this.value.length; i++) {
                this.form.category_id.push(this.value[i].id)
                };
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