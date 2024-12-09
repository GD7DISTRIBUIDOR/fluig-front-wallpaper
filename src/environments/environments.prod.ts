declare var OAuth: any;
declare var CryptoJS: any;

export const environments = {
    apiUrlf: 'https://api.gd7distribuidor.com.br:1002/api/wallpaper',
    apiUrl: '',
    apiEndPoint: '/api/public/2.0/authorize/client/invoke',
    USER_DEV_DATA:null,
    WGT_URI_COMP:'/wgt_wallpaper/resources/js/app-angular/',
    PROD: true,
    getCredentials: {
        key: '',
        secret: '',
    },
    getAuthorization: OAuth({
        consumer: {
            key: '',
            secret: ''
        },
        signature_method: 'HMAC-SHA1',
        hash_function: function (base_string: any, key: any) {
            return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
        },
        nonce_length: 6
    })
}