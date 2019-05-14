<template>
    <div>
        <div class="heard_banner">
            <div class="block">
                <el-carousel height="500px">
                    <el-carousel-item v-for="item in bannerData" :key="item">
                        <img class="banner_img" :src="item"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="system_desc">
            <div class="desc_text">
                <h1>人脸门禁</h1>
                <p>人脸门禁是一个创新型的门禁系统, 采用嵌入式的编程方式连接门禁, 带给用户极端的体验. 完善的管理系统实时检测门禁, 并汇总报告供管理员审查, 智能的信息系统定时检测人脸检测率以及定时更换人脸信息, 保证了识别的准确性, 为客户消除任何担忧.</p>
            </div>
            <div class="desc_image"></div>
            <div class="clear"></div>
        </div>
        <!-- <div class="open_type">
            <ul>
                <li class="type_item" v-for="item in 5" :key="item">
                    <img :src="'http://kaimen.geeku.top/images/index2/three0'+(item)+'.png'" alt="" />
                </li>
            </ul>
            <div class="clear"></div>
        </div> -->
        <div class="visitor_box">
            <img src="/static/images/eight_banner2.png" alt="">
        </div>
        <div class="visitor_box">
            <img src="/static/images/five_banner.jpg" alt="">
        </div>
        <div class="effect_box">
            <ul>
                <li v-for="(item, index) in effectData" :key="index">
                    <img :src="item.img" alt="">
                    <div>
                        <h3>{{item.title}}</h3>
                        <p>{{item.content}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            bannerData: [
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522477500893&di=6706f5b34ff751a2d4b8cece85a937f9&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01164155448e950000019ae95d8b93.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522477444879&di=750ab4978181a8352eb2747ef3a2989c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011c93588449f8a801219c775166e2.jpg",
                // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523072239&di=15cb698204107f9b696e13ce55b6ce8a&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f06d589be1b0a8012060c8beb430.jpg%402o.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522477520229&di=5b6236a4996d285b539310758d25627f&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F00%2F69%2F40%2Fad1ec9813fa678f4ade69ab4fbaccbce.jpg"
            ],
            effectData: [
                {
                    img: 'http://kaimen.geeku.top/images/index2/nine_icon_01.png',
                    title: '权限管理',
                    content: '对通道进出权限实现有效管理，身份识别，拦截无身份访问者',
                },
                {
                    img: 'http://kaimen.geeku.top/images/index2/nine_icon_02.png',
                    title: '门禁实时监控',
                    content: '查看每个门禁人员进出情况、每个门禁的状态（包括门的开关，各种非正常状态报警等）；也可以在紧急状态打开或关闭所有的门禁',
                },
                {
                    img: 'http://kaimen.geeku.top/images/index2/nine_icon_03.png',
                    title: '出入记录查询功能',
                    content: '后台系统储存所有的进出记录、状态记录，可按不同的查询条件查询',
                },
                {
                    img: 'http://kaimen.geeku.top/images/index2/nine_icon_06.png',
                    title: '故障预警',
                    content: '在门禁出现故障时自动向管理人员发送预警信息，也可手动对所有门禁进行监测',
                },
            ]
        };
    },
    created() {

    }
};

</script>
<style lang="less">
img {
    max-width: 100%;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 500px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.heard_banner{
    margin-top: 1px;
    .banner_img{
        width: 100%;
        height: 100%;
    }
}
.system_desc{
    width: 1080px;
    margin: 100px auto;
    .desc_text{
        float: left;
        width: 500px;
        height: 200px;
        h1{
            font-size: 25px;
            font-weight: bold;
            letter-spacing: 2px;
            padding-bottom: 1rem;
        }
        p{
            line-height: 1.6;
            font-size: 1.2rem;
        }
    }
    .desc_image{
        width: 407px;
        height: 220px;
        float: right;
        background: url("/static/images/right_img.png") no-repeat center center;
        background-size: contain;
    }
}
.open_type{
    width: 1080px;
    margin: 100px auto 50px auto;
    height: 367px;
    .type_item{
        float: left;
        margin-right: 19px;
        img{
            width: 200px;
            height: 367px;
        }
    }
    .type_item:last-child{
        margin-right: 0px;
    }
}
.effect_box{
    width: 900px;
    margin: 100px auto;
    li{
        height: 120px;
        div{
            float: left;
            width: 780px;
            margin-left: 20px;
            h3{
                font-size: 27px;
                color: #1c95d4;
                padding-top: 15px;
            }
            p{
                font-size: 17px;
                color: #333;
            }
        }
        img{
            width: 100px;
            height: 100px;
            float: left;
        }
    }
}
</style>
