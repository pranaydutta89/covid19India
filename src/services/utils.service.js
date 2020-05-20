class UtilityService {
  cloneDeep(data) {
    return JSON.parse(JSON.stringify(data));
  }
  randomString(length = 10) {
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLen = chars.length;
    for (let i = 0; i < length; i += 1) {
      const rnd = Math.random();
      const nxtChar = chars.charAt(Math.floor(rnd * charLen));
      result += nxtChar;
    }
    return result;
  }

  get IsWebView() {
    return navigator.userAgent.includes('wv');
  }

  get IsMobile() {
    return {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      },
      any: function () {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
      }
    }
  };



  stateSync(state, data) {
    return new Promise((res) => {
      state(data, res);
    });
  }
}

export default new UtilityService();
