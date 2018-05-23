import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { File } from '@ionic-native/file';

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

  //data : any = '';
  retorno: any;
  erroTela : any = '';
  retorno1 : any = '';
  retorno2 : any = '';
  retorno3 : any = '';
  conteudoArquivo : any = ''; 

  retorno4: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private file : File,
  ) {
    this.verificaArquivoExiste();
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
    this.criarSenhaCurta(values);
  
  }

  criarSenhaCurta(values){
    let prompt = this.alertCtrl.create({
      title: 'Atenção',
      message: "Cadastre uma senha curta.",
      inputs: [
        {
          name: 'SenhaCurta',
          placeholder: '****'
        },
      ],
      buttons: [
        {
          text: 'Pronto!',
          handler: data => {
              this.criarArquivo(data.SenhaCurta);
              this.navCtrl.push("ProdutoPage", { matricula: values.matricula.trim() }) 
              this.navCtrl.setRoot("ProdutoPage");
          }
          
        }
        
      ]
    });
    prompt.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  lerSenhaCurta(){
    
    let prompt = this.alertCtrl.create({
      title: 'Atenção',
      message: "Informe sua senha curta.",
      inputs: [
        {
          name: 'SenhaCurta',
          placeholder: '****'
        },
      ],
      buttons: [
        {
          text: 'Pronto!',
          handler: data => {
              this.lerArquivo(data.SenhaCurta);      
          }
          
        }
        
      ]
    });
    prompt.present();
  }

  verificaArquivoExiste(){

      let path = this.file.dataDirectory;
      let arquivo = 'teste.txt';
      this.file.checkFile(path, arquivo).then(
        (files) => {
          this.lerSenhaCurta();
        }
      ).catch(
        (err) => {
          console.log("files not found ")
        }
        );
  }

  lerArquivo(data){

    let path = this.file.dataDirectory;
    let arquivo = 'teste.txt';

    this.file.readAsText(path, arquivo)     
    .then( (ok)=> {
         this.retorno3 = JSON.stringify(ok);
        if(this.retorno3  == ""){

        }
        if ('"'+data+'"' == this.retorno3){
            this.navCtrl.push("ProdutoPage"); 
            this.navCtrl.setRoot("ProdutoPage");
         }
         else{
           this.alerta("A senha curta está incorreta, data: "+data+", retorno3: "+this.retorno3);
         }          
     }
    ,
    (err)=> {
             this.alerta(err.code.toString() + " " + 
                         err.message.toString());
             this.erroTela = JSON.stringify(err);
            })
    .catch ((err) => this.alerta("erro leitura" + err));
  }

  criarArquivo(senha_curta){
    
    
    let texto : string = "";

    texto = senha_curta;
   
   let path = this.file.dataDirectory;
   let arquivo = 'teste.txt';

   this.file.createFile(path, arquivo, true)
      .then( (ok) => 
            {              
             this.retorno1 = JSON.stringify(ok);
             },
        (err)=> {
                 this.alerta(err.code.toString() + " " + 
                             err.message.toString());
                 this.erroTela = "Erro no processamento: " + JSON.stringify(err);
                })
      .catch((err) => {
        console.log(err);
        this.alerta("Erro Write" + err.toString());
      });

    this.file.writeFile(path, arquivo, texto, {replace: true})
      .then( (ok) => {
              this.retorno2 = JSON.stringify(ok);
              },
      (err)=> {
              this.alerta(err.code.toString() + " " + 
                          err.message.toString());
              this.erroTela = JSON.stringify(err);
              })
      .catch((err) => {
        this.alerta("Erro Write" + err);
      });
  
    
  }

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
