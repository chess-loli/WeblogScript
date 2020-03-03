<template>
    <div>
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script>
    const default_layout = "default";

    import posts from './layouts/posts';
    import users from './layouts/users';
    import admin from './layouts/admin';
    export default {
        components: {
            posts,
            users,
            admin
        },
        computed: {
            layout() {
                return (this.$route.meta.layout)
            }
        },
    }
</script>

