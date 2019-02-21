var game = require("game");

cc.Class({
    extends: cc.Component,

    properties: {
        //两张背景用于轮流切换
        bg0: {
            default: null,
            type: cc.Node
        },
        bg1: {
            default: null,
            type: cc.Node
        },

        //点击音效资源
        clickAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    onLoad(){
        //设置是否要加载动画的标志
        if (cc.isShow != false){
            cc.isShow = true;
        }
    },

    start(){
        //预先加载一次排行榜, 拿到用户头像图片
        if (CC_WECHATGAME) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: 0,
                MAIN_MENU_NUM: "x1"
            });
        } else {
            // cc.log("获取好友排行榜数据: x1");
        }
    },

    update (dt) {
        var me = this;
        //控制背景轮换
        me.moveBg(me.bg0);
        me.moveBg(me.bg1);
    },

    //背景移动
    moveBg(bg){
        bg.x -= 1;
        if (bg.x < -375){
            bg.x = bg.x + 375 * 2;
        }
    },
    //开始游戏
    startGame: function(){
        cc.audioEngine.playEffect(this.clickAudio);
        cc.score = 0;//清空计分
        game.leftTime = 0;//清空两边游戏的计数器
        game.rightTime = 0;
        //判断是否要加载动画
        if (cc.isShow){
            cc.director.loadScene("page0");
        }
        cc.director.loadScene("tennis");
    },
});
