var game = require("game");

cc.Class({
    extends: cc.Component,

    properties: {
        //整个移动的个体
        hero: {
            default: null,
            type: cc.Node
        },
        //玩家的小人
        heroBody: {
            default: null,
            type: cc.Node
        },
        //两张背景用于轮流切换
        bg0: {
            default: null,
            type: cc.Node
        },
        bg1: {
            default: null,
            type: cc.Node
        },

        //两条管子轮流切换
        pipe0: {
            default: null,
            type: cc.Node
        },
        pipe1: {
            default: null,
            type: cc.Node
        },

        //点击音效资源
        clickAudio: {
            default: null,
            type: cc.AudioClip
        },

        speed: 0,//小人下降的速度
        time: 0,
    },

    onLoad () {
        //开启碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        //开启游戏
        game.rightGame = true;
    },

    start () {
        var me = this;
        game.rightTime++;
        me.pipeCount = game.rightTime * 5;//管子的数量
        me.time = 0;
    },

    update (dt) {
        var me = this;

        //判断游戏是否进行
        if (!game.rightGame){
            return;
        }

        //控制小人下落
        me.speed -= 0.17;//每一帧下降的速度都减0.1, 模拟重力
        me.hero.y += me.speed;

        //控制背景轮换
        //背景图移动
        me.moveBg(me.bg0);
        me.moveBg(me.bg1);

        //管子移动
        me.ball0 = me.pipe0.getChildByName("ball0");
        me.ball1 = me.pipe1.getChildByName("ball1");
        me.movePipe(me.pipe0, me.ball0);
        me.movePipe(me.pipe1, me.ball1);

        //调整小人的角度
        me.heroBody.rotation = - this.speed * 5;
    },

    //手指点击后让小人起飞一段距离
    onButtonClick(){
        cc.audioEngine.playEffect(this.clickAudio);
        this.speed = 4.5;
    },

    //背景移动
    moveBg(bg){
        bg.x += 1;
        if (bg.x > 375){
            bg.x = bg.x - 375 * 2;
        }
    },

    //移动管子
    movePipe(pipe, ball){
        var me = this;
        pipe.x += 3;
        if (pipe.x > 187.5 + 26 && me.time < me.pipeCount / 2){//187.5是屏幕宽度的一般, 26是管子宽度的一半, 这个时候管子恰好整个移出屏幕
            pipe.x = pipe.x - 375 - 52;

            pipe.y = 125 - (Math.random() * 250);//从-50~50

            //每移动一次记录管子的数量加1
            me.time++;

            //把消失的球球显示出来
            ball.active = true;
        }
        if (me.time >= me.pipeCount / 2){
            cc.director.loadScene("tennis");
        }
    },

});
