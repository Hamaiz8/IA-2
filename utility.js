(function() {
    function _LPabtest() {
        this.isMobile = function() {
            let check = false;
            (function(a) {
                if (
                    /(android|bb\d+|meego).+mobile|ipad|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                        a
                    ) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
                        a.substr(0, 4)
                    )
                ) {
                    check = true
                }
            })(navigator.userAgent || window.opera)
            return check;
        }
        this.screenWidthGreaterThan = function(width) {
            const windowInnerWidth = window.innerWidth || 0;
            return windowInnerWidth > (width || 1300);
        }
        this.screenWidthLessThan = function(width) {
            const windowInnerWidth = window.innerWidth || 0;
            return windowInnerWidth < (width || 1300);
        }
        this.getCookieValue = function(cname) {
            var nameEQ = cname + '=',
                ca = document.cookie.split(';')
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i]
                while (c.charAt(0) == ' ') c = c.substring(1, c.length)
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
            }
            return null
        }
        this.isEnglish = function() {
            const langCookie = this.getCookieValue('lastpass#lang');
            if (typeof langCookie !== 'string') return false;
            return langCookie.indexOf('en') > -1;
        }
        this.inUS = function() {
            const countryCode = this.parseAkamaiWindowVar(window.akcc) || this.getCookieValue('cciso');
            return countryCode === 'US';
        }
        this.parseAkamaiWindowVar = function(windowVar) {
            try {
                const akamaiCountryCodeWindowVariable = windowVar; //window.akcc;
                let parsedAkamaiCountryCodeWindowVariable = null;
                if (akamaiCountryCodeWindowVariable !== undefined &&
                    akamaiCountryCodeWindowVariable.length < 4 &&
                    akamaiCountryCodeWindowVariable.length > 1 &&
                    !/[!@#$%^&*()_+={}[\]:;<>,.?~\\/-]/.test(akamaiCountryCodeWindowVariable)) {
                    parsedAkamaiCountryCodeWindowVariable = akamaiCountryCodeWindowVariable;
                }
                return parsedAkamaiCountryCodeWindowVariable;
            } catch {
                return null;
            }
        }
        this.isChrome = function() {
            if (typeof navigator.userAgentData !== 'object') return false;
            if (typeof navigator.userAgentData.brands !== 'object') return false;
            navigator.userAgentData.brands.some((index) => {
                return index.brand.indexOf('Google Chrome') > -1;
            })
        }
        this.getQueryStringValue = function(qsname) {
            if (!qsname) return '';
            const paramsObject = typeof URLSearchParams === 'function' ? new URLSearchParams(window.location.search) : {};
            return paramsObject.get(qsname) || '';
        }
        this.setCookie = function(cname, cvalue, exdays = null, domain = null, samesite = null) {
            const getRootDomain = function(host) {
                try {
                    if (host) {
                        const hostNamePartArray = host.split('.');
                        const hostNamePartArrayLength = hostNamePartArray.length;
                        const rootDomain = hostNamePartArrayLength > 1 ? `${hostNamePartArray[hostNamePartArrayLength - 2]}.${hostNamePartArray[hostNamePartArrayLength - 1]}` : host;
                        return rootDomain;
                    } else {
                        return '';
                    }
                } catch {
                    return host;
                }
            }
            const windowHostName = window.location.hostname;
            const isAzureDomain = windowHostName.indexOf('azure') > -1;
            const secure = window.location.protocol.indexOf('https') > -1;
            const d = new Date();
            let expires = null;
            if (exdays !== null) {
                d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
                if (exdays.constructor == Number) {
                    expires = exdays === Infinity ? 'expires=Fri, 31 Dec 9999 23:59:59 GMT' : `expires=${d.toUTCString()}`
                }
            }
            document.cookie =
                `${cname}=${cvalue};` +
                (expires ? `${expires};` : '') +
                (domain ? `domain=${domain};` : `domain=${(isAzureDomain ?  windowHostName : getRootDomain(windowHostName))};`) +
                'path=/;' +
                (samesite ? `SameSite=${samesite};` : '') +
                (secure ? 'Secure;' : '');
        }
    }
    window._LPabtest = new _LPabtest();
})();