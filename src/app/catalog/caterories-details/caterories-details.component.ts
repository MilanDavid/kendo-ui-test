import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'caterories-details',
  templateUrl: './caterories-details.component.html',
  styleUrls: ['./caterories-details.component.css']
})
export class CateroriesDetailsComponent implements OnInit {
  @Input() public category;

  public view: Observable<any>;
  public skip = 0;
  private editedRowIndex: number;
  private editedProduct: Product;

  constructor(private service: ProductsService) { }

  public ngOnInit(): void {
    this.view = this.service.getProducts(this.category.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ));
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.service.getProducts(this.category);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender, rowIndex);

    this.editedRowIndex = rowIndex;
    this.editedProduct = Object.assign({}, dataItem);

    sender.editRow(rowIndex);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  private closeEditor(grid, rowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.editedProduct = undefined;
  }

  public removeHandler({ dataItem }) {
    this.service.remove(this.category.key, dataItem.key);
  }

  public addHandler({ sender }, formInstance) {
    sender.addRow(new Product());
    formInstance.reset();
  }

  public saveHandler({ sender, rowIndex, dataItem, isNew }) {
    if(isNew) {
      this.service.addProduct(this.category.key, dataItem);
    } else {
      this.service.updateProduct(this.category.key, dataItem.key, dataItem);
    }

    sender.closeRow(rowIndex);

    this.editedRowIndex = undefined;
    this.editedProduct = undefined;
  }

}
