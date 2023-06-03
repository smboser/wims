import { Component, HostListener, OnInit } from '@angular/core';
import { ToggleService } from './toggle.service';
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { TokenService } from '../../authentication/login/token.service';
import { User } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  isToggled = false;

  constructor(
    private toggleService: ToggleService,
    private datePipe: DatePipe,
    public themeService: CustomizerSettingsService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.toggleService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggle() {
    this.toggleService.toggle();
  }

  toggleSidebarTheme() {
    this.themeService.toggleSidebarTheme();
  }

  toggleHideSidebarTheme() {
    this.themeService.toggleHideSidebarTheme();
  }

  toggleCardBorderTheme() {
    this.themeService.toggleCardBorderTheme();
  }

  toggleHeaderTheme() {
    this.themeService.toggleHeaderTheme();
  }

  toggleCardBorderRadiusTheme() {
    this.themeService.toggleCardBorderRadiusTheme();
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  currentDate: Date = new Date();
  formattedDate: any = this.datePipe.transform(
    this.currentDate,
    'dd MMMM yyyy'
  );
  public user: User = {};

  ngOnInit() {
    this.tokenService.user$.subscribe((user) => {
      this.user = { ...user };
    });
  }

  logout() {
    this.tokenService.clear();
    this.tokenService.user$.unsubscribe();
    this.router.navigate(['/authentication/login']);
  }
}
