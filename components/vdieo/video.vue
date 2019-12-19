<template>
    <div>
        <div class="drag_area"
             ref="move_div"
             :style="isTop ? topStyle :{top: top  + 'px', left: left  + 'px'} "
             @touchstart.stop.prevent="down"
             @touchmove.stop.prevent="move"
             @touchend.stop.prevent="end"
             @touchcancel="end">
            <video id="myVideo"
                   :src="src"
                   @ended="videoEnd"
                   :controls="false"
                   :show-progress="false"
                   :show-play-btn="false"
                   :show-center-play-btn="false"
                   :enable-progress-gesture="false"
                   webkit-playsinline="true"
                   x5-video-orientation="landscape|portrait"
                   x5-video-player-type="h5-page"
                   x5-playsinline
                   :style="isTop ? { width: '100%',height: '100vw'} : ''">
            </video>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            src: {
                type: String,
                default: ''
            },
            isTop: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                topStyle:{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vw',
                    zIndex: 9
                },
                flags: false,
                position: {x: 0, y: 0, left: 0, top: 0},
                top: 0,
                left: 0,
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
        },
        methods: {
            down () { // 拖动开始的操作
                this.flags = true
                const refs = this.$refs.move_div.getBoundingClientRect()
                let touch = event
                if (event.touches) {
                    touch = event.touches[0]
                }
                this.position.x = touch.clientX
                this.position.y = touch.clientY
                this.position.left = refs.left
                this.position.top = refs.top
            },
            move () { // 拖动中的操作
                // event.stopPropagation()
                if (this.flags) {
                    let touch = event
                    if (event.touches) {
                        touch = event.touches[0]
                    }
                    const xPum = this.position.left + touch.clientX - this.position.x
                    const yPum = this.position.top + touch.clientY - this.position.y
                    this.left = xPum
                    this.top = yPum
                    this.banOut()
                }
            },
            end () { // 拖动结束的操作
                this.flags = false
                this.banOut()
            },
            banOut () { // 避免拖动出界的限制
                const refs = this.$refs.move_div.getBoundingClientRect()
                if (this.left < 0) {
                    this.left = 0
                } else if (this.left > this.width - refs.width) {
                    this.left = this.width - refs.width
                }
                if (this.top < 0) {
                    this.top = 0
                } else if (this.top > this.height - refs.height) {
                    this.top = this.height - refs.height
                }
            },
            //  视频播放结束
            videoEnd(){
                this.$emit('videoEnd', true)
            },
        },
        created(){
          // this.top = this.height / 2.0
        },
    }
</script>

<style lang="scss" scoped>
    .drag_area{
        z-index: 99999999;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        height: 200upx;
        width: 350upx;
        video{
            height: 200upx;
            width: 350upx;
        }
    }
</style>
