import { Component } from '@angular/core';
import { ToggleService } from '../header/toggle.service';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { TokenService } from '../../authentication/login/token.service';
import { Subscription, take } from 'rxjs';
import { User } from '../../interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  panelOpenState = false;
  subscriptions: Subscription[] = [];
  isToggled = false;
  user: User = [];

  constructor(
    private toggleService: ToggleService,
    public themeService: CustomizerSettingsService,
    private tokenService: TokenService
  ) {
    this.tokenService.valid();
    this.subscriptions.push(
      this.toggleService.isToggled$.subscribe((isToggled) => {
        this.isToggled = isToggled;
      })
    );

    this.subscriptions.push(
      this.tokenService.user$.subscribe((user) => {
        this.user = user;
      })
    );
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

  ngOnDestroy(): void {
    console.log('on destroy');
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
