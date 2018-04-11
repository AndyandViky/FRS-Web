<script>
import { DateFormat } from '@/help/verification';
export default {
    name: 'pagination',
    // props: ['sum', 'current', "pagegroup"],
    props: {
        total: {
            type: Number,
            default: 200,
        },
        display: {            // 每页显示条数
            type: Number,
            default: 10
        },
        currentPage: {            // 当前页码
            type: Number,
            default: 1
        },
        pagegroup: {        // 分页条数 -- 奇数
            type: Number,
            default: 5,
        }
    },
    data() {
        return {
        };
    },
    computed: {
        page: function() { // 总页数
            return Math.ceil(this.total / this.display);
        },
        current: function() {
            if (this.currentPage < 1) {
                return 1;
            } else if (this.currentPage > this.page) {
                return this.page;
            }
            return this.currentPage;
        },
        grouplist: function() {
            let ins = 1;
            let list = [this.current];
            const len = this.page;
            let i = 1;
            while (ins < this.pagegroup) {
                let curLeft = this.current - i;
                let curRight = this.current + i;
                if (curLeft >= 1) {
                    list.unshift(curLeft);
                    ins++;
                }
                if (curRight <= len) {
                    list.push(curRight);
                    ins++;
                }
                if (!(curLeft >= 1 || curRight <= len)) {
                    break;
                }
                i++;
            }
            return list;
        }
    },
    methods: {
        goto: function(page) {
            if (page < 1 || page > this.page || page === this.current) {
                return "";
            }
            this.$emit("goto", page);
        },
    }
};

</script>
<template>
    <div class="container pagination">
        <div data-am-smooth-scroll="{position: 500, speed: 500}" :class="{'disable':current == 1}" class=" page-button" @click="goto(1)">首页</div>
        <div data-am-smooth-scroll="{position: 500, speed: 500}" :class="{'disable':current == 1}" class=" page-button"  @click="goto(current-1)">上一页</div>
        <ul class="">
            <li data-am-smooth-scroll="{position: 500, speed: 500}"  :class="{'active':page === current}"  class=" page" v-for = "page in grouplist" @click="goto(page)">
                {{page}}
            </li>
            <div class="clear"></div>
        </ul>
        <div data-am-smooth-scroll="{position: 500, speed: 500}" :class="{'disable':current == page}" class=" page-button" @click="goto(current+1)">下一页</div>
        <div data-am-smooth-scroll="{position: 500, speed: 500}" :class="{'disable':current == page}" class=" page-button" @click="goto(page)">尾页</div>
        <div class="clear"></div>
    </div>
</template>
<style lang="less" scoped>
.pagination{
    margin: 30px auto;
    font-size: @sixth-size;
    text-align: center;
    width: 100%;
    *{
        display: inline-block;
    }
}

.page-button{
    height: 32px;
    margin:0 5px;
    line-height: 32px;
    cursor: pointer;
    color: @second-color;
}
.page-button.disable{
    color: @fifth-color;
}
.page{
    height: 32px;
    width: 32px;
    line-height: 32px;
    color: @second-color;
    cursor: pointer;
    border-radius: 16px;
    text-align: center;
    margin: 0 10px;
}
.page:hover{
    background-color: @primary-shadow-color;
}
.page.active{
    background-color: @primary-color;
    color: white;
}
</style>
