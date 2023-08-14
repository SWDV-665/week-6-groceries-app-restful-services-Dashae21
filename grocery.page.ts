import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-grocery',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss']
})
export class GroceryPage {

  groceryItems: { name: string; quantity: number; completed: boolean }[] = [];
  newItemName: string = '';

  constructor(
    private toastController: ToastController,
    private http: HttpClient // Inject the HttpClient
  ) {}

  async addItem() {
    if (this.newItemName) {
      const newItem = { name: this.newItemName, quantity: 1, completed: false };
      
      // Make a POST request to add an item
      this.http.post('https://jsonplaceholder.typicode.com/posts', newItem).subscribe(response => {
        console.log('Item added:', response);
      });

      this.groceryItems.push(newItem);
      this.newItemName = '';

      this.toastController.create({
        message: 'Item added!',
        duration: 2000,
        position: 'bottom'
      }).then(toast => {
        toast.present();
      });
    }
  }

  // Rest of the code remains the same
}
