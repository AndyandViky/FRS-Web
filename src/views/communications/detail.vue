<script>
import { mapState, mapActions } from 'vuex';
import Pagination from '@/components/pagination';
import { Question, Resident } from '@/api';
import { baseUrl } from '@/help/env';
export default {
    name: '',
    components: {
        'v-pagination': Pagination
    },
    computed: {
        ...mapState([
            'user'
        ]),
    },
    data() {
        return {
            question: {},
            answerContent: '',
        };
    },
    async created() {
        const id = this.$route.params.id;
        this.question = await Question.getQuestion({questionId: id});
        if (this.question.question.people.avatar) {
            this.question.question.people.avatar = baseUrl + this.question.question.people.avatar.substring(6);
        }
        for (const item of this.question.answers) {
            if (item.people.avatar) {
                item.people.avatar = baseUrl + item.people.avatar.substring(6);
            }
        }
    },
    mounted() {},
    methods: {
        addAnswer() {
            if (this.$store.getters.user.types < 2) {
                return this.$message.warning('您不是业主. 暂无法提交答案');
            }
            if (this.answerContent === '') {
                return this.$message.warning('请输入回答内容');
            }
            Resident.addAnswer({
                content: this.answerContent,
                question_id: this.$route.params.id,
            }).then(result => {
                this.answerContent = '';
                return this.$message.success('提交成功');
            });
        }
    }
};
</script>
<template>
    <div class="communications_detail_container">
        <div class="top">
            <div class="container" v-if="question.question">
                <div class="authorInfo">
                    <img v-if="!question.question.people.avatar" src="/static/images/user_avatar.png">
                    <img v-else :src="question.question.people.avatar">
                    <div>{{question.question.people.name}}</div>
                </div>
                <div class="questionTitle">
                    {{question.question.title}}
                </div>
            </div>
        </div>
        <div class="mainWrapper">
            <div class="container wrapperContainer">
                <div class="wrapper_left">
                    <div class="AnswerInput card">
                        <div class="userInfo">
                            <img v-if="!user.avatar" src="/static/images/user_avatar.png">
                            <img v-else :src="user.avatar">
                            <div>{{user.name}}</div>
                            <div class="button" @click="addAnswer">提交</div>
                        </div>
                        <div class="inputArea">
                            <textarea placeholder="输入回答..." v-model="answerContent"></textarea>
                        </div>
                    </div>
                    <div class="AnswerList card" v-if="question.answers">
                        <div class="listTop">
                            <div>{{question.answers.length}} 个回答</div>
                        </div>
                        <div class="listItem" v-for="item in question.answers">
                            <div class="authorInfo">
                                <img v-if="!item.people.avatar" src="/static/images/user_avatar.png">
                                <img v-else :src="item.people.avatar">
                                <div>{{item.people.name}}</div>
                                <div class="time">
                                    {{item.created_at.substring(0, 10)}}
                                </div>
                            </div>
                            <div class="questionTitle">
                                {{item.content}}
                            </div>
                        </div>
                        <v-pagination v-if="question" :total="question.total"></v-pagination>
                    </div>
                </div>
                <div class="wrapper_right">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.communications_detail_container{
    min-height: 800px;
}
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
                        border-radius: 100%;
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