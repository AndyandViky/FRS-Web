<script>
import Pagination from '@/components/pagination';
export default {
    name: '',
    components: {
        'v-pagination': Pagination
    },
    directives: {
    },
    data() {
        return {
        };
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>
<template>
    <div class="communications_detail_container">
        <div class="top">
            <div class="container">
                <div class="authorInfo">
                    <img src="/static/images/user_avatar.png">
                    <div>爱吃菜的小女孩</div>
                </div>
                <div class="questionTitle">
                    光线变化对识别效果影响大吗？
                </div>
            </div>
        </div>
        <div class="mainWrapper">
            <div class="container wrapperContainer">
                <div class="wrapper_left">
                    <div class="AnswerInput card">
                        <div class="userInfo">
                            <img src="/static/images/user_avatar.png">
                            <div>andy</div>
                            <div class="button">提交</div>
                        </div>
                        <div class="inputArea">
                            <textarea placeholder="输入回答..."></textarea>
                        </div>
                    </div>
                    <div class="AnswerList card">
                        <div class="listTop">
                            <div>1 个回答</div>
                        </div>
                        <div class="listItem" v-for="i in 1">
                            <div class="authorInfo">
                                <img src="/static/images/a.jpg">
                                <div>小杨</div>
                                <div class="time">
                                    2018-4-10
                                </div>
                            </div>
                            <div class="questionTitle">
                                我觉得影响是肯定有的, 具体影响多少应该看光的强度, 毕竟人脸识别不是百分百准确, 不过正常的通行肯定能保证.
                            </div>
                        </div>
                        <v-pagination :total="1"></v-pagination>
                    </div>
                </div>
                <div class="wrapper_right">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.top{
    width: 100%;
    background-color: #fff;
    padding: 20px 0;
    box-shadow: 0 1px 3px 0 rgba(0,37,55,.1);
    .container{
        overflow: hidden;
        .authorInfo{
            display: flex;
            align-items: center;
            font-weight: 600;
            >img{
                height: 50px;
                width: 50px;
                margin-right: 10px;
                border-radius: 100%;
            }
        }
        .questionTitle{
            margin-top: 15px;
            font-size: 20px;
            font-weight: 600;
        }
    }
}
.mainWrapper{
    background-color: #f5f5f5;
    min-height: 600px;
    padding-top: 15px;
    padding-bottom: 30px;
    .wrapperContainer{
        display: flex;
        .wrapper_left{
            // width: 1180px;
            width: 840px;
            margin-right: 15px;
            .AnswerInput{
                padding: 20px;
                .userInfo{
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    position: relative;
                    >img{
                        height: 50px;
                        width: 50px;
                        margin-right: 10px;
                    }
                    .button{
                        position: absolute;
                        right: 0;
                    }
                }
                .inputArea{
                    margin-top: 15px;
                    >textarea{
                        width: 100%;
                        resize: none;
                        padding: 10px;
                        height: 150px;
                        &:focus{
                            outline: none;
                        }
                    }
                }
            }
            .AnswerList{
                padding: 20px;
                .listTop{
                    padding-bottom: 10px;
                    font-size: 18px;
                    font-weight: 600;
                    border-bottom: 1px solid #ddd;
                }
                .listItem{
                    margin-top: 20px;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 20px;
                    .authorInfo{
                        display: flex;
                        align-items: center;
                        font-weight: 600;
                        margin-top: 20px;
                        color: #888;
                        position: relative;
                        >img{
                            height: 50px;
                            width: 50px;
                            margin-right: 10px;
                            border-radius: 100%;
                        }
                        .time{
                            position: absolute;
                            right: 0;
                            font-weight: lighter;
                            color: #aaa;
                        }
                    }
                    .questionTitle{
                        margin-top: 15px;
                        font-weight: 600;
                    }
                }
            }
        }
        .wrapper_right{
            // width: 325px;
        }
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
</style>