var postsData = require('../../../data/posts-data.js')
Page({
  data: {
    isPlayingMusic:false
  },
  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    this.setData({
      postData: postsData.postList[postId]
    })
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title:postCollected?'收藏成功':'取消成功',
      duration:1000,
      icon:"success"
    })
  },
  onShareTap:function(event){
    var itemList = ["分享到QQ",
      "分享给微信好友",
      "分享到朋友圈",
      "分享到微博",]
    wx.showActionSheet({
      itemList:itemList,
      success:function(res){
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '现在不支持分享',
        })
      }
    })
  },
   onMusicTap:function(event){
     var currentPostId = this.data.currentPostId;
     var postData = postsData.postList[currentPostId];
     var isPlayingMusic = this.data.isPlayingMusic;
     if(isPlayingMusic){
       wx.pauseBackgroundAudio();
       this.setData({
         isPlayingMusic: false
       })
     }
     else{
       wx.playBackgroundAudio({
         dataUrl: postData.music.url,
         title: postData.music.title,
         coverImgUrl: postData.music.coverImg
       }),
       this.setData({
        isPlayingMusic:true
     })
     }
   }

})