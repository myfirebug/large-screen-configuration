# 基于 React 拖动配置大屏的后台管理系统(开发中···)

large-screen-configuration 从零搭建基于 React 的大屏拖动配置管理系统，该平台是一个高效的拖拽式低代码数据可视化开发平台，将图表、页面元素、控件等封装为组件，由组件拼成微件，由微件拼成页面，由页面拼成项目，无需编写代码即可制作漂亮的大屏。
项目纯前端-Demo 地址：[https://myfirebug.github.io/bigscreen/v2.0.0](https://myfirebug.github.io/bigscreen/v2.0.0)

用户名：admin, 密码：123456

**技术栈**

```
基于 react + react-dom + react-router-dom + antd + ES6 + scss，使用 webpack 打包
```

# 依赖安装、启动、打包

```
1.克隆项目：      git clone https://github.com/myfirebug/large-screen-configuration.git
2.安装nodejs
3.安装依赖：      npm install
4.启动服务：      npm start
5.发布代码：      npm run build

```

**已完成页面**

1. [x] 登录页面开发

![RUNOOB 图标](https://myfirebug.github.io/example-images/bigscreen/v2.0.1/login.png)

2. [x] 首页开发

![RUNOOB 图标](https://myfirebug.github.io/example-images/bigscreen/v2.0.1/home.png)

3. [x] 组件列表开发

![RUNOOB 图标](https://myfirebug.github.io/example-images/bigscreen/v2.0.1/elements.png)

4. [x] 微件列表开发

![RUNOOB 图标](https://myfirebug.github.io/example-images/bigscreen/v2.0.1/widget.png)

5. [x] 微件配置开发

![RUNOOB 图标](https://myfirebug.github.io/example-images/bigscreen/v2.0.1/elementc-config.png)

6. [x] 页面模版列表

![RUNOOB 图标](https://myfirebug.github.io/example-images/bigscreen/v2.0.1/page.png)

7. [x] 页面模版配置

![RUNOOB 图标](https://myfirebug.github.io/example-images/bigscreen/v2.0.1/page-config.png)

**已完成的组件**

| 类型   | 组件名称   | 组件名称         | 组件名称             | 组件名称   | 组件名称       | 组件名称   | 组件名称   |
| ------ | ---------- | ---------------- | -------------------- | ---------- | -------------- | ---------- | ---------- |
| 文本   | 基础文本   | 带 ICON 文本     | 滚动消息             | 数字滚动   | 时间文本       | -          | -          |
| 折线图 | 基础折线图 | 基础平滑折线图   | 基础面积图           | 折线图堆叠 | 堆叠面积图     | 垂直折线图 | -          |
| 柱状图 | 基础柱状图 | 带背景色的柱状图 | 坐标轴刻度与标签对齐 | 圆角柱状图 | 纵向柱状图     | 堆积柱状图 | 渐变柱状图 |
| 饼图   | 基础饼图   | 基础南丁格尔图   | 环形图               | 圆角环形图 | 百分比图例饼图 | -          | -          |
| 表格   | 基础表格   | 隔行换色表格     | 边框表格             | 排名表格   | 带进度条表格   | -          | -          |

**主要依赖：**

| 名称       | 版本   | 名称       | 版本   |
| ---------- | ------ | ---------- | ------ |
| react      | 18.2.0 | react-dom  | 18.2.0 |
| typescript | 5.1.6  | jsoneditor | 10.1.3 |
| echarts    | 5.4.3  | axios      | 1.4.0  |
| cross-env  | 7.0.3  | antd       | 5.23.1 |
| swiper     | 11.2.4 |            |        |

**开发环境**

| 名称 | 版本   | 名称 | 版本   |
| ---- | ------ | ---- | ------ |
| node | 16.8.0 | npm  | 7.21.0 |
