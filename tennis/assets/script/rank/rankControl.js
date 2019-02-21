
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

    update (dt) {
        var me = this;
        //控制背景轮换
        me.moveBg(me.bg0);
        me.moveBg(me.bg1);
    },

    //背景移动
    moveBg(bg){
        bg.x -= 1;
        if (bg.x < -720){
            bg.x = bg.x + 720 * 2;
        }
    },

    //返回游戏的首页
    returnToBegin(){
        cc.audioEngine.playEffect(this.clickAudio);
        cc.director.loadScene("begin");
    },

    //查看好友排行榜
    friendButtonFunc(event) {
        cc.audioEngine.playEffect(this.clickAudio);
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

    //提交自己的成绩
    submitScoreButtonFunc(){
        let score = cc.score;
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: "x1",
                score: score,
            });
        } else {
            // cc.log("提交得分: x1 : " + score)
        }
    },
});
