
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
        },

    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    onCollisionEnter: function (other, self) {
        var me = this;
        cc.audioEngine.playEffect(me.scoreAudio);
        me.scoreLabel.string = "得分:" + (++cc.score);
        me.node.active = false;
    },
});
