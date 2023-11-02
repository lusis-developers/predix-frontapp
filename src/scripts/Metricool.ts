/**
 * From metricool script
 * 
 * TODO: created a function to be used where is needed
 * 
 * <script>function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"6a579507639560d503b65da3707d74cf"})});</script>
 * 
 */

const metricoolScriptUrl = `https://tracker.metricool.com/resources/be.js`;

function loadMetricoolScript() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = metricoolScriptUrl;
  script.onload = function() {
    if (window.beTracker && typeof window.beTracker.t === "function") {
      window.beTracker.t({ hash: "6a579507639560d503b65da3707d74cf" });
    }
  };
  document.head.appendChild(script);
}

export default loadMetricoolScript;