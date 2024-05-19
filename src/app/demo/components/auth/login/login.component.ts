import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApplicationVerifier, Auth, RecaptchaVerifier, User, signInWithPhoneNumber, signOut, updateProfile, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';
import { DocumentReference } from '@angular/fire/firestore';

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
        private _aurthService: AuthService,
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

        if(!this.validatePhoneNumber()) return;

        this._aurthService.getUserByPhoneNumber(this.phoneNumber)
            .then((v) => {

                if (!v.empty) {
            
                    this.appVerifierOpened = true;

                    return signInWithPhoneNumber(this.auth, this.phoneNumber, this.appVerifier)
                }

                const errMessage = "Пользователя с таким номером мобильного не существует";

                this._messageService.add({severity: "error", detail: errMessage, summary: "Вход"});

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

        if(!this.validatePhoneNumber()) return;
        
        if(!this.validateName()) return;

        this.phoneNumber = this.phoneNumber.replaceAll(" ", "");

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

                return this._aurthService.saveUser({name: this.loginString, phoneNumber: this.phoneNumber,userId: this.auth.currentUser.uid});

            })
            .then((documentReference: DocumentReference) => {
                this._messageService.add({severity: "success", detail: "Вы успешно зарегистрированы"});
                return this.navigateToMainPage();
            })
            .catch((e) => {

                let userExistMessage = "Пользователь с таким номером мобильного уже существует";

                if (e.message === userExistMessage) return;

                let mes: Message = {detail: e.message, severity: "Неизвестная ошибка регситрации", summary: "Регистрация"};

                this._messageService.add(mes);
            })
        
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

    validatePhoneNumber(): boolean {

        if(!this.phoneNumber || this.phoneNumber.length !== 16) {
            this._messageService.add({severity: "error", detail: "Введите корректный номер телефона", summary: "Ошибка входа"});
            return false;
        }

        this.phoneNumber = this.phoneNumber
            .replaceAll("-", "")
            .replaceAll("(", "")
            .replaceAll(")", "");

            return true;
    }

    validateName(): boolean {

        if(!this.loginString) {
            this._messageService.add({severity: "error", detail: "Введите имя пользователя", summary: "Ошибка регистрации"});
            return false;
        }

        return true;
    }
}
