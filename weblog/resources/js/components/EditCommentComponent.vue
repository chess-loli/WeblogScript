<template>
   <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <div>
                    <p>Content:</p>
                    <textarea class="textarea" name="comment_content" placeholder="the content of your comment goes here" v-model="form.comment_content" @keydown="form.errors.clear('comment_content')"></textarea>
                    <span class="help is-danger" v-if="form.errors.has('comment_content')" v-text="form.errors.get('comment_content')"></span>
                </div>
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
        axios.get(`/api/comments/${this.$route.params.id}`)
                .then(({data}) => {
                    this.form = new Form(data);
                });               
    },
    data() {
        return {
            form: new Form({
                user_id: '',
                comment_content: '',
                post_id: ''
            }),
        }
    },
    methods: {
        onSubmit() {
                var payload = {'formData': this.form, 'id': this.$route.params.id}
                this.$store.dispatch('editCommentAction', payload).then(() => this.$router.push('/')).catch(errors => console.log(errors));
            }   
    },
    
}
</script>