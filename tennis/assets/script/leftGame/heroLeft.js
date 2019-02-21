var game = require("game");

cc.Class({
    extends: cc.Component,

    properties: {
        //离子系统
        getScoreParticle: {
            default: null,
            type: cc.Node
        },
    },


    start () {
    },

    onCollisionEnter: function (other, self) {
        var me = this;
        if (other.tag != 4 && other.tag != 8){
            game.leftGame = false;
            cc.director.loadScene("end");
        }

        //拿到离子系统
        var particle = this.getScoreParticle.getComponent(cc.ParticleSystem);
        me.getScoreParticle.setPosition({"x":self.world.aabb.x - 167.5, "y":self.world.aabb.y - 313.5});
        particle.resetSystem();//重启离子系统
    },

});
