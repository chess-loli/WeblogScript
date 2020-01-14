<template>
    <div class="container">
        <h1>current logged in user</h1>
        <p>name:</p>
        <div class="field">
            <p class="control">
                {{ user.name }}
            </p>
        </div>
        <p>email:</p>
        <div class="field">
            <p class="control">
                {{ user.email }}
            </p>
        </div>
        <button class="button is-primary" @click="onConfirm">log out</button>
    </div>
</template>

<script>
export default {
    mounted() {
        
    },
    created() {
        this.fetchUser()
    },
    data() {
        return {
            user: {
                name: '',
                email: ''
            }
        }
    },
    methods: {
        onConfirm() {
            this.$store.dispatch('logoutUserAction')
            .catch(errors => alert(errors))
        },
        fetchUser() {
            this.$store.dispatch('fetchUserAction')
            .then(response => {
                
                this.user.name = response.data.name,
                this.user.email = response.data.email
            }
            )
            .catch(errors => console.log(errors)
            )
        }
    },
    computed: {
        
    }
}
</script>