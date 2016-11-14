module.exports = {
    tableName: 'acl_roles',
    attributes: {
        key: {
            type: 'string',
            required: true
        },
        users: {
            collection: 'acl_user',  //tells us what model to use
            via: 'roles',          //tells us what attribute of stock will connect us back to "customer"
        }
    }
};