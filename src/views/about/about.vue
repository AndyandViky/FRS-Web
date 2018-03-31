<script>
export default {
    name: 'about',
    data() {
        return {
        };
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<template>
	<div class="about_container">
		<div class="row">
			<div class="bg">
				<img src="/static/images/about.jpg">
			</div>
			<div class="container">
				<div class="row_left">
					<h1>车载视频联盟</h1>
					<h2>快速投放公交广告的首选</h2>
					<p>
						公交广告低成本，高回报。<br/>
						受众群体稳定，硬广告，硬实力。
					</p>
				</div>
				<div class="row_right"></div>
			</div>
		</div>
		<div class="row">
			<div class="bg">
				<img src="/static/images/about2.jpg">
			</div>
			<div class="container">
				<div class="row_left">
				</div>
				<div class="row_right">
					<h1>联盟介绍</h1>
					<h2>Vehicle Broadcasting Union</h2>
					<p>
						2017年11月3-4日，来自全国24个省、61个城市（单位）、96位公交车载视频经营者代表相聚浙江绍兴，召开了第一届车载视频全国发展联盟大会，并于2017年11月16日，注册成立浙江全联视听科技有限公司为运营公司，联盟成员签约组建形成了“统一视频运营、统一质量管理”的横向联合“车载视频联播共享平台”。
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="bg">
				<img src="/static/images/about3.jpg">
			</div>
			<div class="container">
				<div class="row_left">
					<h1>联盟章程</h1>
					<p>
						联盟全称为“中国车载视频发展联盟”（以下简称“联盟”）。英文翻译为China Vehicle Broadcasting Development Union（缩写“VBDU”）。<br/>
						联盟性质是全国省级和地市级以下城市车载视频经营者为主体自愿参加的联合经营管理机构。<br/>
						联盟章程经2017年11月03日联盟成员代表大会表决通过。
					</p>
				</div>
				<div class="row_right"></div>
			</div>
		</div>
		<div class="row">
			<div class="bg">
				<img src="/static/images/about4.jpg">
			</div>
			<div class="container">
				<div class="row_left">
				</div>
				<div class="row_right">
					<h1>组织架构</h1>
					<p>
						联盟设立会长单位1家，副会长单位6家，常务理事若干，理事单位若干，秘书长1名，负责牵头和执行联盟工作。<br/>
						联盟成员代表大会由会长单位主持，或者委托秘书长主持。
					</p>
				</div>
			</div>
		</div>
		<div class="call-us">
			<h1>联系我们</h1>
			<div class="container">
				<ul>
					<dl>咨询热线</dl>
					<li>
						总部地址：......
					</li>
					<li>
						联盟秘书：......
					</li>
					<li>
						联系电话：00000000000
					</li>
				</ul>
				<div class="adv-phone">
					<h2>问题咨询专线</h2>
					<img src="/static/images/aboutphone.png">
					<div class="phone">000-000-0000</div>
				</div>
				<div class="tousu-phone adv-phone">
					<h2>投诉专线</h2>
					<img src="/static/images/aboutphone.png">
					<div class="phone">000-000-0000</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.row{
	width: 100%;
	height: 550px;
	position: relative;
	.bg{
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		>img{
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
	.container{
		display: flex;
		height: 100%;
		.row_left{
			width: 50%;
			flex-shrink: 0;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-right: 150px;
			>h1,>h2{
				font-size: 36px;
				line-height: 1.5;
				font-weight: 100;
			}
			>h2{
				font-size: 32px;
			}
			>p{
				font-size: 16px;
				line-height: 2;
				padding: 20px 0;
			}
			.button{
				width: 180px;
				height: 60px;
				line-height: 60px;
				border-radius: 0;
				margin-top: 20px;
				font-size: 18px;
			}
			>a{
				color: @primary-color;
			}
		}
		.row_right{
			width: 50%;
			flex-shrink: 0;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 180px;
			>h1,>h2{
				font-size: 36px;
				line-height: 1.5;
				font-weight: 100;
			}
			>h2{
				font-size: 32px;
			}
			>p{
				color: #555;
				font-size: 16px;
				line-height: 2;
				padding: 20px 0;
			}
			>a{
				color: @primary-color;
			}
			.button{
				width: 180px;
				height: 60px;
				line-height: 60px;
				border-radius: 0;
				margin-top: 20px;
				font-size: 18px;
			}
		}
	}
}
.row:nth-child(2){
	.row_right{
		color: #fff;
		>p{
			color: #aaa;
		}
	}
}
.call-us{
	background-color: #eaeaea;
	padding-bottom: 80px;
	overflow: hidden;
	>h1{
		width: 100%;
		text-align: center;
		line-height: 3;
		font-size: 30px;
		margin-bottom: 50px;
		margin-top: 30px;
	}
	.container{
		display: flex;
		// padding: 0 100px;
		>ul{
			width: 40%;
			flex-shrink: 0;
			>dl{
				font-size: 20px;
				line-height: 2;
				margin-bottom: 30px;
			}
			>li{
				font-size: 18px;
				line-height: 2.5;
			}
		}
		.adv-phone{
			width: 30%;
			text-align: center;
			>h2{
				font-size: 20px;
				margin-bottom: 20px;
			}
			>img{
				height: 80px;
			}
			.phone{
				font-size: 42px;
				color: @primary-color;
			}
		}
	}
}
</style>