export interface IUsuario{
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles?: string[];
    creado?: Date;
    ultimoAcceso?: Date;
}

export class Usuarios{

    private usuarios: IUsuario [];
    constructor(){
        this.usuarios = [];
    }

    add(nuevoUsuario: IUsuario){
        const date = new Date();
        const nuevo: IUsuario = {
            ...nuevoUsuario,
            codigo: (Math.random() * 1000).toString()+ new Date().getTime().toString(),
            roles: ['admin', 'public'],
            creado:  date,
            ultimoAcceso: date
        }
        this.usuarios.push(nuevo);
        return true;
    }
    getall(){
        return this.usuarios;
    }
    getById(codigo: string){
        const usuarioToReturn = this.usuarios.find((usu) => {
            return usu.codigo === codigo;
        });
        return usuarioToReturn;
    }

    update(updateUsuario: IUsuario){
        let update = false;
        const newUsuarios: IUsuario[] = this.usuarios.map((usu) => {
            if (usu.codigo === updateUsuario.codigo){
                update = true;
                return {...usu, ...updateUsuario, ultimoAcceso: new Date()};
            }
            return usu;
        });
        this.usuarios = newUsuarios;
        return update;
    }

    delete(codigo: string){
        const usuarioToDelete = this.usuarios.find((usu) =>{
            return usu.codigo === codigo;
        });
        if(usuarioToDelete){
            const newUsuarios: IUsuario[] = this.usuarios.filter((usu) => {
                return usu.codigo !== codigo;
            });
            this.usuarios = newUsuarios;
            return true;
        }
        return false;
    }
}



