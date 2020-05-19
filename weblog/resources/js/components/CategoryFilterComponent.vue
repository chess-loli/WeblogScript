<template>
    <div>
        <form @submit.prevent="onSubmit">
            <select name="category_id" v-model="form.category_id" multiple>
                <option disabled value="">choose categorie(s) to filter (hold ctrl for multiple)</option>
                <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
            </select>
            <div class="has-text-right">
                <button class="button is-primary" type="submit">filter</button>
            </div>
        </form>


        
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
export default {
    mounted() {
        this.getAllCategoriesAction();
    },
    data() {
        return {
            form: new Form({
                category_id: []
            })
        }
    },
    methods: {
        ...mapActions([
            'getAllCategoriesAction',
            'filterPostsByCategoriesAction'
        ]),
        onSubmit() {
            this.filterPostsByCategoriesAction(this.form.category_id);
        },
    },
    computed: {
        ...mapState([
                'current_user',
                'categories'
            ])
    },
}
</script>