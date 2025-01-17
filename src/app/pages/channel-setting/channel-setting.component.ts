import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DsBadgeComponent, DsButtonComponent, DsDropdwonPopupComponent, DsTableComponent, DsToggleComponent } from 'jas-ui-lib';
import { ApiService } from '../../service/api.service';

export type Varient = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'; // Define variants here

@Component({
  selector: 'app-channel-setting',
  standalone: true,
  imports: [DsButtonComponent, DsTableComponent,CommonModule,DsBadgeComponent,DsToggleComponent,DsDropdwonPopupComponent,],
  templateUrl: './channel-setting.component.html',
  styleUrl: './channel-setting.component.scss'
})
export class ChannelSettingComponent implements OnInit {
constructor(private route: Router, private apiService: ApiService) {}
channelSettigs = [];

ngOnInit(): void {
  // this.loadChannels()
}

// loadChannels() {
//   console.log('loadChannels')
//   this.apiService.getAllChannels({page: 1, size: 10}).subscribe({
//     next: (res: any) => {
//       console.log(res,"responseValue")
//       this.channelSettigs = res.data
//     },
//     error: (error) => {
//       console.error('error-->', error);
//     },
//     complete: () => {
//       // handle loaders
//     },
//   })
// }

  columns = [
    { label: 'ID', key: 'id' },
    { label: 'Region', key: 'region' },
    { label: 'Channel', key: 'channel' },
    { label: 'Status', key: 'status' },
    { label: 'Actions', key: 'actions' }
  ];
  data = [
    { id: '101', region: 'Europe', channel: ['Email','Push','whatsapp','SMS'], status: 'true' ,actions: ''},
    { id: '102', region: 'Russia', channel: ['SMS','Email'], status: 'true',actions: ''},
    { id: '103', region: 'United states of America', channel: ['whatsapp'], status: 'true',actions:  ''}
  ];
  channelVariants: { [key: string]: Varient } = {
    'Email': 'primary',
    'Push': 'success',
    'whatsapp': 'warning',
    'SMS': 'danger'
  };

  getChannelVariant(channel: string): Varient {
    return this.channelVariants[channel] || 'info';
  }
  toggleStatus(item: { id: string; status: string }): void {
    item.status = item.status === 'true' ? 'false' : 'true';  // Toggle between 'true' and 'false'
  }
  dropDownOptions = [
    { label: 'Edit', key: 'edit' },
    { label: 'Delete', key: 'delete' },
    { label: 'Pause', key: 'pause' }
  ];
  onButtonClicked(event: any): void {
    console.log('Dropdown option selected:', event);
  }

  navigateTo(url: string) {
    this.route.navigateByUrl(url);
  }
  
}
