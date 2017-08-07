<template>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px','-webkit-overflow-scrolling': scrollMode }"  >
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange"  :auto-fill="false" ref="loadmore">
            <div class="hacker-news-item" v-for="(item, key) in list">
                <span class="num" v-text="key + 1"></span>
                <p>
                    <a target="_blank" :href="item.url" v-text="item.title"></a>
                </p>
                <p>
                    <small>
                        <span v-text="item.points"></span>
                        points by
                        <a target="_blank" v-text="item.author"></a>
                        |
                        <a target="_blank" v-text="item.num_comments + ' comments'"></a>
                    </small>
                </p>
            </div>
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'">
                         <mt-spinner type="snake"></mt-spinner>
                </span>
            </div>
            <p v-show="allLoaded === true" style="text-align: center;font-size: 12px">没有了…</p>
        </mt-loadmore>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui';
    const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';
    export default {
        data:function() {
            return {
                searchCondition:{  //分页属性
                    pageNo:1,
                    pageSize:10
                },
                list: [],
                topStatus: '',
                bottomStatus:'',
                allLoaded: false,
                wrapperHeight: 0,//是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            }
        },
//        components: {
//            'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
//            // 推荐应用组件时用a-b形式起名
//        },
        created:function () {
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'triple-bounce'
            });
        },
        mounted(){
            this.loadPageList();  //初次访问查询列表
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        methods: {
            loadTop:function() { //组件提供的下拉触发方法
                //下拉加载
                this.loadPageList();
                this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadBottom:function() {
                // 上拉加载
                this.more();// 上拉触发的分页查询
                // 固定方法，查询完要调用一次，用于重新定位
            },
            loadPageList:function (){
                // 查询数据
                this.$http.get(api, {
                    params: {
                        page: this.searchCondition.pageNo,
                    },
                }).then(res =>{
                    // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
                    Indicator.close();
                    this.isHaveMore(true);
                    this.list = res.data.hits;
                    this.$nextTick(function () {
                        // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
                        // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
                        // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
                        this.scrollMode = "touch";
                    });
                });
            },
            more:function (){
                // 分页查询
                this.searchCondition.pageNo = this.searchCondition.pageNo + 1;
                this.$http.get(api, {
                        params: {
                            page: this.searchCondition.pageNo,
                        },
                    }).then(res=>{
                    this.list = this.list.concat(res.data.hits);
                        if (this.list.length / 20 === 3) {
                            this.isHaveMore(false);
                        }else {
                            this.isHaveMore(true);
                        }
                    this.$refs.loadmore.onBottomLoaded();
                    });
            },
            isHaveMore:function(isHaveMore){
                // 是否还有下一页，如果没有就禁止上拉刷新
                this.allLoaded = true; //true是禁止上拉加载
                if(isHaveMore){
                    this.allLoaded = false;
                }
            },
            handleBottomChange:function(status) {
                console.log('999999999999999')
                console.log(status)
                this.bottomStatus = status;
            }
        }
    }
</script>
<style>
    .page-loadmore-wrapper {
        overflow: scroll
    }
    .mint-loadmore-bottom span {
        display: inline-block;
        -webkit-transition: .2s linear;
        transition: .2s linear;
        vertical-align: middle
    }

    .mint-loadmore-bottom span.is-rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
    .mint-spinner {
        display: inline-block;
        vertical-align: middle
    }
</style>