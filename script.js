let counter = 0

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
		soltextcounter();
	}
});

function soltextcounter() {
    if(counter == 0){    
        const script = document.createElement('script');
        const code = '(' + function () {
            window.addEventListener('textcounter', arg => {
                var content = window.parent.tinymce.get('submission_body').getContent();
                var no_html = content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

                alert(no_html.length + '文字です');
            });
        } + ')()';
        script.text = code;

        document.head.appendChild(script);
    
        window.dispatchEvent(new CustomEvent('textcounter'));

        counter = counter + 1;
    } else {
        window.dispatchEvent(new CustomEvent('textcounter',));
    }
}

