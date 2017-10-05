import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {AuthService} from "../../providers/auth-service";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  resposeData : any;
  resposeUsers : any;
  userData = {"username":"", "password":"",
  "client_id":"3","client_secret":"Zky32SLVuObQxQh7Y41FZnkVOvQoiXL7dveOMRTY","grant_type":"password"
  };
  

  constructor(public navCtrl: NavController, public authService: AuthService, private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
   if(this.userData.username && this.userData.password){
    this.authService.postData(this.userData, "token").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(result){
    localStorage.setItem('userData', JSON.stringify(this.resposeData.access_token) )

    this.navCtrl.push(TabsPage);
	 this.getClient();
  }
  else{
    this.presentToast("Informe dados válidos");
  }



    }, (err) => {
      //Connection failed message
    });
   }
   else{
    this.presentToast("Informe seu email e senha");
   }
 
  }

  getClient(){
   
    this.authService.getClient().then((result) =>{
    this.resposeUsers = result;
    console.log(this.resposeUsers);
    if(result){
    localStorage.setItem('User', JSON.stringify(this.resposeUsers) )
 // localStorage.setItem('idUser', this.resposeUsers.user_id)
  }
 
    }, (err) => {
      //Connection failed message
    });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
