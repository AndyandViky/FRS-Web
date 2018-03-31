export default {
    inserted(el, binding) {
        const target = $(el);
        console.log(target.width());
        let width = target.width();
        let first = binding.value.left || 0;
        let end = width / 2;
        let curent = first;
        let speed = 2;
        setInterval(function() {
            curent += speed;
            if (curent >= end) {
                curent -= end + 20;
            }
            target.css('left', -curent + 'px');
        }, 20);
    }
};
