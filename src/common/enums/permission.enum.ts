export enum Permission {
    // Admin permissions
    MANAGE_USERS = 'manage:users',
    MANAGE_PRODUCTS = 'manage:products',
    MANAGE_ORDERS = 'manage:orders',
    MANAGE_INVENTORY = 'manage:inventory',
    MANAGE_SYSTEM = 'manage:system',
    ADMIN_DASHBOARD_READ = 'admin:dashboard:read',

    // Customer permissions
    VIEW_PRODUCTS = 'view:products',
    CREATE_ORDER = 'create:order',
    VIEW_OWN_ORDER = 'view:own_order',
}
