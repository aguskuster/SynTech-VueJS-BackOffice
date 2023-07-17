export var Global = {
    // url: 'http://190.64.41.140:8000/api/',
    // url: 'http://192.168.50.137:8000/api/',
    url: 'http://192.168.50.150:8000/api/',
    token: localStorage.getItem("auth_token_BO"),
    nombreSitio: 'BackOffice',
    spinnerUrl: 'https://www.sanandreasregional.org/app/plugins/unyson/framework/extensions/forms/static/img/ajax-loader.gif',
    matomoSitio : "http://192.168.50.138/index.php?module=CoreHome&action=index&date=yesterday&period=day&idSite=3#?period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1",
    matomoBackoffice: "http://192.168.50.138/index.php?module=CoreHome&action=index&date=yesterday&period=day&idSite=4#?period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1"
}

export var roles = {
    "director": "Director",
    "subdirector": "Subdirector",
    "administrativo": "Administrativo",
    "adscripto": "Adscripto",
}