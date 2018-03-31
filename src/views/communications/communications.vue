<script>
import {MissLongContent} from '@/help/verification';
import Pagination from '@/components/pagination';
import loop from '@/directives/loop';
export default {
    name: '',
    components: {
        'v-pagination': Pagination
    },
    directives: {
        loop
    },
    data() {
        return {
            total: 10,
            text: MissLongContent('图片可能没有。如果不是因为性，女人更愿意跟女人呆一起。 这话一开始我是不信的。 我属于非常宅那种人，常年一个人呆习惯了，有网络就能过活。 一直以来，我对和女人呆一起没多大兴趣，倒是蛮想有个男朋友的。 所以，一开始我并不觉得和女人呆一起，有什么好的。 但这两年，在知乎上，关注了较长时间情感话题，对男人有了更多了解之后，我相信了这句话了。', 120),
            comunicateData: null,
        };
    },
    created() {},
    mounted() {},
    methods: {
        slideNext: function() {
            this.swiperS.slideNext();
        },
    }
};
</script>
<template>
    <div class="communications_container">

        <div class="container mainBox">
            <div class="mainColumn">
                <div class="card square">
                    <h3>
                        <img src="/static/images/community.png">
                        交流广场
                    </h3>
                    <ul>
                        <li>
                            <img src="/static/images/question_icon.png">
                            <span>提问</span>
                        </li>
                    </ul>
                </div>
                <div class="card questionItem">
                    <div class="authorInfo">
                        <img src="/static/images/user_avatar.png">
                        <div>
                            <span>爱吃菜的小女孩</span>
                            <span class="adress_info">浙江-绍兴-幸福花园小区</span>
                        </div>
                    </div>
                    <router-link tag="div" to="/communications/detail">
                        <div class="questionTitle">
                            我们现在有公交车700辆左右，安装显示器的有400辆，但是能够有效播放的只有一半，声音也很小！平时的维修都是交给当地的公交公司做的，公交公司维护的很不上心，怎样才能保证播放质量？
                        </div>
                        <div class="richContent">
                            <div>
                                维修交给别人你无法管控，我们要求驾驶员报上来的维修不能超过12小时，一般都是报修三小时内解决，不能让它黑屏在路上，我们无法预估有多少潜在的客户在那辆车上！我们专门组建了车队长的微信群，公交车上给他们点个歌，让驾驶员跟售票员们互动点歌，减小了
                                <span> 查看更多 >></span>
                            </div>
                        </div>
                    </router-link>
                    <div class="actions">
                        <ul>
                            <li>
                                <img src="/static/images/dianzan.png">
                                100 个赞
                            </li>
                            <li>
                                <img src="/static/images/pingluen.png">
                                1 条评论
                            </li>
                        </ul>
                    </div>
                </div>
                <v-pagination :total="total"></v-pagination>
            </div>
            <div class="SideBar">
                <div class="card memberNews">
                    <h3>
                        <img src="/static/images/shandian.png">
                        热门话题
                    </h3>
                    <ul>
                        <li>
                            <div class="areaName">浙江-绍兴</div>
                            <div class="mainContent">
                                出彩小明星活动进行中。
                            </div>
                            <!-- <div class="time">2017-12-21</div> -->
                        </li>
                        <li>
                            <div class="areaName">四川-眉山</div>
                            <div class="mainContent">
                                新增终端车辆107辆，设备已全部安装。
                            </div>
                            <!-- <div class="time">2017-12-21</div> -->
                        </li>
                        <li>
                            <div class="areaName">浙江-余姚</div>
                            <div class="mainContent">设备无法安装在车顶中央怎么办？</div>
                        </li>
                        <li>
                            <div class="areaName">海南-三亚</div>
                            <div class="mainContent">
                                司机会拔线，发动机声音大，声音这一块如何维护？
                            </div>
                        </li>
                        <li>
                            <div class="areaName">贵州-贵阳</div>
                            <div class="mainContent">
                                大家有没有更好的销售模式可以借鉴一下。
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.communications_container{
    min-height: 800px;
    background-color: #f5f5f5;
    overflow: hidden;
    .mainBox{
        margin-top: 10px;
        display: flex;
    }
}
.card{
    margin-bottom: 10px;
    background: #fff;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
    box-sizing: border-box;
}
.mainColumn{
    width: 840px;
    // width: 1180px;
    margin-right: 15px;
    .square{
        display: flex;
        justify-content: space-between;
        padding-left: 15px;
        >h3{
            height: 55px;
            display: flex;
            align-items: center;
            font-weight: 600;
            >img{
                height: 30px;
                margin-right: 3px;
            }
        }
        >ul{
            display: flex;
            align-items: center;
            >li{
                display: flex;
                align-items: center;
                margin: 15px 20px;
                cursor: pointer;
                >img{
                    height: 20px;
                    width: 20px;
                    margin-right: 10px;
                    filter: grayscale(100%);
                }
            }
            >li:hover{
                color: @primary-color;
                >img{
                    filter: none;
                }
            }
        }
    }
    .questionItem{
        padding: 20px;
        cursor: pointer;
        .authorInfo{
            display: flex;
            align-items: center;
            font-weight: 600;
            .adress_info{
                font-size: 12px;
                font-weight: normal;
                margin-left: 10px;
            }
            >img{
                height: 50px;
                width: 50px;
                margin-right: 10px;
            }
        }
        .questionTitle{
            margin-top: 15px;
            font-size: 20px;
            font-weight: 600;
            &:hover{
                color: @primary-color;
            }
        }
        .richContent{
            margin-top: 15px;
            display: flex;
            >img{
                height: 120px;
                width: 200px;
                object-fit: cover;
                border-radius: 3px;
                margin-right: 15px;
                flex-shrink: 0;
            }
            >div{
                line-height: 30px;
                span{
                    color: @primary-color;
                    cursor: pointer;
                    &:hover{
                        color: @primary-hover-color;
                    }
                }
                &:hover{
                    color: #666;
                }
            }
        }
        .actions{
            margin-top: 15px;
            >ul{
                display: flex;
                justify-content: flex-end;
                >li{
                    display: flex;
                    align-items: center;
                    margin-left: 24px;
                    color: #7a8599;
                    >img{
                        height: 20px;
                        width: 20px;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
.SideBar{
    width: 325px;
    position: relative;
    .memberNews{
        padding: 0 15px;
        padding-bottom: 15px;
        >h3{
            height: 55px;
            display: flex;
            align-items: center;
            font-weight: 600;
            border-bottom: 1px solid #ddd;
            >img{
                height: 30px;
                margin-right: 3px;
            }
        }
        >ul{
            >li{
                display: flex;
                // align-items: center;
                margin-top: 15px;
                .areaName{
                    font-size: 12px;
                    flex-shrink: 0;
                    margin-right: 8px;
                    line-height: 26px;
                }
                .mainContent{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    &:hover{
                        color: @primary-color;
                    }
                }
            }
        }
    }
    .serviceStar{
        padding: 0 15px;
        padding-bottom: 15px;
        >h3{
            height: 55px;
            display: flex;
            align-items: center;
            font-weight: 600;
            border-bottom: 1px solid #ddd;
            >img{
                height: 30px;
                margin-right: 3px;
            }
            >span{
                font-size: 12px;
                color: #888;
                font-weight: normal;
            }
        }
        >ul{
            >li{
                margin-top: 15px;
                .wxUser{
                    display: flex;
                    position: relative;
                    align-items: center;
                    >img{
                        height: 35px;
                        width: 35px;
                        margin-right: 5px;
                    }
                    .username{

                    }
                    .areaname{
                        position: absolute;
                        right: 0;
                        font-size: 12px;
                        color: #888;
                    }
                }
                .mainContent{
                    margin-top: 5px;
                    padding-left: 40px;
                }
            }
        }
    }
}
</style>