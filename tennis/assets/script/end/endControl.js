
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

        //最终显示成绩的Label
        showScore: {
            default: null,
            type: cc.Label
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
        if (bg.x < -375){
            bg.x = bg.x + 375 * 2;
        }
    },

    //进入排行榜
    showRank: function(){
        cc.audioEngine.playEffect(this.clickAudio);
        //先提交分数, 预加载
        cc.director.preloadScene("RankingView", function () {
            let score = cc.score;
            if (CC_WECHATGAME) {
                window.wx.postMessage({
                    messageType: 1,
                    MAIN_MENU_NUM: "x1",
                    score: score,
                });
            } else {
                cc.log("提交得分: x1 : " + score)
            }
        });

        //切换场景
        cc.director.loadScene("RankingView");
    },

    //重新开始
    restart: function(){
        cc.audioEngine.playEffect(this.clickAudio);
        cc.score = "";
        cc.director.loadScene("begin");
    },

    onLoad () {
        var me = this;
        me.showScore.string = "最终得分 : " + cc.score;

        //提交得分
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
