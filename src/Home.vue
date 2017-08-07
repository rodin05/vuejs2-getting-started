<template>
    <ul class="homelist">
        <li v-for="item in list">
            <img v-lazy="item">
        </li>
    </ul>
</template>
<script>
    import img1 from './images/01.jpeg';
    import img2 from './images/02.jpeg';
    import img3 from './images/03.jpeg';
    import img4 from './images/04.jpeg';
    import img5 from './images/05.jpeg';
    import img6 from './images/06.jpeg';
    import { Toast } from 'mint-ui';

    export default{
        data:function () {
            return{
                list:[]
            }
        },
        created:function () {
            var _this=this;
            _this.list=[img1,img1,img3,img4,img5,img6,img1,img1,img3,img4,img5,img6];
            Toast({
                message: 'Upload Complete',
                position: 'middle',
                duration: 5000,
                iconClass: 'mint-toast-icon mintui mintui-success'
            });
        }
    }
</script>
<style>
    img {
        border-style: none;
        display: block;
    }
    .homelist li{
        list-style: none;
        background-color: #DDDDDD;
    }
    .homelist,.homelist li{
        width: 100%;
        padding: 0;
    }
    .homelist li img{
        width: 100%;
        height: 100%;
    }
    .homelist li img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

</style>