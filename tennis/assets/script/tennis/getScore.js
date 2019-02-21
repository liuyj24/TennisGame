

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label
        },

        //得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    onCollisionEnter: function (other, self) {
        var me = this;
        me.scoreLabel.string = "得分:" + (++cc.score);
        cc.audioEngine.playEffect(me.scoreAudio);
    },
});
