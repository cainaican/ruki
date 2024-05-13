import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApplicationVerifier, Auth, RecaptchaVerifier, User, getAuth, signInWithPhoneNumber, signOut, updateProfile, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AurthService } from 'src/app/demo/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
})
export class LoginComponent implements OnDestroy, OnInit {

    private auth: Auth = inject(Auth);

    passwordString: string;
    passwordRepeatString: string;
    loginString: string;
    phoneNumber: string;


    loggedIn: boolean;
    signedIn: boolean;


    appVerifier: ApplicationVerifier;
    appVerifierOpened: boolean = false;

    verificationOpened: boolean = false;
    verificationCode: string;


    user$ = user(this.auth);
    userSubscription: Subscription;

    constructor(
        public _layoutService: LayoutService, 
        private _messageService: MessageService,
        private _router: Router,
        private _aurthService: AurthService,
    ) { 
        this.userSubscription = this.user$.subscribe((aUser: User | null) => {
            if (aUser) {
                this.loggedIn = true;
                return;
            };
            this.loggedIn = false;
        })

        this.auth.useDeviceLanguage();

    }

    ngOnInit(){
        
        (window as any).recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {});
        (window as any).recaptchaVerifier.render();

        this.appVerifier = (window as any).recaptchaVerifier;
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    login(): void {
        this.phoneNumber = this.phoneNumber.replaceAll(" ", "");

        this._aurthService.getUserByPhoneNumber(this.phoneNumber)
            .then((v) => {
                if (!v.empty) {
            
                    this.appVerifierOpened = true;

                    return signInWithPhoneNumber(this.auth, this.phoneNumber, this.appVerifier)
                }

                const errMessage = "Пользователя с таким номером мобильного не существует";

                this._messageService.add({severity: "error", detail: errMessage, summary: "Регистрация"});

                throw new Error(errMessage);
            })
            .then(confirmationResult => {

                (window as any).confirmationResult = confirmationResult;

                this.appVerifierOpened = false;

                this.verificationOpened = true;

            })
            .catch((e) => {

                let userExistMessage = "Пользователя с таким номером мобильного не существует";

                if (e.message === userExistMessage) return;

                let mes: Message = {detail: e.message, severity: "Неизвестная ошибка входа", summary: "Вход"};

                this._messageService.add(mes);
            })


    }

    logout(): void {
       signOut(this.auth);
    }

    signInWithPhoneNumber(): void {

        this.phoneNumber = this.phoneNumber.replaceAll(" ", "");
        
        if (this.passwordString.length < 6) {
            const mes: Message = {detail: "Пароль должен быть более 6 символов", severity: "error", summary: "Регистрация"};
            this._messageService.add(mes);
            return;
        }

        if (this.passwordString !== this.passwordRepeatString) {
            const mes: Message = {detail: "Пароли не совпадают", severity: "error", summary: "Регистрация"};
            this._messageService.add(mes);
            return;
        }

       this._aurthService.getUserByPhoneNumber(this.phoneNumber)
            .then((v) => {
                if (v.empty) {
            
                    this.appVerifierOpened = true;

                    return signInWithPhoneNumber(this.auth, this.phoneNumber, this.appVerifier)
                }

                const errMessage = "Пользователь с таким номером мобильного уже существует";

                this._messageService.add({severity: "error", detail: errMessage, summary: "Регистрация"});

                throw new Error(errMessage);
            })
            .then(confirmationResult => {

                (window as any).confirmationResult = confirmationResult;

                this.appVerifierOpened = false;

                this.verificationOpened = true;

            })
            .catch((e) => {

                let userExistMessage = "Пользователь с таким номером мобильного уже существует";

                if (e.message === userExistMessage) return;

                let mes: Message = {detail: e.message, severity: "Неизвестная ошибка регситрации", summary: "Регистрация"};

                this._messageService.add(mes);
            })

        // return;

        // this.appVerifierOpened = true;

        // signInWithPhoneNumber(this.auth, this.phoneNumber, this.appVerifier)
        //     .then(confirmationResult => {

        //         debugger
        //         (window as any).confirmationResult = confirmationResult;

        //         this.appVerifierOpened = false;

        //         this.verificationOpened = true;

        //     })
        //     .catch((e) => {
        //         const mes: Message = {detail: e.message, severity: "error", summary: "Регистрация"}
        //         this._messageService.add(mes);
        //     })
        
    }

    changeForm(): void {
        this.phoneNumber = "";
        this.passwordString = "";
        this.passwordRepeatString = "";
        this.loginString = "";
        this.signedIn = !this.signedIn;
    }

    getDisplay(): string {
        return this.appVerifierOpened ? "flex" : "none";
    }

    async verifyCode(): Promise<void> {
        try {
            await (window as any).confirmationResult.confirm(this.verificationCode);
            await updateProfile(this.auth.currentUser, {displayName: this.loginString});
            await this.navigateToMainPage();
        } catch(e) {
            throw new Error(e);
        }
    }

    navigateToMainPage(): Promise<any> {
        return new Promise(() => {
            // const mes: Message = {detail: "Вы успешно зарегистрированы", severity: "success", summary: "Регистрация"};
            this.loginString = "";
            this.passwordString = "";
            this.passwordRepeatString = "";
            // this.messageService.add(mes);
            this._router.navigateByUrl("/");
        })
    }
}
