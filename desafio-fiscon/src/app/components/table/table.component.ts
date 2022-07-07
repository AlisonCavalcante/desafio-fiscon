import { IUsuario } from './../../shared/models/Usuario';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges{

  displayedColumns: string[] = [ 'nome', 'telefone'];
  @ViewChild('tableUsuarios') tableUsuarios!: MatTable<any>;
  @Input() set data(value: IUsuario[]){
    this._data = value;
  }
  private _data: IUsuario[] = [
  ];

  constructor() { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.usuarios);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['usuarios'].currentValue.length != 0){
      console.log(this._data)
      this.tableUsuarios?.renderRows();
      //  console.log(changes['usuarios'].currentValue)
    // }

  }

}
