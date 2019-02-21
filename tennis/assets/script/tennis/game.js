
cc.Class({
    extends: cc.Component,

    properties: {

        //得分
        score: {
            default: null,
            type: cc.Label
        },
        leftGame: false,
        rightGame: false,
        leftTime: 0,
        rightTime: 0,
    },


    onLoad () {
        var me = this;
        //开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //开启碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        //把得分设置为全局变量
        if (cc.getInTennisSenceTime == undefined || cc.getInTennisSenceTime == null || cc.getInTennisSenceTime == ""){
            cc.getInTennisSenceTime = 0;
        }
        cc.getInTennisSenceTime++;

    },

    start () {

    },

    update (dt) {
    },
});

module.exports = {
    leftGame: false,
    rightGame: false,
    leftTime: 0,
    rightTime: 0,
};
