import { IUsuario } from './../../shared/models/Usuario';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.css'],
})
export class FormularioCadastroComponent implements OnInit {
  form!: FormGroup;
  @Output() public emmitUsuario: EventEmitter<IUsuario> = new EventEmitter();
  idIncremente: number = 0;
  @ViewChild('tableUsuarios') tableUsuarios!: MatTable<any>;
  data: IUsuario[] = [];
  dataFilter: IUsuario[] = [];
  displayedColumns: string[] = ['id','nome', 'telefone'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
    });
  }

  resetForm() {
    this.form.reset();
  }

  salvar() {
    if (this.form.valid) {
      const user = this.initMock();
      this.data.push(user);
      this.dataFilter.push(user);
      this.tableUsuarios.renderRows();
    }
  }

  initMock(): any {
    let teste = {
      id: 0,
      nome: '',
      telefone: '',
    };
    this.idIncremente += 1;
    teste.id = this.idIncremente;
    teste.nome = this.form.get('nome')?.value;
    teste.telefone = this.form.get('telefone')?.value;

    return teste;
  }

  filter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    const usuariosFilter = this.dataFilter.filter((usuario: any) => {
      return !usuario.nome.indexOf(filterValue);
    })
    this.data = usuariosFilter;
  }
}
