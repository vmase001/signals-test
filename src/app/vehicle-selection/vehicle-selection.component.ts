import { Component, inject, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-selection',
  imports: [FormsModule],
  templateUrl: './vehicle-selection.component.html',
  styleUrl: './vehicle-selection.component.css',
})
export class VehicleSelectionComponent {
  private vehicleService = inject(VehicleService);

  vehicles = this.vehicleService.vehicles;
  selectedVehicle = this.vehicleService.selectedVehicle;
  quantity = this.vehicleService.quantity;
  total = this.vehicleService.total;
  color = this.vehicleService.color;
}
