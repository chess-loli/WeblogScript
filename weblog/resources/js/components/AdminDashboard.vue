<template>
    <div class="container">
        <ul v-for="user in users" :key="user.id">
            <li>{{ user.name }}</li>
        </ul>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
export default {
    mounted() {
        
    },
    created() {
        this.getAllUsersAction();
    },
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions([
            'getAllUsersAction',
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