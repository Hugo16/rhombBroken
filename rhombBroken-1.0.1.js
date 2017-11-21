(function (window) {
    /**
     * @param img element
     * @param option
     * option:dWidth:等分宽度的数量 默认 10
     * option:dHeight:等分高度的数量 默认 10
     * option:offset:菱形顶点偏移量 默认 8
     * option:time:动画持续时间 默认 1
     * option:flyOffset:飞行距离 默认 1500
     * option:rotate:旋转角度 默认 360
     * @param callBack 回调函数
     */
    function rhombBroken(img, option, callBack) {
        option = option || {};
        img.onload = function () {
            var
                // 宽高等分数
                dWidth = option.dWidth > 25 ? 10 : (option.dWidth || 10),
                dHeight = option.dHeight > 25 ? 10 : (option.dHeight || 10),
                // 每个等分的大小
                rX = img.width / dWidth,
                rY = img.height / dHeight,
                // 每一行、每一列、点的数量
                xI = dWidth + 2,
                yI = dHeight + 2,
                // 点偏移量底数
                zoomX = dWidth - option.offset ? (option.offset > 10 ? 10 : option.offset) : 8,
                zoomY = dHeight - option.offset ? (option.offset > 10 ? 10 : option.offset) : 8,
                // 保存点的数组
                allArr = [],
                contentDiv = document.createElement("div");

            // 计算点的位置
            for (var i = -1; i <= yI; i++) {
                // 保存每一行点的数组
                var levelArr = [];
                // 计算每一行点的位置
                for (var j = -1; j <= xI; j++) {
                    var point = [
                        j * (rX + Math.random() * rX / zoomX - rX / (2 * zoomX)) - rX / 2,
                        i * (rY + Math.random() * rY / zoomY - rY / (2 * zoomY)) - rY / 2
                    ];
                    levelArr.push(point);
                }
                allArr.push(levelArr);
            }

            contentDiv.style.position = "absolute";
            contentDiv.style.top = getOffsetTop(img) + "px";
            contentDiv.style.left = getOffsetLeft(img) + "px";
            document.getElementsByTagName("body")[0].appendChild(contentDiv);
            img.onclick = function (event) {
                img.onclick = function () {
                };

                var e = event ||window.event;

                img.style.opacity = 0;

                // 画菱形
                for (var j = 0; j < allArr.length - 2; j++) {
                    var num = j % 2 ? 2 : 1;
                    for (var i = num; i < allArr[j].length - 1; i += 2) {
                        var topPointY = allArr[j][i][1],
                            bottomPointY = allArr[j + 2][i][1],
                            leftPointX = allArr[j + 1][i - 1][0],
                            rightPointX = allArr[j + 1][i + 1][0];


                        // 不规则的菱形的高超出图片则弃用
                        if (topPointY > img.height) {
                            continue;
                        }
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        canvas.width = img.width;
                        canvas.height = img.height;

                        ctx.drawImage(img, 0, 0);
                        ctx.globalCompositeOperation = "destination-in";

                        // 在大图片中画一个小菱形
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(allArr[j][i][0], topPointY);
                        ctx.lineTo(leftPointX, allArr[j + 1][i - 1][1]);
                        ctx.lineTo(allArr[j + 2][i][0], bottomPointY);
                        ctx.lineTo(rightPointX, allArr[j + 1][i + 1][1]);
                        ctx.closePath();
                        // 打开这段代码查看画的菱形
                        // ctx.strokeStyle = "red";
                        // ctx.lineWidth = 1;
                        // ctx.stroke();
                        ctx.fill();
                        ctx.restore();

                        // 裁剪这个小菱形出来
                        var realCanvas = document.createElement("canvas");
                        var realCtx = realCanvas.getContext("2d");
                        option.time = option.time > 2 ? 2 : (option.time < 0 ? 1 : option.time || 1);
                        realCanvas.width = rightPointX - leftPointX;
                        realCanvas.height = bottomPointY - topPointY;
                        realCtx.drawImage(canvas, -leftPointX, -topPointY);
                        realCanvas.style.left = leftPointX + "px";
                        realCanvas.style.top = topPointY + "px";
                        realCanvas.style.position = "absolute";
                        realCanvas.style.transition = "all " + option.time + "s";

                        contentDiv.appendChild(realCanvas);

                        (function (realCanvas,leftPointX,topPointY) {
                            setTimeout(function () {
                                var flyOffset = option.flyOffset || 1500;
                                realCanvas.style.transform = "scale(2) rotateX(" + option.rotate || 360 + "deg)";
                                if (leftPointX > e.offsetX) {
                                    realCanvas.style.left = leftPointX + Math.random() * flyOffset + "px";
                                }
                                else {
                                    realCanvas.style.left = leftPointX - Math.random() * flyOffset + "px";
                                }
                                if (topPointY > e.offsetY) {
                                    realCanvas.style.top = topPointY + Math.random() * flyOffset + "px";
                                }
                                else {
                                    realCanvas.style.top = topPointY - Math.random() * flyOffset + "px";
                                }
                                realCanvas.style.opacity = 0;
                            }, 1)
                        })(realCanvas,leftPointX,topPointY,e);
                    }
                }
                setTimeout(function () {
                    contentDiv.parentNode.removeChild(contentDiv);
                    if (callBack) {
                        callBack(img);
                    }
                }, option.time * 1000 + 1000)
            };
        }
    }

    function getOffsetTop(obj) {
        var offsetTop = obj.offsetTop || 0;
        return offsetTop + (obj.parentNode !== null ? getOffsetTop(obj.parentNode) : 0)
    }

    function getOffsetLeft(obj) {
        var offsetLeft = obj.offsetLeft || 0;
        return offsetLeft + (obj.parentNode !== null ? getOffsetLeft(obj.parentNode) : 0)
    }

    window.rhombBroken = rhombBroken;
})(window);