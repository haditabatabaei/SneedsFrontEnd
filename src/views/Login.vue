<template>
    <login-form />
</template>

<script>
    import LoginForm from '@/components/StandAlone/LoginForm'
    export default {
        name : 'Login',
        components : {
            'login-form' : LoginForm
        }
    }
</script>