import $ from 'jquery';

const loadHtmlSuccessCallbacks = [];

export function onLoadHtmlSuccess(callback) {
    if (!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback);
    }
}

// injetar os htmls como o caso do template header
function loadIncludes(parent) {
    if (!parent) 
        parent = 'body';

    $(parent).find('[wm-include]').each(function(i, e) {
        const url = $(e).attr('wm-include');

        $.ajax({
            url,
            success(data) {
                $(e).html(data);

                // need to avoid execute again and enter in a loop (because recursive call above)
                $(e).removeAttr('wm-include');

                // to execute the include inside others pages 
                loadHtmlSuccessCallbacks.forEach(callback => callback(data));

                // need execute recursively cause process all child itens
                loadIncludes(e);
            }
        })
    })
}

loadIncludes();