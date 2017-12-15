# rhombBroken #

图片定点爆破函数

----------

- 示例

	`rhombBroken(img, {}, function (img) {
        img.style.opacity = 1;
    });`

	[点击查看](https://hugo16.github.io/rhombBroken/demo/index.html "rhombBroken示例")

- 参数介绍

	**img:** 要爆破的图片(Element)

	**option:** 参数对象(Object)

		*dWidth:* 等分宽度的数量 默认 10

     	*dHeight:*等分高度的数量 默认 10
     
     	*offset:*菱形顶点偏移量 默认 8
     
     	*time:*动画持续时间 默认 1
     
     	*flyOffset:*飞行距离 默认 1500
     
     	*rotate:*旋转角度 默认 360

	**callBack:** 回调函数(Function)
	
- 兼容 IE10+
