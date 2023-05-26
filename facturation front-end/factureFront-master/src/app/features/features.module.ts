import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { ManageConventionComponent } from './manage-convention/manage-convention.component';
import { ManageStructureComponent } from './manage-structure/manage-structure.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageFactureComponent } from './manage-facture/manage-facture.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from '../auth/interceptors/interceptor.interceptor';

@NgModule({
  declarations: [
    HomeComponent, 
    LandingPageComponent,
    ManageApplicationComponent,
    ManageConventionComponent,
    ManageFactureComponent, 
    ManageStructureComponent,
    ManageUsersComponent,
  
  ],
  imports: [
    FeaturesRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }
  ]
})
export class FeaturesModule { }
