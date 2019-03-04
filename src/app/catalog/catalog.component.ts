import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { CatsService } from '../services/cats.service';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public view;
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  public skip = 0;
  private editedRowIndex: number;
  private editedProduct: Product;

  @ViewChild(GridComponent) grid: GridComponent;

  constructor(private cats: CatsService) { }

  public ngOnInit(): void {
    this.view = this.cats.getCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ));

    this.loadData();
  }

  public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.sort = sort;

    this.loadData();
  }

  public ngAfterViewInit(): void {
    this.grid.expandRow(0);
  }

  private loadData(): void {
  }

  public addHandler({ sender }, formInstance) {
    formInstance.reset();

    sender.addRow(new Product());
  }

  public saveHandler({ sender, rowIndex, dataItem, isNew }) {
    if(isNew) {
      this.cats.addCategories(dataItem);
    } else {
      this.cats.update(dataItem.key, dataItem);
    }

    sender.closeRow(rowIndex);

    this.editedRowIndex = undefined;
    this.editedProduct = undefined;
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.editedRowIndex = rowIndex;
    this.editedProduct = Object.assign({}, dataItem);

    sender.editRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.cats.remove(dataItem.key);
  }

  private closeEditor(grid, rowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.editedProduct = undefined;
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }
}
