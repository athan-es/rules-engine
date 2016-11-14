module.exports = {
    tableName: 'acl_user',
    attributes: {
        key: {
            type: 'string',
            required: true
        },
        roles: {
            collection: 'acl_roles',  //tells us what model to use
            via: 'users',          //tells us what attribute of stock will connect us back to "customer"
        }
    }
};