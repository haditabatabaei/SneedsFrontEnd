<template>
    <div class="consultant-info-container ">
        <img class="consultant-avatar" src="/sneedsAssets/img/niloofar-tavakoli.png" alt="consultant_avatar">
        <div class="consultant-info">
            <p class="consultant-name">
                {{item.name}}
                <span><img  src="/sneedsAssets/img/canada.png" alt=""></span>
            </p>
            <p class="cosultant-major">{{item.major}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomePageConsultant",
        data(){
            return{}
        },
        props: {
            item: {
                type: Object,
                default: () =>{
                    return{name :"نرگس حقیقتی" , major:"دانشجوی مهندسی کامپیوتر " }
                }
            }
        }


    }
</script>

<style scoped>
    .consultant-info-container {
        width: 30%;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: 0px 7px 46px #0000001F;
        margin-bottom: 3%;

    }

    .consultant-info {
        width: 70%;
        display: flex;
        flex-direction: column;
        padding-left: 10px;

    }
    .consultant-avatar {
        width: 45%;
        height: 45%;
    }
    .consultant-name {
        color: #303143;
        font-weight: bold;
    }
    .cosultant-major {
        color: #707070;
        font-size: 10px;
    }
    @media only screen and (max-width: 567.8px) {
        .consultant-info-container {
            width: 70%;
        }
    }

</style>