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