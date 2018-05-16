import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { DatabaseProvider } from '../providers/database/database';
import { ProdutoProvider } from '../providers/produto/produto';
import { SQLite } from '@ionic-native/sqlite';
import { UsuarioProvider } from '../providers/usuario/usuario';
import {Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaProvider,
    DatabaseProvider,
    ProdutoProvider,
    SQLite,
    UsuarioProvider,
    Camera,
  ]
})
export class AppModule {}
