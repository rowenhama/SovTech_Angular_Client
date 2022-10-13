import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {PersonService} from "./shared/person.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  breadCrumbItems: MenuItem[] = [];
  isLoading = false;
  total: number = 0;
  list: any[] = [];
  formQuery: FormControl = new FormControl('')

  cols: any[] = [
    {field: 'name', header: 'Name', sortable: true},
    {field: 'height', header: 'Height', sortable: true},
    {field: 'mass', header: 'Mass', sortable: false},
    {field: 'gender', header: 'Gender', sortable: false},
    {field: 'homeworld', header: 'Homeworld', sortable: false},
  ];

  constructor(private personService: PersonService) {

  }

  ngOnInit(): void {
    this.initBreadcrumbs();
    this.initPerson();
    this.valueChanges();
  }

  initBreadcrumbs(): void {
    this.breadCrumbItems = [
      {label: 'Home'},
      {label: 'Search People'},
    ];

  }

  initPerson(): void {
    this.isLoading = true;
    this.personService.getPersons().subscribe((persons) => {
      this.list = persons;
      this.total = persons.length;
      this.isLoading = false;
    });
  }

  searchPerson(search: string): void {
    this.isLoading = true;

    this.personService.searchPersons(search).subscribe((persons: any) => {
      this.list = persons;
      this.total = persons.length;
      this.isLoading = false;
    });
  }

  valueChanges(): void {
    this.formQuery.valueChanges.subscribe(value => {
      if (value && value != '') {
        this.searchPerson(value);
      }else {
        this.initPerson();
      }
    });
  }


}
