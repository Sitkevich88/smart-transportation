const ROLE = {
    USER: 'user',
    CUSTOMER: 'customer',
    OPERATOR: 'operator'
};

module.exports = {
    ROLE: ROLE,
    users: [
        {id: 1, firstName: 'Ivan', lastName: 'Ivanov', role: ROLE.CUSTOMER},
        {id: 2, firstName: 'Olia', lastName: 'Chernaya', role: ROLE.OPERATOR}
    ]
}