import { environments } from "../environments/environments"

declare const window: any
class AppSettings {
    public static tenantURI: any = window?.WCMAPI?.tenantURI
    public static pageCode: any = window?.WCMAPI?.pageCode
    public static APP_BASE = (this.tenantURI && this. pageCode) ? this.tenantURI + '/' + this.pageCode : '/'
    public static WCMAPI_USER_DATA = window?.WCMAPI ? window?.WCMAPI : environments.USER_DEV_DATA
}
export { AppSettings as APP_CONFIG }