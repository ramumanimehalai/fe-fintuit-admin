import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { EmailtemplateComponent } from './email-template/email-templates/email-templates.component';
import { NewemailtemplateComponent } from './email-template/new-email-template/new-email-template.component';
import { ChannelConfigurationComponent } from './channel-configuration/channel-configuration.component';
import { ChannelSettingComponent } from './channel-setting/channel-setting.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
    data: { breadcrumb: 'Home' }, // Root breadcrumb
  },
  {
    path: 'email-templates',
    component: EmailtemplateComponent,
    data: { breadcrumb: 'EMil Template' },
  },
  {
    path: 'create-new-email-template',
    component: NewemailtemplateComponent,
    data: { breadcrumb: 'New Email Template' },
  },
  {
    path: 'create-new-email-template/:id',
    component: NewemailtemplateComponent,
    data: { breadcrumb: 'New Email Template' },
  },
  {
    path: 'app-channel-configuration',
    component: ChannelConfigurationComponent,
    data: { breadcrumb: 'Add New Channel' },
  },
  {
    path: 'channel-setting',
    component: ChannelSettingComponent,
    data: { breadcrumb: 'Channel Setting' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
