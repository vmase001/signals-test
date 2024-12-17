import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  signal,
} from '@angular/core';
import { Color, Vehicle, VehicleResponse } from '.';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';

  // Injected services
  private http = inject(HttpClient);

  // Signals managed by the service
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  // Reset the quantity when the vehicle changes
  quantity = linkedSignal({
    source: this.selectedVehicle,
    computation: (v) => {
      if (v) {
        return 1;
      }
      return 0;
    },
  });

  // Computed signals
  total = computed(
    () => (this.selectedVehicle()?.cost_in_credits ?? 0) * this.quantity()
  );
  color = computed(() => (this.total() > 50000 ? Color.green : Color.blue));

  // Angular 19 dev preview of rxResource

  // vehiclesResource = rxResource({
  //   loader: () =>
  //     this.http
  //       .get<VehicleResponse>(this.vehicleUrl)
  //       .pipe(map((vr) => vr.results)),
  // });

  // must create a computed signal to trigger the resource in the template
  // vehicles = computed(() => this.vehiclesResource.value() ?? ([] as Vehicle[]));

  private vehicles$: Observable<Vehicle[]> = this.http
    .get<VehicleResponse>(this.vehicleUrl)
    .pipe(map((res) => res.results ?? []));

  vehicles = toSignal(this.vehicles$);

  // OR

  // private vehicles$: Observable<Vehicle[]> = this.http
  //   .get<VehicleResponse>(this.vehicleUrl)
  //   .pipe(map((res) => res.results ?? []))
  //   .pipe(tap((vehicles) => this.vehicles.set(vehicles)));

  // readonlyVehicles = toSignal(this.vehicles$);

  // vehicles = signal<Vehicle[]>([]);
}
