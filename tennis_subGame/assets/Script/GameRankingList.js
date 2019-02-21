cc.Class({
    extends: cc.Component,

    properties: {
        rankingScrollView: cc.ScrollView,   //显示排名的窗口
        scrollViewContent: cc.Node,         //显示排名的窗口
        prefabRankItem: cc.Prefab,          //排名条目的预加载资源
        loadingLabel: cc.Node,//加载文字
    },

    start() {
        this.removeChild();
        this.CC_WECHATGAME = true;
        if (this.CC_WECHATGAME) {
            window.wx.onMessage(data => {
                cc.log("接收主域发来消息：", data)
                if (data.messageType == 0) {
                    //获取好友排行榜
                    this.fetchFriendData(data.MAIN_MENU_NUM);

                } else if (data.messageType == 1) {
                    //提交得分
                    this.submitScore(data.MAIN_MENU_NUM, data.score);
                }
            });
        } else {
            this.fetchFriendData(1000);
        }
    },

    //提交得分
    submitScore(MAIN_MENU_NUM, score) { //提交得分
        if (this.CC_WECHATGAME) {
            window.wx.getUserCloudStorage({
                // 以key/value形式存储
                keyList: [MAIN_MENU_NUM],
                success: function (getres) {
                    console.log('getUserCloudStorage', 'success', getres);
                    if (getres.KVDataList.length != 0) {
                        if (getres.KVDataList[0].value > score) {//应该是如果分数比之前的最高分低就不提交
                            return;
                        }
                    }

                    // 对用户托管数据进行写数据操作
                    window.wx.setUserCloudStorage({
                        KVDataList: [{key: MAIN_MENU_NUM, value: "" + score}],
                        success: function (res) {
                            console.log('setUserCloudStorage', 'success', res)
                        },
                        fail: function (res) {
                            console.log('setUserCloudStorage', 'fail')
                        },
                        complete: function (res) {
                            console.log('setUserCloudStorage', 'ok')
                        }
                    });
                },
                fail: function (res) {
                    console.log('getUserCloudStorage', 'fail 提交失败')
                },
                complete: function (res) {
                    console.log('getUserCloudStorage', 'ok 提交完成')
                }
            });
        } else {
            cc.log("提交得分:" + MAIN_MENU_NUM + " : " + score)
        }
    },


    removeChild() {
        if(this.node.getChildByName("1000") != null){
            this.node.removeChild(this.node.getChildByName("1000"));
        }
        this.rankingScrollView.node.active = false;
        this.scrollViewContent.removeAllChildren();
        this.loadingLabel.getComponent(cc.Label).string = "玩命加载中...";
        this.loadingLabel.active = true;
    },

    fetchFriendData(MAIN_MENU_NUM) {
        this.removeChild();
        this.rankingScrollView.node.active = true;
        if (this.CC_WECHATGAME) {
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                success: (userRes) => {
                    this.loadingLabel.active = false;
                    console.log('success', userRes.data);
                    let userData = userRes.data[0];

                    //取出所有好友数据
                    wx.getFriendCloudStorage({
                        keyList: [MAIN_MENU_NUM],
                        success: res => {
                            console.log("wx.getFriendCloudStorage success", res);
                            let data = res.data;
                            data.sort((a, b) => {
                                if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                    return 0;
                                }
                                if (a.KVDataList.length == 0) {
                                    return 1;
                                }
                                if (b.KVDataList.length == 0) {
                                    return -1;
                                }
                                return b.KVDataList[0].value - a.KVDataList[0].value;
                            });
                            for (let i = 0; i < data.length; i++) {
                                var playerInfo = data[i];
                                var item = cc.instantiate(this.prefabRankItem);
                                item.getComponent('RankItem').init(i, playerInfo);
                                this.scrollViewContent.addChild(item);
                                if (data[i].avatarUrl == userData.avatarUrl) {
                                    let userItem = cc.instantiate(this.prefabRankItem);
                                    userItem.getComponent('RankItem').init(i, playerInfo);
                                    userItem.y = -354;
                                    this.node.addChild(userItem, 1, "1000");
                                }
                            }
                            if (data.length <= 8) {
                                let layout = this.scrollViewContent.getComponent(cc.Layout);
                                layout.resizeMode = cc.Layout.ResizeMode.NONE;
                            }
                        },
                        fail: res => {
                            console.log("wx.getFriendCloudStorage fail", res);
                            this.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
                        },
                    });
                },
                fail: (res) => {
                    this.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
                }
            });
        }
    },
});
