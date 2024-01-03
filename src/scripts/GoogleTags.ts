const googleScript = 'https://www.googletagmanager.com/gtag/js?id=G-CMXRL7FL51';

function initializeGoogleAnalytics() {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', 'G-CMXRL7FL51');

  const script = document.createElement('script');
  script.async = true;
  script.src = googleScript;
  document.head.appendChild(script);
}

export default initializeGoogleAnalytics;