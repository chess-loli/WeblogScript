<template>
    <div>
        <form @submit.prevent="onSubmit">
            <label class="typo__label">Search:</label>
            <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="pick some" label="title" track-by="title" :preselect-first="false">
                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </multiselect>
            <div class="has-text-right">
                <button class="button is-primary" type="submit">Filter</button>
            </div>
        </form>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
import Multiselect from 'vue-multiselect';
export default {
    mounted() {
        this.getAllCategoriesAction().then((data) => {
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
            for (let i = 0; i < this.value.length; i++) {
                this.form.category_id.push(this.value[i].id)
            };
            this.filterPostsByCategoriesAction(this.form.category_id);
        },
    },
    computed: {
        ...mapState([
                'current_user',
                'categories',
                'users'
            ])
    },
}
</script>