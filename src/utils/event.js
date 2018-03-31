export default {
    /**
     * 节流
     * @param  {Function} fn    [description]
     * @param  {[type]}   delay [description]
     * @return {[type]}         [description]
     */
    throttle: function(fn, delay) {
        let timer = null;
        return function() {
            const args = arguments;
            const content = this;
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(content, arguments);
                    timer = null;
                }, delay);
            }
        };
    },
    /**
     * 防抖
     * @param  {Function} fn [description]
     * @param  {[type]}      [description]
     * @return {[type]}      [description]
     */
    debounce: function(fn, delay, immediate) {
        let timer = null;
        return function() {
            const args = arguments;
            const content = this;
            clearTimeout(timer);
            if (immediate) {
                const doNow = !timer;
                timer = setTimeout(function() {
                    timer = null;
                }, delay);
                if (doNow) {
                    fn.apply(content, arguments);
                }
            } else {
                timer = setTimeout(function() {
                    fn.apply(content, arguments);
                }, delay);
            }
        };
    }
};
