<template>
    <!-- <div>
        <form @submit.prevent="onSubmit">
            <select name="category_id" v-model="form.category_id" multiple>
                <option disabled value="">choose categorie(s) to filter (hold ctrl for multiple)</option>
                <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
            </select>
            <div class="has-text-right">
                <button class="button is-primary" type="submit">filter</button>
            </div>
        </form>
    </div> -->
    <div>
        <label class="typo__label">Simple select / dropdown</label>
        <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="pick some" :preselect-first="false">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
        </multiselect>
        <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
import Multiselect from 'vue-multiselect';
export default {
    mounted() {
        this.getAllCategoriesAction().then((data) => {
            this.options = data.data
        });
        //console.log(this.getAllCategoriesAction());
        //console.log(this.getAllCategoriesAction().data);
        //this.getAllCategoriesAction().then(data => {
        //    console.log(data);
        //});
        //this.getAllCategoriesAction().then(response => {
        //    console.log(response);
        //});
              
        console.log(this.options);
        
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