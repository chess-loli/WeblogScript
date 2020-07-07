<template>
    <div class="container">
        <form @submit.prevent="onSubmit" enctype="multipart/form-data">
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
                    <label class="typo__label">Search:</label>
                    <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="pick some" label="title" track-by="title" :preselect-first="false">
                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                    </multiselect>
                </div>
            </div>
            <div class="form-group">
                <div>
                    <input type="file" name="post_image" id="post_image" class="form-control" @change="onFileChange" @keydown="form.errors.clear('post_image')">
                    <span class="help is-danger" v-if="form.errors.has('post_image')" v-text="form.errors.get('post_image')"></span>
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
                    post_image: ''
                }),
            }
        },
        methods: {            
            onSubmit() {
                for (let i = 0; i < this.value.length; i++) {
                this.form.category_id.push(this.value[i].id)
                };
                let formData = new FormData();
                formData.append('post_title', this.form.post_title)
                formData.append('post_content', this.form.post_content)
                formData.append('user_id', this.form.user_id)
                formData.append('category_id', this.form.category_id)
                formData.append('post_image', this.form.post_image)
                for (var pair of formData.entries()) {
                    console.log(pair[0] + ',' + pair[1]);
                }
                console.log(formData.entries());
                
                this.$store.dispatch('createPostAction', formData).then(() => {
                    this.$router.push('/')
                });
            },
            onFileChange(e) {
                console.log(e.target.files[0]);
                
                this.form.post_image = e.target.files[0];
                // var files = e.target.files || e.dataTransfer.files;
                // if (!files.length)
                //     return;
                // this.form.post_image = files[0]; 
            },
            // createImage(file) {
            //     var image =  new Image();
            //     var reader = new FileReader();
            //     var vm = this;
            //     reader.onload = (e) => {
            //         vm.form.post_image = e.target.result;
            //     };
            //     reader.readAsDataURL(file);
            // }
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