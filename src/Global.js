export var Global = {
    url: 'http://192.168.200.150:8000/api/',
    token: localStorage.getItem("auth_token_BO"),
    nombreSitio: 'BackOffice',
    spinnerUrl: 'https://www.sanandreasregional.org/app/plugins/unyson/framework/extensions/forms/static/img/ajax-loader.gif',
    matomoSitio : "http://192.168.200.151/index.php?module=CoreHome&action=index&date=yesterday&period=day&idSite=3#?period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1",
    matomoBackoffice: "http://192.168.200.151/index.php?module=CoreHome&action=index&date=yesterday&period=day&idSite=2#?period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1"
}

export var roles = {
    "director": "Director",
    "subdirector": "Subdirector",
    "administrativo": "Administrativo",
    "adscripto": "Adscripto",
}
