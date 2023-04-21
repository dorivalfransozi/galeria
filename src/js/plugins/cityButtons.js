import $ from 'jquery';

import { onLoadHtmlSuccess } from '../core/includes';

const duration = 600;

function filterCity(city) {
    $('[wm-city]').each(function(i, e) {
        const isTarget = ($(this).attr('wm-city') === city || city === null);
        console.log('city is', city, isTarget);

        if (isTarget) {
            //$(this).parent().removeClass('d-none');
            $(this).fadeIn(duration);
        } else {
            $(this).fadeOut(duration, () => {
                //$(this).parent().addClass('d-none');
            });
        }
    })
}


$.fn.cityButtons = function () {

    const cities = new Set;
    $('[wm-city').each(function(i, e) {
        cities.add($(e).attr('wm-city'));
    })
    
    // buttons creater
    const btns = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city);
        btn.on("click", filterCity(city));
    
        return btn
    })
    
    const btnAll = $('<button>').addClass(['btn', 'btn-info']).html('All');
    btnAll.on("click", filterCity(null));
    
    btns.push(btnAll);
    
    const btnGroup = $('<div>').addClass(['btn-group']);
    btnGroup.append(btns);
    
    $(this).html(btnGroup);

    return this;
}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons();
})
