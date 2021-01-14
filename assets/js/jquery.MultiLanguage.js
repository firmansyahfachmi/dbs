// Language JSON File Location
// localStorage.setItem('language', 'en');
var language = localStorage.getItem('language');
// Default Language
var default_lang = 'en';
let lang = localStorage.getItem('language');
// Set Selected Language
function setLanguage() {
    
    if(lang == 'en'){
        lang = 'id'
    } else if(lang == 'id'){
        lang = 'en'
    } else {
        lang = 'en'
    }
    localStorage.setItem('language', lang);
    language = localStorage.getItem('language');
    // Run Multi Language Plugin
    getLanguage()
}

// Run Multi Language Plugin
function getLanguage() {
    // Language on user preference
    (language == null) ? setLanguage(default_lang) : false;
    console.log('s', language)
    // Load data of selected language
    $.ajax({
        url: 'http://139.59.254.53/dbs-vr-website/locales/' + language + '.json',
        dataType: 'json', async: true
    }).done(function (lang) {
        // add selected language class to the body tag
        // $('body').attr('class', language);
        // Loop through message in data
        if(localStorage.getItem('language') == 'en'){
            $('.footer-sound').html('EN');
        } else if(localStorage.getItem('language') == 'id'){
            $('.footer-sound').html('ID');
        }
        $.each(lang, function (index, val) {
            // (index === 'head') ? $(document).attr("title", val['title']) : false;
            $(index).children().each(function () {
                $(this).text(val[$(this).attr('key')])
            })
        })
    })
}

// Auto Loader
$(document).ready(function () {
    if (language != null && language !== default_lang)
        getLanguage(language);
});
