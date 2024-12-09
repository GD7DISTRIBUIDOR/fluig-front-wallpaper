declare var OAuth: any;
declare var CryptoJS: any;

export const environments = {
    apiUrlf: 'http://localhost:3203',
    apiUrl: 'https://gd7distribuidor160601.fluig.cloudtotvs.com.br:1300',
    apiEndPoint: '/api/public/2.0/authorize/client/invoke',
    USER_DEV_DATA: { userCode: '99', userEmail: 'vitorwilson@gd7.com.br', userId: '8', userLogin: 'vitorwilson', user: 'Vitor Wilson' },
    WGT_URI_COMP:"",
    PROD:false,
    getCredentials: {
        key: '65097fe6-b232-4984-9341-c9321fc67308',
        secret: '505f349b-5446-4baa-b1ea-bd1cc6ea529a3dee92e0-678c-483c-ab78-2f4125e6b099',
    },
    getAuthorization: OAuth({
        consumer: {
            key: 'acessoPublicoKey',
            secret: 'acessoPublicoSecret'
        },
        signature_method: 'HMAC-SHA1',
        hash_function: function (base_string: any, key: any) {
            return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
        },
        nonce_length: 6
    })
}