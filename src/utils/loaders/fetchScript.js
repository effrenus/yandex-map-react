export default function fetchScript (url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = resolve;
        script.onerror = reject;
        script.src = url;

        const beforeScript = document.getElementsByTagName('script')[0];
        beforeScript.parentNode.insertBefore(script, beforeScript);
    });
}
