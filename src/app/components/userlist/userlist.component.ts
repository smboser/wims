import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from './user.service';
import { User } from '../interfaces';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  displayedColumns: string[] = [
    'fname',
    'lname',
    'email',
    'phone_primary',
    'phone_secondary',
    'address1',
    'created_date',
    'action',
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ongoing = true;
  pending = true;
  completed = true;
  subscriptions: Subscription[] = [];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.lists();
  }

  lists() {
    this.userService.getLists();
    this.subscriptions.push(
      this.userService.userList$.subscribe((User) => {
        this.dataSource = new MatTableDataSource(User);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  navigateEdit(userId: number) {
    this.router.navigate([`/admin/userdetail/${userId}`]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
  }
}

export interface PeriodicElement {
  deadline: string;
  assigned: any;
  taskName: string;
  completion: string;
  priority: string;
  action: string;
  status: any;
}
