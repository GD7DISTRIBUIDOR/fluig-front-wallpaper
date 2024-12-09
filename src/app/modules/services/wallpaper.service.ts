import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environments as env } from "../../../environments/environments";

declare var $: any;
declare var WCMAPI: any;

@Injectable({
    providedIn: 'root'
  })
export class WallpaperService {

    oauth = env.getAuthorization
    token = env.getCredentials

    constructor(){}

    executarAcao(): Observable<any>{
        return new Observable(observer => {
            const dataExec = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                <soapenv:Header/>
                <soapenv:Body>
                <ws:getDataset>
                    <companyId>1</companyId>
                    <username>treinamento</username>
                    <password>treinamento@fluig</password>
                    <name>ds_wallpaper_op</name>
                    <fields></fields>
                    <constraints></constraints>
                    <order></order>
                </ws:getDataset>
            </soapenv:Body>
            </soapenv:Envelope>
            `
            WCMAPI.Create({
                url : "/webdesk/ECMDatasetService?wsdl",
                contentType : "text/xml",
                dataType : "xml",
                data : dataExec,
                success : function(data: any) {
                    observer.next()
                    observer.complete()
                }
            })
        })
    }

    sendWallpaper_old(data: any): Observable<any>{
        return new Observable(observer => {
            $.ajax({
                url: `${env.apiUrl}/api/wallpaper`,
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success : function(data: any) {
                    observer.next(data)
                    observer.complete()
                }
            })
        })
    }

    sendWallpaper(wallpaper64: any): Observable<any>{
        return new Observable(observer => {
            const data = {
                serviceCode: "wallpaper",
                tenantCode: "gd7", 
                endpoint: "/", 	
                method: "post",
                params: {
                    wallpaper64
                }
            }

            var request_data = {
                url: `${env.apiUrl}${env.apiEndPoint}`,
                method: 'POST'
            };

            $.ajax({
                url: request_data.url,
                contentType: 'application/json',
                crossDomain: true,
                type: request_data.method,
                data: JSON.stringify(data),
                headers: !env.PROD && this.oauth?.toHeader(this.oauth?.authorize(request_data, this.token)),
                success: function(res : any) {
                    console.log(res)
                    if (res.content.result != null){
                        const result = JSON.parse(res.content.result)
                        observer.next(result);
                        observer.complete();
                    }
                }, 
                error: (error : any) => {
                    console.log('falhou')
                    observer.error(error);
                }
            })

        })
    }

}