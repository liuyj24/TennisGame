
cc.Class({
    extends: cc.Component,

    properties: {
        //点击音效资源
        clickAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    geToPage1: function () {
        cc.audioEngine.playEffect(this.clickAudio);
        cc.director.loadScene("page1");
    },

    goToGame: function () {
        cc.audioEngine.playEffect(this.clickAudio);
        cc.director.loadScene("tennis");
    }

});
