### 性能优化

- CDN 加速 [BootCDN](https://www.bootcdn.cn/)
- 代码压缩
- link 引入外部样式

- CSS3 变换代替 top left
- opacity 配合 will-change 代替 visibility
- 修改多次样式合并一次 class 操作
- 离线操作 display:none
- 文档碎片
- 获取 DOM 属性值不放入循环中
- 动画开启 GPU 硬件加速 transform: translateZ(0);
