import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export interface IDatos {
  id: number;
  montoSinIVA: number;
  iva: number;
  montoConIVA: number;
  fechaVenta: string;
  producto: string;
  vendedor:string;
  cliente:string;
  metodoPago:string;
}

const Contenido: IDatos[] = [
  {id:1, montoSinIVA:86, iva:13, montoConIVA:100,fechaVenta:'25/10/2019',producto:'Croquetas',vendedor:'Tonatiuh', cliente:'José',metodoPago:'efectivo'}
];


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  public modal: NgbModalRef;
  displayedColumns: string[] = ['id', 'montoSinIVA', 'iva', 'montoConIVA', 'fechaVenta', 'producto', 'vendedor','cliente','metodoPago','acciones'];
  dataSource = new MatTableDataSource<IDatos> (Contenido) ;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private modalService: NgbModal) {
  }
  public openAlta(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this .dataSource.paginator = this .paginator;
    }
  }
}
