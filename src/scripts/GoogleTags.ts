const googleScript = 'https://www.googletagmanager.com/gtag/js?id=G-CMXRL7FL51';

async function initializeGoogleAnalytics() {
  try {
    window.dataLayer = window.dataLayer || [];

    gtag('js', new Date());
    gtag('config', 'G-CMXRL7FL51');
  
    const script = document.createElement('script');
    script.async = true;
    script.src = googleScript;
    document.head.appendChild(script);
  } catch (error) {
    console.error('Google Analytincs Initalization error: ', error);
  }
}

function gtag(...args: any) {
  window.dataLayer.push(args);
}

export default initializeGoogleAnalytics;