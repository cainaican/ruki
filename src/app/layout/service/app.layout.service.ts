import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    _config: AppConfig = {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14,
    };

    config = signal<AppConfig>(this._config);

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };
    // createMap = new Subject<boolean>();

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();
    private mapElem: HTMLDivElement;
    private layoutMain: HTMLDivElement;

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    constructor() {
        effect(() => {
            const config = this.config();
            if (this.updateStyle(config)) {
                this.changeTheme();
            }
            this.changeScale(config.scale);
            this.onConfigUpdate();
        });
    }

    initializeMapWidth(){
        this.mapElem = document.querySelector(".map");
        this.layoutMain = document.querySelector(".layout-main");

        const lauoutWidth = this.layoutMain?.getBoundingClientRect().width;

        if (!this.mapElem) return;

        setTimeout(() => {
            this.mapElem.style.width = `${lauoutWidth}px`;
        })
        if (this.isOverlay()) {
            this.mapElem.style.left = "28px";
            return;
        }

        if(this.isDesktop()){
            if (this.state.staticMenuDesktopInactive) {
                // this.mapElem.style.left = "0px";
                return;
            }
            if(this.state.staticMenuMobileActive) {
                // this.mapElem.style.left = "0px";
                return;
            }
            // this.mapElem.style.left = "350px";

        }

    }

    updateStyle(config: AppConfig) {
        return (
            config.theme !== this._config.theme ||
            config.colorScheme !== this._config.colorScheme
        );
    }

    onMenuToggle() {

        setTimeout(() => {
            const lauoutWidth = this.layoutMain.getBoundingClientRect().width;
            this.mapElem.style.width = `${lauoutWidth}px`;
        }, 200)
        
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
            this.mapElem.style.left = "28px";
            return;
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;

            if (this.state.staticMenuDesktopInactive) {
                // this.mapElem.style.left = "0px";
                // this.mapElem.style.marginLeft = "30px";
                return;
            }
            // this.mapElem.style.left = "350px";
            // this.mapElem.style.marginLeft = "0px";


        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
            if (this.state.staticMenuMobileActive) {
                // this.mapElem.style.left = "350px";
                // this.mapElem.style.marginLeft = "0px";
                return;
            }
            // this.mapElem.style.left = "0px";
            // this.mapElem.style.marginLeft = "30px";
        }


    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config().menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this._config = { ...this.config() };
        this.configUpdate.next(this.config());
    }

    changeTheme() {
        const config = this.config();
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const themeLinkHref = themeLink.getAttribute('href')!;
        const newHref = themeLinkHref
            .split('/')
            .map((el) =>
                el == this._config.theme
                    ? (el = config.theme)
                    : el == `theme-${this._config.colorScheme}`
                    ? (el = `theme-${config.colorScheme}`)
                    : el
            )
            .join('/');

        this.replaceThemeLink(newHref);
    }
    replaceThemeLink(href: string) {
        const id = 'theme-css';
        let themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );
        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }

    changeScale(value: number) {
        document.documentElement.style.fontSize = `${value}px`;
    }
}
