
cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            default: null,
            type: cc.Node
        },

        //离子系统
        getScoreParticle: {
            default: null,
            type: cc.Node
        },

        //击球的声音资源
        hitAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();//获得碰撞检测系统
        manager.enabled = true;//开启碰撞检测系统
        this.ball.enabledContactListener = true;//开启碰撞监听
    },

    start () {

    },

    update (dt) {

    },

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        var me = this;

        //拿到离子系统
        var particle = this.getScoreParticle.getComponent(cc.ParticleSystem);
        me.getScoreParticle.setPosition({"x":self.world.aabb.x - 187.5, "y":self.world.aabb.y - 333.5});//移动离子系统的位置

        if (other.tag == 5){
            particle.resetSystem();//重启离子系统, 如果是外置资源直接start
        }else if (other.tag == 10) {
            me.showRight();
        }else if (other.tag == 20){
            me.showLeft();
        }else if(other.tag == 30){
            cc.audioEngine.playEffect(me.hitAudio);
        }
    },

    //切换到左边的游戏
    showLeft: function(){
        //先显示一个动画
        console.log("左: 展示了一个动画...")
        //跳到左边界
        cc.director.loadScene("left_play");
    },

    //切换到右边的游戏
    showRight: function(){
        //先显示一个动画
        console.log("右: 展示了一个动画...")
        //跳到左边界
        cc.director.loadScene("right_play");
    }

});
