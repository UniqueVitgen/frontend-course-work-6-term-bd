import {AbstractControl, FormControl} from '@angular/forms';
export class PasswordValidator {
    static onlyLetters = /^[a-zA-Zа-яА-Я]+$/;
    static onlyRussianLetters = /^[а-яА-Я]+$/;
    static onlyLatinLetters = /^[a-zA-Z]+$/;
    static atLeastOneLetterOfLettersAndNumbers = /^[0-9]*[A-Za-а-яА-Я][0-9A-Za-z$&+,:;=?@#|'<>.^*()%!-_]*$/;
    static onlyLettersAlert = 'Только символы русского и латинского алфавита';
    static onlyRussianLettersAlert = 'Только символы русского алфавита';
    static onlyLatinLettersAlert = 'Только символы латинского алфавита';
    static atLeastOneLetterOfLettersAndNumbersAlert = 'Как минимум один символ латинского алфавита';

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }

    static ifOtherFormControlTrue(otherControlName: string) {

        let thisControl: FormControl;
        let otherControl: FormControl;

        return function matchOtherValidate(control: FormControl) {

            if (!control.parent) {
                return null;
            }

            if (!thisControl) {
                thisControl = control;
                otherControl = control.parent.get(otherControlName) as FormControl;
                if (!otherControl) {
                    throw new Error('matchOtherValidator(): other control is not found in parent group');
                }
                otherControl.valueChanges.subscribe(() => {
                    thisControl.updateValueAndValidity();
                });
            }

            if (!otherControl) {
                return null;
            }
            if(otherControl.value == false) {
                thisControl.markAsTouched();
                return {
                    invalid: true
                }
            }
        }

    }
}