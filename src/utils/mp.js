export function MP(ak) {
  return new Promise(function (resolve, reject) {
      window.onload = function () {
          resolve(window.BMap)//插入script标签后 会在window上挂一BMap属性,此为跨域获取的数据
      };
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
      script.onerror = reject;
      document.head.appendChild(script);//插入此标签后 会在window上挂一BMap属性,此为跨域获取的数据
  })
}