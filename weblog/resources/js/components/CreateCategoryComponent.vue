<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <div class="form-control">
                    <textarea class="textarea" name="title" placeholder="name of the category" v-model="form.title" @keydown="form.errors.clear('title')"></textarea>
                    <span class="help is-danger" v-if="form.errors.has('title')" v-text="form.errors.get('title')"></span>
                </div>
            </div>    
            <div class="form-group">
                <div class="form-control">
                    <button class="button is-primary" type="submit" :disabled="form.errors.any()">create category</button>
                </div>
            </div>
        </form>  
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
export default {
    mounted() {
        
    },
    data() {
        return {
            form: new Form({
                title: ''
            })
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('createCategoryAction', this.form).then(() => {
                this.$router.push('/categories')
            })
        }
    },
    computed: {
        ...mapState([
            'current_user',
        ])
    },
}
</script>