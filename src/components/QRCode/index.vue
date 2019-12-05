<template>
    <div class="home-container">
        <div class="banner-box">
            <img :id="'imgQr'+imgindex"
                 src=""
                 alt="">
            <canvas style="display:none"
                    :id="'qrccode-canvas'+imgindex"></canvas>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcode'//二维码
var canvas = ''
export default {
    props: ['imgindex'],
    methods: {
        qrCreate (orderNum) {
            QRCode.toCanvas(canvas, orderNum, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    document.getElementById("imgQr" + this.imgindex).src = canvas.toDataURL();
                }
            });
        }
    },
    mounted () {
        canvas = document.getElementById('qrccode-canvas' + this.imgindex);
    }
}
</script>
<style>
</style>