import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements AfterViewInit {

    displayedColumns: string[] = ['name', 'date'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    date: string;
    name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        name: 'Hello  –  Trip home from 🎉 Colombo has been arranged, then Jenna will com...',
        date: '10 Mar 2023'
    },
    {
        name: `Last pic over my village  –  Yeah i'd like that! Do you remember the video som..`,
        date: '09 Feb 2023'
    },
    {
        name: `Mochila Beta: Subscription Confirmed  –  You've been confirmed! Welcome to `,
        date: '03 Mar 2023'
    },
    {
        name: `You've been confirmed! Welcome to the ruling class of the inbox. For your `,
        date: '02 Mar 2023'
    },
    {
        name: `For your records, here is a copy of the information you submitted to us...`,
        date: '25 Feb 2023'
    },
    {
        name: `Hello  –  Trip home from 🎉 Colombo has been arranged, then Jenna will com...`,
        date: '02 Apr 2023'
    },
    {
        name: `Off on Thursday  –  Eff that place, you might as well stay here with us inst`,
        date: '01 Feb 2023'
    },
    {
        name: `Trip home from 🎉 Colombo has been arranged, then Jenna will come to hom...`,
        date: '10 Mar 2023'
    },
    {
        name: `This Week's Top Stories  –  Our top pick for you on Medium this week The`,
        date: '05 Feb 2023'
    },
    {
        name: `Weekend on Revibe  –  Today's Friday and we thought maybe you want so`,
        date: '05 Mar 2023'
    },
    {
        name: `You can now use your storage in Google Drive  –  Hey Nicklas Sandell! Tha`,
        date: '05 Mar 2023'
    },
    {
        name: `Hello  –  Trip home from 🎉 Colombo has been arranged, then Jenna will com...`,
        date: '02 Apr 2023'
    },
    {
        name: `Off on Thursday  –  Eff that place, you might as well stay here with us inst`,
        date: '01 Feb 2023'
    },
    {
        name: `Trip home from 🎉 Colombo has been arranged, then Jenna will come to hom...`,
        date: '10 Mar 2023'
    },
    {
        name: `This Week's Top Stories  –  Our top pick for you on Medium this week The`,
        date: '05 Feb 2023'
    },
    {
        name: `Weekend on Revibe  –  Today's Friday and we thought maybe you want so`,
        date: '05 Mar 2023'
    },
    {
        name: `You can now use your storage in Google Drive  –  Hey Nicklas Sandell! Tha`,
        date: '05 Mar 2023'
    }
];