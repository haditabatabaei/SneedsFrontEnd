<template>
    <div class="blog-blocks-container">
        <home-page-blog  v-for="(item,index) in itemsInput" :key="index" :item="item"></home-page-blog>
    </div>
</template>

<script>
    import HomePageBlog from "./HomePageBlog";
    export default {
        name: "HomePageBlogSection",
        components:{
            HomePageBlog : HomePageBlog
        },
        data () {
            return{}
        },
        props : {
            itemsInput :{
                type: Array,
                default: ()=> []
            }
        },
    }
</script>

<style scoped>
    .blog-blocks-container {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        margin: auto;
    }
    @media only screen and (max-width: 567.8px){
        .blog-blocks-container {
            width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: auto;
        }
    }

</style>