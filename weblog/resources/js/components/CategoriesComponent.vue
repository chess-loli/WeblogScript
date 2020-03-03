<template>
    <div>
        <ul v-for="category in categories" :key="category.id">
            <li>{{category.title}}</li>
        </ul>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
export default {
    mounted() {
        
    },
    created() {
        this.getAllCategoriesAction();
    },
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions([
            'getAllCategoriesAction',
        ])
    },
    computed: {
        ...mapState([
            'categories',
            'users',
            'current_user'
        ])
    },
}
</script>