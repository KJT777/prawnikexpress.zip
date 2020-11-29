const userFormSettings = [{
    name: 'Imie',
    id: 'name',
    valid: (value) => value.length >= 1,
    error: 'Pole jest puste'
}, {
    name: 'Nazwisko',
    id: 'lastName',
    valid: (value) => value.length >= 1,
    error: 'Pole jest puste'
}, {
    name: 'Pełny adres',
    id: 'fullAddress',
    valid: (value) => value.length >= 1,
    error: 'Pole jest puste'
}, {
    name: 'Telefon',
    id: 'phone',
    valid: (value) => {
        const reg = new RegExp('^[0-9\-\+]{9,15}$');
        return reg.test(value);
    },
    error: 'Podaj telefon w formacie: +48 123 456 789'
}, {
    name: 'E-mail',
    id: 'mail',
    valid: (value) => {
        const pattern = new RegExp('@');
        return !!value.match(pattern);
    },
    error: 'Nieprawidłowo wpisany mail'
}]