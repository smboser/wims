import { Component } from '@angular/core';

const ELEMENT_DATA = [
    {name: 'Hydrogen'},
    {name: 'Helium'},
    {name: 'Lithium'},
    {name: 'Beryllium'},
    {name: 'Boron'},
    {name: 'Carbon'},
    {name: 'Nitrogen'},
    {name: 'Oxygen'},
    {name: 'Fluorine'},
    {name: 'Neon'},
];

@Component({
    selector: 'app-ripple-table',
    templateUrl: './ripple-table.component.html',
    styleUrls: ['./ripple-table.component.scss']
})
export class RippleTableComponent {

    displayedColumns: string[] = ['name'];
    dataSource = ELEMENT_DATA;

}