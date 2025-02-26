import Mock from "mockjs";

export const widgets = {
  url: "/widgets",
  method: "get",
  data: {
    result: true,
    data: [
      {
        id: Mock.mock("@guid"),
        name: "全市各区县严重污染企业数量",
        url: "",
        type: "table",
        createTime: Mock.mock('@date("yyyy-MM-dd")'),
        count: Mock.mock('@string("number", 5)'),
        widgetId: Mock.mock("@guid"),
        x: 0,
        y: 0,
        column: 1,
        row: 1,
        configuration:
          '{"configureValue":{"styleBoxInset":false,"styleBorderStyle":"solid","styleBoxShadowC":"rgba(15, 32, 212, 0.5)","styleBorderWidth":1,"styleBorderColor":"rgb(15, 32, 212)","styleBorderTopLeftRadius":10,"styleBorderTopRightRadius":10,"styleBorderBottomLeftRadius":10,"styleBorderBottomRightRadius":10,"styleBackgroundColor":"#090548","headerStyleHeight":40,"isShowAuxiliaryLine":true,"auxiliaryLineBorderColor":"rgba(255, 255, 255, 0.2)","headerStyleBorderBottomColor":"rgb(15, 32, 212)","bodyStylePaddingTop":4,"headerShow":true},"dataValue":{"dataType":"mock","mock":{"value":"文本框"},"params":{},"method":"get","field":"value"}}',
        elements:
          '[{"id":"fEA2CBc3-5A8b-fF1E-2A3d-bFAE5BBeA171","name":"带进度条表格","url":"","element":"table","code":"progressTable","type":"table","createTime":"2024-07-10","count":"33274","x":1,"y":1,"row":8,"column":8,"show":false,"elementId":"6c2f8ee2=9507=4dfa=a290=5a3b07edeb71","position":"body","configuration":{"configureValue":{"loop":true,"pagination":true,"autoplay":true,"navigation":false,"spaceBetween":0,"slidesPerView":9,"rows":1,"tableHeaderBackgroudColor":"#4a8cff","tableHeaderColor":"#fff","tableShowBorderColor":"rgba(230,30,30,1)","tableShowHeader":false,"tableTbodyColor":"#fff","tableColumn":[{"title":"序号","dataIndex":"index","align":"left","width":30},{"title":"地区","dataIndex":"name","align":"left","width":60},{"title":"占比","dataIndex":"progressBar","align":"left","components":"progress"},{"title":"用电量","dataIndex":"data","align":"right","width":80}],"serialNumberRank":true,"tableTbodyOddBackgroundColor":"","serialNumberBackgroundColor":"rgb(74, 140, 255)","serialNumberFontSize":12,"progressForegroundColor":"#4abbff","progressBackgroundColor":"rgba(74, 187, 255, 0.1)"},"dataValue":{"useInterface":false,"mock":{"table":[{"name":"右玉县","data":"902,381","progressBar":"50%"},{"name":"逆城区","data":"902,381","progressBar":"50%"},{"name":"平鲁工","data":"902,381","progressBar":"50%"},{"name":"怀仁市","data":"902,381","progressBar":"50%"},{"name":"山阴县","data":"902,381","progressBar":"50%"},{"name":"应县","data":"902,381","progressBar":"50%"},{"name":"武侯区","data":"902,381","progressBar":"50%"},{"name":"高新区","data":"902,381","progressBar":"50%"},{"name":"双流区","data":"902,381","progressBar":"50%"},{"name":"青羊区","data":"902,381","progressBar":"50%"}]},"field":"table"}},"pageX":447,"pageY":200},{"id":"1cAC8EaB-0edc-eEdA-eaf1-23ECC8D6f58F","name":"带icon文本","url":"","element":"baseText","code":"iconText","type":"text","createTime":"1982-06-20","count":"29016","x":1,"y":1,"row":1,"column":4,"show":false,"elementId":"854b3194=8261=4d58=93f6=6250e731608c","position":"header","configuration":{"configureValue":{"iconStyleFontSize":18,"iconStyleSelect":"&#xe621","styleBoxInset":false,"styleBorderStyle":"none","styleFontSize":18,"styleFontWeight":"bolder","styleTextAlign":"left","styleFontFamily":"Microsoft YaHei","styleLineHeight":40,"styleColor":"#fff","styleLetterSpacing":"","iconStyleColor":"#0091ff"},"dataValue":{"useInterface":false,"mock":{"value":"全市各区县严重污染企业数量"},"field":"value"}}}]',
      },
    ],
    message: "获取组建列表成功",
  },
};
