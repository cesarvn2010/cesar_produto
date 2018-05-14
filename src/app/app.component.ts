import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  //rootPage:any = HomePage;
  rootPage:any;

  pages: Array<{title: string, component: any}>;

  public constructor(public platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public dbProvider : DatabaseProvider) {
    dbProvider.createDatabase()
    .then(() => {

    })
    .catch(() => {

    })
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      if(!localStorage.getItem('Login')){
        this.rootPage = LoginPage;
      } else {}
    });

    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Login', component: 'LoginPage'},
      {title: 'Categoria', component: 'CategoriaPage'},
      {title: 'Produto', component: 'ProdutoPage'},
      {title: 'Fechar', component: 'Fechar'}
    ];

  }

  openPage(page){
    if(page.title == "Fechar")
    {
      this.platform.exitApp();
    }
    else
    {
      this.nav.setRoot(page.component);
    }
  }

}

