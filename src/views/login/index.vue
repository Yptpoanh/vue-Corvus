<template>
    <div class="outsideDiv " >
        <el-image
                style=""
                :src="images.backgroundImage"
                class="backgroundImage"
                fit="cover"></el-image>
        <div class="fromstyle">
            <el-card class="box-card card-background " :style="cardBackground" >
                <div >
                    <el-image :src="images.logo" style="width:22vh;"></el-image>
                </div>
                <div class="container">
                    <div class="flip" :style="flipStyle">
                        <el-card class="box-card back" :style="captchaStyle">
                            <Captcha  :v-model="false" :tokenfunction="tokenfunction"></Captcha>
                        </el-card>
                        <div class="card-inside-nameAndLogo front" :style="fromShow">
                            <el-card class="box-card card-inside" :class="[PcOrMobile==true?'1':'0']">
                                <el-form :label-position="top" label-width="80px" :model="sizeForm">
                                    <el-form-item label="账号">
                                        <el-input v-model="sizeForm.loginname"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码">
                                        <el-input v-model="sizeForm.password"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" style="" @click="onSubmit">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-card>
                        </div>
                    </div>
                </div>

            </el-card>
        </div>
    </div>
</template>

<script>
    import { login } from "@/api/api.js"; //引入login
    import Captcha from "../../components/CAPTCHA/Captcha";
    export default {
        components: {
            Captcha
        },
        data() {
            return {
                sizeForm: {
                    loginname: '',
                    password: '',
                },
                captchaStyle:"background: #f2ece1;",//z-index:999;display: none;
                PcOrMobile:false,
                fromShow: "",
                flipStyle:"",
                images: {
                    backgroundImage: require('../../../static/web/login/background-01.jpg'),
                    logo: require('../../../static/web/logo/bee.png')
                },
                cardBackground: {
                },
            };
        },
        beforeCreate() {
            console.log("创建")
        },
        mounted() {
            if (this._isMobile()) {
                // alert("手机端");
                // this.$router.replace('/m_index');
                this.cardBackground.width = "80vw"
                this.PcOrMobile = true;
            } else {
                // alert("pc端");
                // this.$router.replace('/pc_index');
                this.PcOrMobile = false;
            }
        },
        methods: {
            _isMobile() {
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
                return flag;
            },
            onSubmit() {
                this.flipStyle = "transform:rotateY(180deg);"
                // console.log(formData)
            },
            tokenfunction(res){
                let formData = JSON.stringify(this.sizeForm);
                /**
                 * @oarma {Object} login 接口传递的参数
                 */
                login(formData)
                    .then(res => {
                        //成功之后要做的事情
                        console.log(res)
                    })
                    .catch(err => {
                        //出错时要做的事情
                        console.log(err)
                        console.log("here")

                    });
                // console.log('submit!');
            }
        }
    };
</script>

<style lang="less" scoped>
    .outsideDiv{
        margin: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        position: relative;
        padding:1px;
        box-sizing:border-box;
        z-index:1;
        align-items: center;
        .fromstyle{
            width:auto;
            z-index: 1;
        }
    }
    .backgroundImage{
        width: 100vw;
        height: 100vh;
        position: absolute;
        margin: 0;
        top: 0;
        right: 0;
    }
    .card-background{
        display: flex;
        justify-content: flex-end;
        background: linear-gradient(45deg, #5a3694 0%, #13bdce 33%, #0094d9 66%, #6fc7b5 100%);
        background-size: 400%;
        background-position: 0% 100%;
        animation: gradient 20s ease-in-out infinite;
    }
    @keyframes gradient{
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    .card-inside{
        flex: 1;
        margin: 0;
    }
    .card-inside-nameAndLogo{
        flex:1;
    }
    .container,.front,.back{width:380px;height:270px;}
    .flip{position:relative;}
    .front,.back{position:absolute;top: 0px;left: 0px;height: auto;}
    .container{perspective:1000px;transform-style:preserve-3d;}
    .container,.front,.back{width:380px;height:270px;}
    .flip{position:relative;transition:0.6s;transform-style:preserve-3d;}
    .front,.back{position:absolute;top: 0px;left: 0px;backface-visibility:hidden;}
    .front{z-index:2;}
    .back{transform:rotateY(-180deg);height: auto;display: flex;justify-self: center;align-items: center;}
    /*.container:hover .flip{transform:rotateY(180deg);}*/
</style>

<style>

    .flip-diagonal-1-bl{-webkit-animation:flip-diagonal-1-bl .4s cubic-bezier(.455,.03,.515,.955) both;animation:flip-diagonal-1-bl .4s cubic-bezier(.455,.03,.515,.955) both}
    @-webkit-keyframes flip-diagonal-1-bl{0%{-webkit-transform:rotate3d(1,1,0,0deg);transform:rotate3d(1,1,0,0deg)}100%{-webkit-transform:rotate3d(1,1,0,-180deg);transform:rotate3d(1,1,0,-180deg)}}@keyframes flip-diagonal-1-bl{0%{-webkit-transform:rotate3d(1,1,0,0deg);transform:rotate3d(1,1,0,0deg)}100%{-webkit-transform:rotate3d(1,1,0,-180deg);transform:rotate3d(1,1,0,-180deg)}}

    .slide-rotate-hor-top{-webkit-animation:slide-rotate-hor-top .5s cubic-bezier(.25,.46,.45,.94) both;animation:slide-rotate-hor-top .5s cubic-bezier(.25,.46,.45,.94) both}
    @-webkit-keyframes flip-diagonal-1-bl{0%{-webkit-transform:rotate3d(1,1,0,0deg);transform:rotate3d(1,1,0,0deg)}100%{-webkit-transform:rotate3d(1,1,0,-180deg);transform:rotate3d(1,1,0,-180deg)}}@keyframes flip-diagonal-1-bl{0%{-webkit-transform:rotate3d(1,1,0,0deg);transform:rotate3d(1,1,0,0deg)}100%{-webkit-transform:rotate3d(1,1,0,-180deg);transform:rotate3d(1,1,0,-180deg)}}

    .swing-out-top-bck{-webkit-animation:swing-out-top-bck .45s cubic-bezier(.6,-.28,.735,.045) both;animation:swing-out-top-bck .45s cubic-bezier(.6,-.28,.735,.045) both}
    @-webkit-keyframes swing-out-top-bck{0%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);-webkit-transform-origin:top;transform-origin:top;opacity:1}100%{-webkit-transform:rotateX(-100deg);transform:rotateX(-100deg);-webkit-transform-origin:top;transform-origin:top;opacity:0}}@keyframes swing-out-top-bck{0%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);-webkit-transform-origin:top;transform-origin:top;opacity:1}100%{-webkit-transform:rotateX(-100deg);transform:rotateX(-100deg);-webkit-transform-origin:top;transform-origin:top;opacity:0}}

    .bg-pan-left{-webkit-animation:bg-pan-left 8s both;animation:bg-pan-left 8s both}
    @-webkit-keyframes bg-pan-left{0%{background-position:100% 50%}100%{background-position:0 50%}}@keyframes bg-pan-left{0%{background-position:100% 50%}100%{background-position:0 50%}}

</style>