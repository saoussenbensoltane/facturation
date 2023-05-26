import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConventionService } from '../services/convention.service';
import { FeaturesModule } from '../features.module';
import * as moment from 'moment';
import { StructureService } from '../services/structure.service';
import { ApplicationService } from '../services/application.service';


@Component({
  selector: 'app-manage-convention',
  templateUrl: './manage-convention.component.html',
  styleUrls: ['./manage-convention.component.scss']
})
export class ManageConventionComponent implements OnInit {
  
  conventionForm!: FormGroup;
  visible!: boolean;
  conventionList: any[] = [];
  structureList: any[] = [];
  applicationCodeList: any[]= [];
  applications: any;
  applicationList: any[]=[];
  structers: any[]=[];

  constructor(
    private fb: FormBuilder,
    private conventionService: ConventionService,
    private structureService: StructureService,
    private aplicationService : ApplicationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  

  openDialog() {
    this.visible = true;
  }

  initForm() {
    this.conventionForm = this.fb.group({
      application: [, Validators.required],
      structure: [1, Validators.required],
      nbr_reel: [0, Validators.required],
      nbr_Min: [0, Validators.required],
      nbr_Max: [0, Validators.required],
      dateSignature: ['', Validators.required],
      dueDate: ['', Validators.required],
      conventionDuration: [0, Validators.required],
      montant:['',Validators.required],
    });
    this.structureService.getAllStructureWithoutMinistere().subscribe(structer => {
      console.log(structer);
      this.structers= structer;
    })

    this.aplicationService.getAllApplications().subscribe(aplication => {
      console.log(aplication);
      this.applications = aplication;
    })
      }

  submitConvention() {
    const dateSignatureYear = new Date(this.conventionForm.value.dateSignature).getFullYear();
    const dateSignatureDay = new Date(this.conventionForm.value.dateSignature).getDate();
    const dateSignatureMonth = new Date(this.conventionForm.value.dateSignature).getMonth() + 1;
    const d = `${dateSignatureDay}-${dateSignatureMonth}-${dateSignatureYear}`;
    console.log(d);
    console.log(dateSignatureDay);
        console.log(dateSignatureMonth);

    const convention = {
      ...this.conventionForm.value,
      dateSignature: moment(new Date(this.conventionForm.value.dateSignature)).format('DD-MM-yyyy'),
      dueDate: moment(new Date(this.conventionForm.value.dueDate)).format('DD-MM-yyyy'),

    };
    
    try {
      this.conventionService.createConvention(convention).subscribe(
        (data: any) => {
          this.conventionForm.reset();
          this.visible = false;
        },
        (error: any) => {
          alert('An error occurred while creating the convention. Please verify your inputs.');
          console.error(error);
        }
      );
    } catch (error: any) {
      alert('An error occurred while creating the convention. Please verify your inputs.');
      console.error(error);
    }
    
  }

 
getApplication() {
  this.conventionService['getApplication']().subscribe({
    next: (data: any[]) => {
      console.log(data);
      this.applicationList = data;
    },
    error: (error: any) => {
      console.log('An error occurred while fetching Apps:', error);
    }
  });
}
getStructures() {
  this.conventionService.getAllStructures().subscribe({
    next: (data: any[]) => {
      console.log(data);
      this.structureList = data;
    },
    error: (error: any) => {
      console.log('An error occurred while fetching structures:', error);
    }
  });
}
  
}
