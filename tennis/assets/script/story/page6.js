
cc.Class({
    extends: cc.Component,

    properties: {
        //点击音效资源
        clickAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    geToGame: function () {
        cc.audioEngine.playEffect(this.clickAudio);
        cc.director.loadScene("tennis");
    },

    onLoad(){
        cc.isShow = false;
    }
});
