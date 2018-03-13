// This is a global helper
// setup file that is loaded via a "--require"
// option in mocha.opts.

// Mock variables that are injected by Webpack during normal build
global.ND_CLIENT_ID = 'some_client_id';
global.ND_CONTXT_AUTH_API = 'some_other_client_id';
global.ND_CLIENT_API_DEPENDENCIES = 'client_id_1,client_id_2,client_id_3';
