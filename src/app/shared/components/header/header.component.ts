import { Component, OnInit } from '@angular/core';
// import { StorageService } from '../../../core/services/storage.service';
// import { ItemsMenuModel } from '../../../core/models/items-menu.model';
// import { DataAppService } from '../../../core/services/data-app.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // itemsMenu: ItemsMenuModel[] = [];

  namePage = "";

  // constructor(
  //   private storageService: StorageService,
  //   private dataAppService: DataAppService
  // ) {}

  // ngOnInit(): void {
  //   this.dataAppService.getIsNamePage().subscribe((page) => {
  //     this.namePage = page;
  //   });


  //   let path = document.location.pathname;
  //   let itemsMenu = this.storageService.readStorage('itemsMenu') as ItemsMenuModel[] | null;

  //   if (itemsMenu) {
  //     let menuActual = itemsMenu.find((menu) => menu.url == path);

  //     if (menuActual) {
  //       this.dataAppService.setIsNamePage(menuActual.name)
  //     }
  //   }
  // }

}