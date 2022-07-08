import { IUsuario } from './../../shared/models/Usuario';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.css'],
})
export class FormularioCadastroComponent implements OnInit {
  form!: FormGroup;
  @Output() public emmitUsuario: EventEmitter<IUsuario> = new EventEmitter();
  idIncremente: number  = 0;
  @ViewChild('tableUsuarios') tableUsuarios!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data: IUsuario[] = [];
  displayedColumns: string[] = ['id','nome', 'telefone', 'action'];
  dataSource!: MatTableDataSource<any>;
  isEdit: boolean = false;
  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.initForm();
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  initForm() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
    });
  }

  resetForm() {
    this.form.reset();
  }

  salvar() {
    if (this.form.valid && !this.isEdit) {
      const user = this.initMock();
      this.data.push(user);
      this.tableUsuarios.renderRows();
      this.resetForm();
    } else if(this.form.valid && this.isEdit){
      const user = this.initMock();
      console.log(user)
      this.edit(user);
      this.tableUsuarios.renderRows();
      this.resetForm();
    }
  }

  delete(id: number){
    this.data.map( (value, index) => {
      if(value.id == id){
        this.data.splice(index,1)
        this.tableUsuarios.renderRows();
      }
    })
  }

  edit(usuario: IUsuario){
    this.form.setValue({
      nome: usuario.nome,
      telefone:usuario.telefone
    })
    this.isEdit = true;
    const user = this.initMock(usuario);
    this.data.map( (value, index) => {
      if(value.id == user.id){
        this.data.splice(index,0, user)
        this.tableUsuarios.renderRows();
      }
    })

  }

  cancelUpdate(){
    this.isEdit = false;
  }

  initMock(usuario?: IUsuario): any {
    let teste = {
      id: 0,
      nome: '',
      telefone: '',
    };
    this.idIncremente += 1;
    if(this.isEdit){
      // if(usuario)
      // this.idIncremente = usuario?.id
    }

    teste.id = this.idIncremente;
    teste.nome = this.form.get('nome')?.value;
    teste.telefone = this.form.get('telefone')?.value;

    return teste;
  }

  filter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this .dataSource.filter = filterValue.trim().toLowerCase();
  }
}
