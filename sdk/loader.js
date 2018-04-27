var scriptName = "./" + (document.currentScript.dataset.script || "script");
var headNode = document.getElementsByTagName('head')[0];
var confNode = document.createElement('script');
var coreNode = document.createElement('script');
var selfPath = window.location.href;
var widgetPath = "widget://";
var pathMatch = selfPath.match(/\/view(.+)$/);
if (pathMatch[1]) {
  selfPath = pathMatch[1];
  var index = -1;
  var pathDeep = 0;
  do {
    index = selfPath.indexOf("/", index + 1);
    if (index != -1) {
      pathDeep++;
    }
  } while (index != -1);
  if (pathDeep) {
    widgetPath = "";
    for (var deepStart = 0; deepStart < pathDeep; deepStart++) {
      widgetPath += "../";
    }
  }
}

confNode.type = "text/javascript";
confNode.src = widgetPath + "config.js";
coreNode.type = "text/javascript";

if (coreNode.addEventListener) {
  coreNode.addEventListener("load", scriptOnload, false);
} else if (coreNode.readyState) {
  coreNode.onreadystatechange = function() {
    if (coreNode.readyState == "loaded" || coreNode.readyState == "complete") {
      coreNode.onreadystatechange = null;
      scriptOnload();
    }
  };
} else {
  coreNode.onload = scriptOnload;
}
coreNode.src = widgetPath + "sdk/core.js";
coreNode.onerror = function(e) {
  console.log(JSON.stringify(e));
};
apiready = function() {
  headNode.appendChild(confNode);
  headNode.appendChild(coreNode);
};

function scriptOnload() {
  seajs.use(scriptName);
}