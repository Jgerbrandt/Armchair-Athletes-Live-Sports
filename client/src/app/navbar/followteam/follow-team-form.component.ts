import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Team } from 'src/app/team';

@Component({
  selector: 'app-team-form',
  template: `
    <form class="team-form" autocomplete="off" [formGroup]="teamForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="sport" formControlName="sport" placeholder="Golf" required>
        <label for="sport">Sport</label>
      </div>

      <div *ngIf="sport.invalid && (sport.dirty || sport.touched)" class="alert alert-danger">
        <div *ngIf="sport.errors?.['required']">
          A Sport is required.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="teamName" formControlName="teamName" placeholder="OL Blues" required>
        <label for="teamName">Team Name</label>
      </div>

      <div *ngIf="teamName.invalid && (teamName.dirty || teamName.touched)" class="alert alert-danger">
        <div *ngIf="teamName.errors?.['required']">
          A Team Name is required.
        </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="teamForm.invalid">Add</button>
    </form>
  `
})
export class TeamFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Team> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Team>();

  @Output()
  formSubmitted = new EventEmitter<Team>();

  teamForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get sport() { return this.teamForm.get('sport')!; }
  get teamName() { return this.teamForm.get('teamName')!; }
  
  ngOnInit() {
    this.initialState.subscribe(team => {
      this.teamForm = this.fb.group({
        sport: [team.sport, [Validators.required]],
        teamName: [team.teamName, [Validators.required]]
      });
    });

    this.teamForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.teamForm.value);
  }
}