/*
 * layout
 */
define(function(require) {
    var comm = require('sdk/server');
    require('sdk/common');
    var $ = require('jquery');

    //上传图片
    var maxPicLen = 5;
    var uploadingImg = false;
    var $picStore = $('#picStor');
    $picStore.text(maxPicLen);
    var gotPicter = function(avatsrc) {
        if (!avatsrc) {
            return null;
        }
        var adder = $('#picControl').find('._adder');
        var newImg = $('<div class="_pic"><div class="_del"><i class="ion">&#xe647;</i></div><img src="' + avatsrc + '" class="photoBrowserEnable"></div>');
        $('#picControl').append(newImg);
        adder.appendTo($('#picControl'));
        var has = $('#picControl ._pic').length;
        $picStore.text(maxPicLen - has);
        if (has >= maxPicLen) {
            $('#picControl').find('._adder').hide();
        }
        uploadingImg = true;

        require.async('upload', function(uploader) {
            uploader(avatsrc, {
                url: "http://host.refined-x.com/test/fileupload.php",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onCreate: function(upId) {
                    newImg.data('upid', upId).append('<div class="_state"></div>');
                },
                onStatus: function(percent) {
                    newImg.find('._state').text(percent + '%');
                },
                success: function(newAvat) {
                    uploadingImg = false;
                    var realPic = comm.source(newAvat);
                    newImg.data('remote', realPic).find('._state').text('上传成功');
                    var picCollecter = $('#picCollecter').val();
                    picCollecter += (realPic + ',');
                    $('#picCollecter').val(picCollecter);
                    setTimeout(function() {
                        newImg.find('._state').remove();
                    }, 0);
                },
                cancel: function(upId) {
                    $('#picControl ._pic').each(function(i, e) {
                        if ($(e).data('upid') == upId) {
                            $(e).find('._del').trigger('click');
                        }
                    });
                },
                error: function() {
                    uploadingImg = false;
                    newImg.remove();
                    api.alert({
                        msg: "上传失败"
                    });
                    var has = $('#picControl ._pic').length;
                    $picStore.text(maxPicLen - has);
                    if (has < maxPicLen) {
                        $('#picControl').find('._adder').show();
                    }
                }
            });
        });
    };
    //删除图片
    $('body').on('click', '#picControl ._del', function() {
        var theNode = $(this).parent('._pic');
        var picCollecter = $('#picCollecter').val();
        api.cancelAjax({
            tag: theNode.data('upid')
        });
        picCollecter = picCollecter.replace(theNode.data('remote') + ',', '');
        $('#picCollecter').val(picCollecter);
        theNode.remove();
        //更新图片数据
        var has = $('#picControl ._pic').length;
        $picStore.text(maxPicLen - has);
        if (has < maxPicLen) {
            $('#picControl').find('._adder').show();
        }
    });
    //获取图片
    $('body').on('click', '#picControl ._adder', function() {
        app.actionSheet({
            title: '选择图片',
            buttons: ['拍摄', '选择图片']
        }, function(index) {
            var sourceType;
            switch (index) {
                case 1:
                    sourceType = 'camera';
                    break;
                case 2:
                    sourceType = 'album';
                    break;
                default:

                    break;
            }
            if (!sourceType) {
                return null;
            }
            api.getPicture({
                sourceType: sourceType,
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: 'url',
                allowEdit: true,
                quality: 70,
                targetWidth: 640,
                saveToPhotoAlbum: false
            }, function(ret, err) {
                if (ret) {
                    gotPicter(ret.data);
                } else {
                    console.log(err);
                }
            });
        })
    });



    
});