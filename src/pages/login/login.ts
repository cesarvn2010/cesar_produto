import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {
    this.loginForm = formBuilder.group({
      matricula: ['14036214', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    let d = '1';
    console.log(d);
    console.log(!!d);
    console.log(!!!d);

    let a = [
      1,2,3
    ]

    console.log(a)
    console.log(...a)

  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  onSubmit(values) {
    console.log(values.matricula.trim())
    //this.navCtrl.push("ProdutoPage", { matricula: values.matricula.trim() })
    this.navCtrl.setRoot("ProdutoPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  

}
