export const parseUserAgent = (userAgent) => {
    return {
      isMobile: /Mobi|Android/i.test(userAgent),
      os: /Windows/.test(userAgent) ? 'Windows' :
           /Mac/.test(userAgent) ? 'MacOS' :
           /Linux/.test(userAgent) ? 'Linux' : 'Unknown',
      browser: /Chrome/.test(userAgent) ? 'Chrome' :
               /Firefox/.test(userAgent) ? 'Firefox' :
               /Safari/.test(userAgent) ? 'Safari' : 'Unknown'
    };
  };