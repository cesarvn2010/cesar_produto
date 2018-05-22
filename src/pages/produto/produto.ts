import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
     ModalController, AlertController } from 'ionic-angular';
import { ProdutoDto} from '../../Model/produtoDto';
import { ProdutoProvider } from '../../providers/produto/produto';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { CategoriaDto} from '../../Model/categoriaDto';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {File} from '@ionic-native/file';
/**
 * Generated class for the ProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  //produtos : Array<ProdutoDto>;
  codebarProduto:String="";
  produtos : Array<ProdutoDto>;
  mensagem : String = "Produtos: ";
  retorno: any;
  erroTela : any = '';
  retorno1 : any = '';
  retorno2 : any = '';
  retorno3 : any = '';
  conteudoArquivo : any = ''; 

  retorno4: any = '';

  categorias : Array<CategoriaDto>;

  constructor(public navCtrl: NavController, 
     public navParams: NavParams,
     public alertCtrl : AlertController,
     public produtoProvider : ProdutoProvider,
     public categoriaProvider : CategoriaProvider,
     public modalCtrl : ModalController,
     private barcodeScanner: BarcodeScanner,
     private file : File,) {
       
    
     this.montarTela();
      
  }

  montarTela()
  {      
     this.carregarCategorias();
     this.carregarProdutos();
  }

  carregarCategorias(){

    this.categorias = new Array<CategoriaDto>();
    this.categoriaProvider.getAll()
         .then((categorias: Array<CategoriaDto>) => {
           this.categorias = categorias;             
         })
         .catch(erro => this.alerta(erro));      
  }

  carregarProdutos(){     
    
    this.produtos = new Array<ProdutoDto>();
    this.produtoProvider.getAll(this.codebarProduto)
         .then((produtos: Array<ProdutoDto>) => {
           this.produtos = produtos; 
           // o if abaixo talvez tenha que ser removido
           if (produtos == null){
             
             this.alerta("Nenhum barcode "+this.codebarProduto+" encontrado!")
           }
         })
         .catch(erro => 
              {                
                 this.alerta(erro);
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoPage');
  }

  incluir(){
      let produtoDto : ProdutoDto; 
      produtoDto = new ProdutoDto();    
      produtoDto.idProduto = 0;
      this.abrirTelaProduto(produtoDto, "I");
  }

  editar(produtoDto : ProdutoDto){
      this.abrirTelaProduto(produtoDto, "A");
  }

  excluir (produtoDto : ProdutoDto)
  {
    let confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Deseja realmente excluir o produto (' + produtoDto.nomeProduto + ') ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            return;
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluirProduto(produtoDto);
          }
        }
      ]
    });
    confirm.present();
  }

  excluirProduto(produtoDto : ProdutoDto){
    this.produtoProvider.delete(produtoDto.idProduto)
      .then( ok => this.carregarProdutos() )
      .catch( erro => this.alerta(erro));
  }


 abrirTelaProduto(produtoDto : ProdutoDto, acao: String)
  {
       
      let modal = this.modalCtrl.create('ProdutoDetalhePage', 
        {produtoDto : produtoDto,
          acao : acao,
          categorias : this.categorias});

      modal.onDidDismiss(data => {   

          let produto = new ProdutoDto();
          produto = data.produto;           
          if (data.origem == "S")
          {
            this.salvar(produto);             
          }         

      });
      modal.present();
  }

  salvar(produto : ProdutoDto){
    
    if (produto.idProduto == 0)
    {   
       this.produtoProvider.add(produto)
       .then( ok => {  

            this.carregarProdutos();
          } )
       .catch( erro => this.alerta(erro));
    }
    else
    {
       
      this.produtoProvider.update(produto)
      .then( ok => {
          this.mensagem = this.produtoProvider.Mensagem;
          this.carregarProdutos();
          } )
      .catch( erro => 
        {
          this.alerta(erro);});
      } 
  }
   
  pesquisar() {
    let prompt = this.alertCtrl.create({
      title: 'Atenção',
      message: "Clique em Escanear para efetuar a pesquisa.",
      inputs: [
        {
          name: 'Produto',
          placeholder: 'Código de barras'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            this.codebarProduto = "";
            this.carregarProdutos();
          }
        },
        {
          text: 'Escanear',
          handler: barcodeData => {
            this.barcodeScanner.scan(
              {
                  "prompt" : "Lendo",
                  "orientation" : "landscape"
              })
              .then(barcodeData => {
                this.codebarProduto = barcodeData.text;
                this.carregarProdutos();
                
              })
              .catch(err => {
                this.alerta(err);
              })
              
          }
          
        }
        
      ]
    });
    prompt.present();
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

  /*

  criarSenhaCurta(){
    let prompt = this.alertCtrl.create({
      title: 'Atenção',
      message: "Cadastre uma senha curta.",
      inputs: [
        {
          name: 'SenhaCurta:',
          placeholder: '****'
        },
      ],
      buttons: [
        {
          text: 'Pronto!',
          handler: data => {
              this.criarArquivo(data);
              
          }
          
        }
        
      ]
    });
    prompt.present();
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
 

    texto = texto + ". Novas informações no texto";

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
  
      this.file.readAsText(path, arquivo)     
      .then( (ok)=> {
           this.retorno3 = JSON.stringify(ok);
           this.conteudoArquivo = this.retorno3;           
       }
      ,
      (err)=> {
               this.alerta(err.code.toString() + " " + 
                           err.message.toString());
               this.erroTela = JSON.stringify(err);
              })
      .catch ((err) => this.alerta("erro leitura" + err));
  }
*/
}