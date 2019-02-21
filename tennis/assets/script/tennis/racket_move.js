
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
        var me = this;
        me.onDrag();//开启拖动监听
    },
    //添加拖动监听
    onDrag: function(){
        this.node.on('touchmove', this.dragMove, this);
    },
    //去掉拖动监听
    offDrag: function(){
        this.node.off('touchmove', this.dragMove, this);
    },
    //拖动
    dragMove: function(event){
        var locationv = event.getLocation();
        var location = this.node.parent.convertToNodeSpaceAR(locationv);
        this.node.setPosition(location);
    },

    start () {

    },

    update (dt) {

    },
});
