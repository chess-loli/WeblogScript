<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <p>Email:</p>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input type="email" class="input is-rounded" name="email" placeholder="email" v-model="form.email"  @keydown="form.errors.clear('email')">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <p>Password:</p>
                <div class="field">
                    <p class="control has-icons-left">
                        <input type="password" class="input is-rounded" name="password" v-model="form.password" @keydown="form.errors.clear('password')">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div class="control">
                    <button class="button is-primary" type="submit">log in</button>
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
        created() {
            
        },
        data() {
            return {
                form: new Form({
                    email: '',
                    password: ''
                })
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('loginUserAction', this.form)
                .then(response => {this.$store.dispatch('fetchUserAction')})
                .then(response => {
                    this.$router.push('/')
                })
                .catch(errors => alert(errors))

            },
        },
        computed: {
            
        }
    }
</script>