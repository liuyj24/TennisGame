
cc.Class({
    extends: cc.Component,

    properties: {
        //点击音效资源
        clickAudio: {
            default: null,
            type: cc.AudioClip
        },
    },


    geToPage3: function () {
        cc.audioEngine.playEffect(this.clickAudio);
        cc.director.loadScene("page3");
    },
});
