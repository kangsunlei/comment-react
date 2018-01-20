export function ajax(options) {

    const props = {
        credentials: 'include',
        method: options.method || 'GET'
    };

    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': options.contentType || 'application/json'
    };

    if (options.headers) {
        Object.assign(headers, options.headers);
    }
    props.headers = headers;

    if (options.data) {
        props.method = 'post';
        props.body = options.formData ? options.data : JSON.stringify(options.data);
    }
    const url = options.url.indexOf('?') > -1 ? `${options.url}&_=${+new Date()}` : `${options.url}?_=${+new Date()}`; //fix ie cache
    console.log(props)
    // TODO: add global block
    return fetch(url, props).then(response => {
        if (response.status === 500) {
            alert('服务器开了一点小差，已通知程序猿小哥处理，请稍等片刻或刷新重试。');
        } else if (response.status === 502) {
            alert('服务器错误，请重试 (502)');
        } else if (response.status === 404) {
            alert('网络出错(404)，请检查后重试');
        } else if (response.status === 403) {
            alert('你无权限访问');
        } else {
            return response.json();
        }
        if (options.resolve) {
            options.resolve(false);
        }
    }).then(result => {
        //resolve confirm promise
        if (options.resolve) {
            options.resolve(result.success);
        }

        if (result.errors) {
        }
        return result;
    }).catch(e => {
        console.log(e)
    });
}

export function formatDate(d, format, noHourMinute) {
    if(typeof(d) !== 'object') {
        d = new Date(d);
    }
    const mon = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();

    let currentTime = new Date(), todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    let diffSeconds = Math.floor((todayStart.getTime() - d.getTime()) / 1000);
    if(diffSeconds <= 0){
        diffSeconds = Math.floor((currentTime.getTime() - d.getTime()) / 1000);
        if(diffSeconds <= 0){
            format = '刚刚';
        } else if(diffSeconds < 60){
            format = `${diffSeconds}秒前`;
        } else if(diffSeconds < 60 * 60){
            format = `${Math.floor(diffSeconds / 60)}分钟前`;
        } else if(diffSeconds < 60 * 60 * 24){
            format = `${Math.floor(diffSeconds / 60 / 60)}小时前`;
        }
    } else {
        if(diffSeconds <= 60 * 60 * 24) {
            format = '昨天';
        } else if(diffSeconds <= 60 * 60 * 48) {
            format = '前天';
        } else {
            format = '%MM-%DD';
            if(d.getFullYear() !== todayStart.getFullYear()){
                format = '%YY-' + format;
            }
        }

        if(!noHourMinute){
            format += ' %hh:%mm';
        }
    }

    return format
    .replace('%YY', d.getFullYear())
    .replace('%Y', d.getFullYear() % 100)
    .replace('%MM', mon < 10 ? '0' + mon : mon)
    .replace('%M', mon)
    .replace('%DD', day < 10 ? '0' + day : day)
    .replace('%D', day)
    .replace('%hh', hour < 10 ? '0' + hour : hour)
    .replace('%h', hour)
    .replace('%mm', minute < 10 ? '0' + minute : minute)
    .replace('%m', minute)
    .replace('%ss', second < 10 ? '0' + second : second)
    .replace('%s', second);
}

export const debounce = function (fn, delay) {
    let timer = null;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timer);

        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};

export const throttle = function (fn, threshhold) {
    let last = null;
    let timer = null;
    threshhold || (threshhold = 250);

    return function () {
        const context = this, args = arguments;
        let now = +new Date();
        if (last && now < (last + threshhold)) {
            clearTimeout(timer);

            timer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};