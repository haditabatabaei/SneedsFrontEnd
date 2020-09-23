<template>
    <a href="#" class="blog-blocks">
        <div class="blog-info-container">
            <img class="blog-img" src="/sneedsAssets/img/ielts-or-toefl.png" alt="">
            <span class="blog-subject">{{item.SubTitle}}}</span>
            <p class="blog-title">{{item.Title}}</p>
        </div>
    </a>
</template>

<script>
    export default {
        name: "HomePageBlog",
        data(){
            return{}
        },
        props: {
            item: {
                type: Object,
                default: () =>{
                    return{SubTitle :"نرگس حقیقتی" , Title:"something" }}
            }
        }
    }

</script>

<style scoped>
    .blog-blocks {
        width: 23%;
        align-items: center;
        text-align: right;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0px 7px 46px #0000001F;

    }
    .blog-img {
        width: 100%;

    }
    .blog-subject {
        font-size: 8px;
        color: white;
        background-color: #00BFD6;
        padding: 5px;
        border-radius: 20px;
    }
    .blog-title {
        color: #303143;
        font-weight: bold;
        margin-top: 10px;
    }
    @media only screen and (max-width: 567.8px) {
        .blog-blocks{
            width: 80%;
        }
    }
</style>