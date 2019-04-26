<script>
import {MissLongContent} from '@/help/verification';
import Pagination from '@/components/pagination';
import loop from '@/directives/loop';
import { Question, Resident } from '@/api';
import { baseUrl } from '@/help/env';
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
            comunicateData: null,
            questions: [],
            hotQuestion: [],
        };
    },
    async created() {
        this.getData();
    },
    mounted() {},
    methods: {
        async getData() {
            const data = await Question.getQuestions({pageNo: 1, pageSize: 10});
            this.questions = data.datas;
            console.log(this.questions);
            for (const item of this.questions) {
                if (item.people.avatar) {
                    item.people.avatar = baseUrl + item.people.avatar.substring(6);
                }
                const adress = data.adress.find(result => {
                    return result.questionId === item.id;
                });
                if (adress) {
                    const data = adress.adress;
                    item.adress = data.province + '-' + data.city + '-' + data.community;
                }
            }
            this.questions.sort(this.compare('like'));
            const length = this.questions.length < 5 ? this.questions.length : 5;
            this.hotQuestion = [];
            for (let i = 0; i < length; i++) {
                const data = this.questions[i].adress.split('-');
                this.hotQuestion.push({
                    id: this.questions[i].id,
                    adress: data[0] + '-' + data[1],
                    title: this.questions[i].title
                });
            }
            this.total = data.total;
        },
        slideNext: function() {
            this.swiperS.slideNext();
        },
        compare(property) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            };
        },
        addLike(index) {
            Resident.addLike({questionId: this.questions[index].id}).then(result => {
                this.$message.success('操作成功');
                if (result.likeType === 1) {
                    this.questions[index].like++;
                } else this.questions[index].like--;
            });
        },
        addQuestion() {
            this.$prompt('请输入问题内容', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'textarea',
            }).then(({ value }) => {
                if (!value) {
                    return this.$message.warning('请输入内容');
                }
                Resident.addQuestion({title: value}).then(result => {
                    this.$message.success('提交成功');
                    this.getData();
                });
            });
        }
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
                            <span @click="addQuestion">提问</span>
                        </li>
                    </ul>
                </div>
                <div class="card questionItem" v-for="(item, index) in questions" :key="index">
                    <div class="authorInfo">
                        <img v-if="!item.people.avatar" src="/static/images/user_avatar.png">
                        <img v-else :src="item.people.avatar">
                        <div>
                            <span>{{item.people.name}}</span>
                            <span class="adress_info">{{item.adress}}</span>
                        </div>
                    </div>
                    <router-link tag="div" :to="{path: '/communications/detail/'+item.id}">
                        <div class="questionTitle">
                            {{item.title}}
                        </div>
                        <div class="richContent">
                            <div v-if="item.answers.length>0">
                                {{item.answers[0].content}}
                                <span> 查看更多 >></span>
                            </div>
                            <div v-else>
                                <span> 暂无回答 </span>
                            </div>
                        </div>
                    </router-link>
                    <div class="actions">
                        <ul>
                            <li @click="addLike(index)">
                                <img src="/static/images/dianzan.png">
                                {{item.like}} 个赞
                            </li>
                            <li>
                                <img src="/static/images/pingluen.png">
                                {{item.answers.length}} 条评论
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
                        <li v-for="(item, index) in hotQuestion" :key="index">
                            <router-link :to="{path:'/communications/detail/' + item.id}">
                                <div class="areaName">{{item.adress}}</div>
                                <div class="mainContent">
                                    {{item.title}}
                                </div>
                            </router-link>
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
                border-radius: 100%;
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
                a{
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
    }
}
</style>