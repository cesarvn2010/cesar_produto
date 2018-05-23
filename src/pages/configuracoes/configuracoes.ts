import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  retorno1 : any;
  erroTela : any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private file : File,
    private alertCtrl : AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  excluirSenhaCurta(){
   
   let path = this.file.dataDirectory;
   let arquivo = 'teste.txt';

   this.file.removeFile(path, arquivo)
      .then( (ok) => 
            {              
              this.alerta("Senha curta deletada com sucesso!");
             },
        (err)=> {
                 this.alerta(err.code.toString() + " " + 
                             err.message.toString());
                 this.erroTela = "Erro no processamento: " + JSON.stringify(err);
                })
      .catch((err) => {
        console.log(err);
        this.alerta("Erro ao deletar o arquivo:" + err.toString());
      });
    };

    alerta(mensagem)
  { 

    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();

  }
   

}
