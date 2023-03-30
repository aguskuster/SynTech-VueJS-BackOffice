export var Global = {
    // url: 'http://190.64.41.140:8000/api/',
    url: 'http://192.168.50.137:8000/api/',
    token: localStorage.getItem("auth_token_BO"),
    nombreSitio: 'BackOffice',
    spinnerUrl: 'https://www.sanandreasregional.org/app/plugins/unyson/framework/extensions/forms/static/img/ajax-loader.gif',
}

export var roles = {
    "director": "Director",
    "subdirector": "Subdirector",
    "administrativo": "Administrativo",
    "adscripto": "Adscripto",
}