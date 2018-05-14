export class UsuarioDto {

    private _IdUsuario: Number;
    private _Username : String;
    private _Senha : String;
  

    constructor() {
  
    }
    get username () : String {
      return this._Username ;
    }

    get idUsuario() : Number {
      return this._IdUsuario;
    }

    get senha () : String {
        return this._Senha;
      }

    
    set username (p:String)
    {
       this._Username  = p;
    } 
    

    set idUsuario(p:Number)
    {
      this._IdUsuario = p;
    }

    set senha (p:String)
    {
      this._Senha  = p;
    }

    
  }