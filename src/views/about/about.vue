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
					<h1>人脸门禁系统</h1>
					<h2>小区智能人脸门禁的首选</h2>
					<p>
						快速自动识别，高效率通行。<br/>
						具有机器学习能力，识别率高。
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
					<h1>人脸识别</h1>
					<h2>Face Recognition</h2>
					<p>
						人脸识别，是基于人的脸部特征信息进行身份识别的一种生物识别技术。用摄像机或摄像头采集含有人脸的图像或视频流，并自动在图像中检测和跟踪人脸，进而对检测到的人脸进行脸部的一系列相关技术，通常也叫做人像识别、面部识别。
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
					<h1>系统介绍</h1>
					<p>
						人脸识别系统是基于b/s, c/s 架构开发，主要目的在于高速准确的识别人脸信息，做到不停顿式的开门体验，项目主要围绕高速，准确两词下手，当然在界面以及服务功能上同样是非常贴合用户习惯的。在做到核心部分后再依次向外扩展，增加系统的多样新，给用户一个良好的体验，完善的故障上报系统也可以让用户感到放心。
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
					<h1>系统目标</h1>
					<p>
						1. 快速自动识别人脸<br/>
						2. 具有机器学习能力<br/>
						3. 实现系统高效管理<br/>
						4. PC端和移动端共同服务<br/>
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