declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const YANDEX_ID = import.meta.env.VITE_YANDEX_METRIKA_ID as string | undefined;

let initialized = false;

function appendScript(src: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (initialized) return;
  initialized = true;

  if (GA_ID) {
    appendScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      (window.dataLayer as unknown[]).push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
  }

  if (YANDEX_ID) {
    const tag = document.createElement('script');
    tag.innerHTML = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
      ym(${YANDEX_ID}, 'init', {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `;
    document.head.appendChild(tag);
  }
}

export function trackPageView(path: string) {
  if (GA_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }

  if (YANDEX_ID && window.ym) {
    window.ym(Number(YANDEX_ID), 'hit', path, {
      title: document.title,
      referer: document.referrer,
    });
  }
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (GA_ID && window.gtag) {
    window.gtag('event', eventName, params || {});
  }

  if (YANDEX_ID && window.ym) {
    window.ym(Number(YANDEX_ID), 'reachGoal', eventName, params || {});
  }
}
