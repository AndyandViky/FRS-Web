export default {
    bind(el, binding) {
        // console.log(el.children[0]);
        var para = document.createElement("img");
        para.src = '';
        para.style.height = '100%';
        para.style.width = '100%';
        $(el).mouseenter(function(e) {
            para.src = binding.value.img + '?id=' + Math.random();
            // el.children[0].src = binding.value.img;
            $(para).prependTo($(el));
            // console.log('mouseover' + e.target);
        });
        $(el).mouseleave(function(e) {
            para.src = '';
            el.removeChild(para);
            // para.src = '';
            // console.log('mouseout' + e.target);
        });
    }
};
