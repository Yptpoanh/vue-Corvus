<!--
    也就是canvas有点意思
    TODO: 代码存在冗余
    TODO: canvas生成拼图位置应大于 一个自己的身为（避免出现 初始化出现 canvas1生成凹拼图和canvas2拼图重叠
    TODO: input[type=range] 太丑了
-->
<template>
    <div>
        <div style="height: 14vw;position: relative;width: 31.4vw;">
            <canvas id="canvas" width="80" height="60" ref="canvas"></canvas>
            <canvas :style="sliderCanvas" id="ellipseCanvas" width="80" height="60" ref="canvas" :v-model="sliderNumber"></canvas>
        </div>
        <input id="slider" type="range" min="0" :max="rangeMax" step="0" value="0" v-on:input="inputChange" @change="inputChanges"/>
    </div>
</template>

<script>
    let canvas;
    let ctx;
    var token;
    import imageUrl from "../../../static/web/logo/bee.png"
    import {uuid,towNumberMinusAbs} from "../../utils/comm"
    export default {
        name: "captcha",
        data() {
            return {
                width: '260',
                height: '116',
                img: [
                    require('../../../static/web/Captcha/ver-1.png'),
                    require('../../../static/web/Captcha/ver-2.png'),
                    require('../../../static/web/Captcha/ver-3.png'),
                ],
                RangXnumber:0,
                sliderCanvas: "",
                sliderNumber:0,
                rangeMax: 550,

            }
        },
        mounted() {
            this.initCanvas()
        },
        methods: {
            initCanvas() {
                this.puzzleBox()
                // this.BezierEllipse2();
            },
            RandomNum(Min, Max) {
                var Range = Max - Min;
                var Rand = Math.random();
                if (Math.round(Rand * Range) == 0) {
                    return Min + 1;
                } else if (Math.round(Rand * Max) == Max) {
                    return Max - 1;
                } else {
                    var num = Min + Math.round(Rand * Range) - 1;
                    return num;
                }
            },

            puzzleBox() {
                var img = new Image()
                let num = this.RandomNum(0,2)
                img.src = this.img[num]
                var that = this
                img.onload = function(){
                    that.commonCanvas("canvas",img,"c")
                }
            },
            commonCanvas(elId,img,type,RandX,RandY){
                var imgw = img.width;
                var imgh = img.height;
                RandX = RandX || Math.random() * (imgw - 50) ;
                this.RangXnumber = RandX;
                RandY = RandY || Math.random() * (imgh - 75) +20;
                this.sliderCanvas = "left:-"+RandX+"px"
                console.log(this.sliderCanvas)
                this.sliderNumber = RandX
                this.rangeMax = imgw - 50

                var ellipseCanvas = document.getElementById(elId);
                ellipseCanvas.width = imgw
                ellipseCanvas.height = imgh
                var ctx = ellipseCanvas.getContext("2d");

                if(type!="a"){
                    ctx.drawImage(img, 0, 0)
                }
                // 初始值
                // ctx.moveTo(0, 20);
                ctx.save();

                ctx.beginPath();

                ctx.moveTo(RandX, RandY);
                ctx.ellipse(RandX+25, RandY,3*Math.PI,4*Math.PI,0,1 * Math.PI,2 * Math.PI);
                ctx.lineTo(RandX+50, RandY);
                ctx.lineTo(RandX+50, RandY+17);
                ctx.ellipse(RandX+47, RandY+27,4*Math.PI,3*Math.PI,0 * Math.PI, 1.5 * Math.PI,0.45 * Math.PI,true);
                ctx.lineTo(RandX+50, RandY+55);
                ctx.lineTo(RandX, RandY+55);
                ctx.closePath();
                ctx.stroke();


                if(type=="a"){
                    ctx.shadowOffsetX = 5; // 阴影Y轴偏移
                    ctx.shadowOffsetY = -5; // 阴影X轴偏移
                    ctx.shadowBlur = 10; // 模糊尺寸
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色
                    var pattern = ctx.createPattern(img,"repeat")
                    var linearGrad = ctx.createLinearGradient(RandX+25, RandY+40, 50, 80);
                    linearGrad.addColorStop(0.0, '#000');    //第一个参数表示关键颜色的位置0表示起始位置,1表示终点位置,第二个参数表示关键颜色的颜色。
                    linearGrad.addColorStop(1.0, 'red');
                    ctx.fillStyle = linearGrad;
                    ctx.fillStyle = pattern;
                    ctx.fill();
                }else{

                    ctx.fillStyle = "rgb(0,0,0,0.5)";

                    ctx.fill();
                    this.commonCanvas("ellipseCanvas",img,"a",RandX,RandY)
                }

            },
            inputChange(event,value){
                // console.log(value)
                console.log(event.target.value)
                var sliderNumber = this.sliderNumber
                console.log(sliderNumber)
                this.sliderCanvas = "left:"+(event.target.value-sliderNumber)+"px"
                console.log(this.sliderCanvas)
                // this.sliderNumber = sliderNumber - event.target.value
            },
            inputChanges(event){
                if(towNumberMinusAbs(event.target.value,this.sliderNumber,3)){
                    console.log("生成Token："+uuid())
                    // event.target.value-sliderNumber
                    // if(())

                    this.$emit('tokenfunction', event);
                }else{
                    // TODO 返回拖动条
                }
            }

        },
        watch: {
        }
    }
</script>
<style scoped>
    canvas{
        position: absolute;
        left: 0;
    }
</style>

<style>

</style>