import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../app.config';
//import * as $ from 'jquery';
import { environments as env } from '../../../environments/environments';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationService {

    checkAuthorization(): Observable<boolean>{
        
        var dataset = "colleagueGroup";  
        
        const constraints = [
            {
                "_field": "groupId",
                "_initialValue": "G1_RH-DP",
                "_finalValue": "G1_RH-DP",
                "_type": 2,
                "_likeSearch": false
            },
            {
                "_field": "groupId",
                "_initialValue": "G2_RH-DP",
                "_finalValue": "G2_RH-DP",
                "_type": 2,
                "_likeSearch": false
            },
            {
                "_field": "groupId",
                "_initialValue": "G3_RH-DP",
                "_finalValue": "G3_RH-DP",
                "_type": 2,
                "_likeSearch": false
            }
          ];
        
        var data = { 
            "name": dataset,
            "fields": ['colleagueId'], 
            "constraints": constraints,
            "order": null
        }
    
        const oauth = env.getAuthorization;
        const token = env.getCredentials;
    
        var request_data = {
            url: 'https://gd7distribuidor160601.fluig.cloudtotvs.com.br:1300/api/public/ecm/dataset/datasets',
            method: 'POST'
        };
        
        return new Observable(observer => {
            $.ajax({
                url: request_data.url,
                contentType: 'application/json',
                crossDomain: true,
                type: "POST",
                data: JSON.stringify(data),
                headers:!env.PROD && oauth?.toHeader(oauth?.authorize(request_data, token)),
                success: function(res : any) {
                    if (res.content.values.length > 0){
                        var datas = res.content.values.map(function(item: {colleagueId: number}) {
                            return item.colleagueId;
                          }).includes(APP_CONFIG.WCMAPI_USER_DATA.userCode) ? true : false
                        observer.next(datas);
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