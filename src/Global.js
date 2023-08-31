export var Global = {
    url: 'http://10.106.5.150:8000/api/',
    token: localStorage.getItem("auth_token_BO"),
    nombreSitio: 'BackOffice',
    spinnerUrl: 'https://www.sanandreasregional.org/app/plugins/unyson/framework/extensions/forms/static/img/ajax-loader.gif',
    matomoSitio : "http://10.106.5.151/index.php?module=CoreHome&action=index&date=yesterday&period=day&idSite=2#?period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1",
    matomoBackoffice: "http://10.10.5.151/index.php?module=CoreHome&action=index&date=yesterday&period=day&idSite=1#?period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1"
}

export var roles = {
    "director": "Director",
    "subdirector": "Subdirector",
    "administrativo": "Administrativo",
    "adscripto": "Adscripto",
}
