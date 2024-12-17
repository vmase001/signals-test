import { Component } from '@angular/core';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';

@Component({
  selector: 'app-root',
  imports: [VehicleSelectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'signals-test';
}
