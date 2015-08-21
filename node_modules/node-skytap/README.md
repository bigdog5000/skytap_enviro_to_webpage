node-skytap
===========
[![Build Status](https://travis-ci.org/fti-technology/node-skytap.svg?branch=master)](https://travis-ci.org/fti-technology/node-skytap)

This library wraps the Skytap API for use in Node.js applications. It is designed to work with node style callbacks as well as with Promises.  This library is still under active development to build out the full feature set of API calls plus additional functions that are common to managing Skytap environments.

### Usage

Install the module via NPM
```bash
npm install node-skytap
```

You can then include it as needed
```javascript
var Skytap = require('node-skytap');
```

You can obtain your API token
```javascript
var params = { 
  username: 'skytap_username',
  password: 'sktyap_password'
};

var token = Skytap.token(params, function(err, token) {
  console.log(err || token);
})
```

You should make calls using your token, though you can use the password if you so choose. 

To obtain a new instance of the API Client, use the `init` static function and include your `username` and `token`.
```javascript
var skytap = Skytap.init({
  username: 'skytap_username',
  token: 'skytap_token'
})
```


You can then use this instance to make calls to the API.  Calls support both node callbacks and Promises.
```javascript
// Using Node callbacks
skytap.projects.list(function(err, projects) {
  console.log(err || projects);
});

// Using Promises
skytap.projects.list()
.then(function(projects) {
  console.log(projects);  
})
.fail(function(err) {
  console.log(err);
})
```

###Initializing Skytap API Client

The `Skytap.init` method returns a new instance of the Skytap API Client based on the supplied connection information.  

If you want to use different credentials per-request you can do so by creating a new instance of the client. For example, to list environments for different users, you can do the following:

```javascript
// create an API client for user1
var user1 = Skytap.init({ 
  username: 'skytap_user1',
  token: 'skytap_user1_token'
});

// display environments for user1
user1.environments.list();

var user2 = Skytap.init({
  username: 'skytap_user2',
  token: 'skytap_user2_token'
});

// display environments for user2
user2.environments.list();
```

### Skytap Version 2 Methods

You can make requests to Skytap API Version 2 by specifying the `version: 'v2'` options when initializing the client.

```javascript
var skytap = Skytap.init({
  username: 'my_username',
  token: 'my_token',
  version: 'v2'
});
```

At the time of this change GET requests for many of the APIs are successful. POST/PUT/DELETE calls will result in an error. To use by V1 and V2 simulaneously, you will need to create multiple Skytap API Client instances and make your calls accordingly.

### API Reference

Refer to the source code for a full list of function calls and required parameters. Some of the functionality is listed below with examples of usage.

####Projects
```javascript
// List Projects 
skytap.projects.list(next);
skytap.projects.list(args, next);

// Get a project by id
skytap.projects.get({ project_id: 123 }, next);

// Get templates in a project
skytap.projects.templates({ project_id: 123 }, next);

// Get environments in a project
skytap.projects.environments({ project_id: 123 }, next);

// Add environment to a project
skytap.projects.addEnvironment({ project_id: 123, configuration_id: 1234 }, next);

// Remove environment form a project
skytap.projects.removeEnvironment({ project_id: 123, configuration_id: 1234 }, next);

// Add template to a project
skytap.projects.addTemplate({ project_id: 123, template_id: 333 }, next);

// Remove template from a project
skytap.projects.removeTemplate({ project_id: 123, template_id: 333}, next);
```

####Environments
```javascript
// List environments
skytap.environments.list(next);
skytap.environments.list(args, next);

// List all environments
// Notes: this requires Administrator access and iterates over all users
// USE WITH CAUTION!
skytap.environments.all(next);

// Get a specific environment
skytap.environments.get({ configuration_id: 1234 }, next);

// Create an environment from a template
skytap.environments.create({ template_id: 2222 }, next);

// Create an envirnoment from a configuration
skytap.environments.create({ configuration_id: 1234 }, next);

// Update an environment
skytap.environments.update({ configuration_id: 1234, name: 'My new name' }, next);

// Delete an environment
skytap.environments.del({ configuration_id: 1234 }, next);

// Start an environment
skytap.environments.start({ configuration_id: 1234 }, next);

// Stop an environment
skytap.environments.stop({ configuration_id: 1234 }, next);

// Suspend an environment
skytap.environments.suspend({ configuration_id: 1234 }, next);

// Wait for environment status
skytap.environments.waitForState({ configuration_id: 1234, runstate: 'running' }, next);
skytap.environments.waitForState({ configuration_id: 1234, runstate: 'stopped' }, next);
skytap.environments.waitForState({ configuration_id: 1234, runstate: 'suspended' }, next);

// Get user_data
skytap.environments.userdata({ configuration_id: 1234 }, next);

// Update user_data
skytap.environments.updateUserdata({ configuration_id: 1234, contents: 'Something' }, next);
```

####Templates
```javascript
// List of templates
skytap.templates.list(next);
skytap.templates.list(args, next);

// List all templates
// Notes: this requires Administrator access and iterates over all users
// USE WITH CAUTION!
skytap.templates.all(next);

// Get a specific template
skytap.templates.get({ template_id: 333 }, next);

// Create a template from an environment
skytap.templates.create({ configuration_id: 123 }, next);

// Update a template
skytap.templates.update({ template_id: 333, name: 'New name' }, next);

// Delete a template
skytap.templates.del({ template_id: 333 }, next);
```

####VMs
```javascript
// Get a VM
skytap.vms.get({ configuration_id: 1234, vm_id: 1 }, next);
skytap.vms.get({ template_id: 2222, vm_id: 2}, next);

// Update a VM
skytap.vms.update({ configuration_id: 1234, vm_id: 1, name: 'new name' }, next);
skytap.vms.update({ template_id: 2222, vm_id: 2, name: 'new name' }, next);

// Deletes a VM
skytap.vms.del({ configuration_id: 1234, vm_id: 1 }, next);
skytap.vms.del({ template_id: 2222, vm_id: 2 }, next);

// Get user_data
skytap.vms.userdata({ configuration_id: 1234, vm_id: 1 }, next);
skytap.vms.userdata({ template_id: 2222, vm_id: 2 }, next);

// Update user_data
skytap.vms.userdata({ configuration_id: 1234, vm_id: 1, contents: 'Something' }, next);
skytap.vms.userdata({ template_id: 2222, vm_id: 2, contents: 'Something' }, next);
```

####VPNs
```javascript
// List VPNs
skytap.vpns.list(next);
skytap.vpns.list(args, next);

// Get a VPN
skytap.vpns.get({ vpn_id: 'vpn-123' }, next);

// Attach a VPN to a network on a configuration
skytap.vpns.attach({ configuration_id: 1234, network_id: 555, vpn_id: 'vpn-123' }, next);

// Detach a VPN from a network on a configuration
skytap.vpns.detach({ configuration_id: 1234, network_id: 555, vpn_id: 'vpn-123' }, next);

// Connect a VPN on a network on a configuration
skytap.vpns.connect({ configuration_id: 1234, network_id: 555, vpn_id: 'vpn-123' }, next);

// Disconnect a VPN on a network on a configuration
skytap.vpns.disconnect({ configuration_id: 1234, network_id: 555, vpn_id: 'vpn-123' }, next);
```

####Users
```javascript

// List all accessible users
skytap.users.list(next);
skytap.users.list(args, next);

// Get a user
skytap.users.get({ user_id: 100 }, next);

```

####Usage Reports
```javascript

// Create a report
skytap.usage.create({ results_format: 'csv', resouce_type: 'svms', region: 'all', group_by: 'user', aggregate_by: 'month', start_date: '2015/04/01 00:00:00 -0800', end_date: '2015/04/30 23:59:59 -0800', utc: true }, next);

// Check a report status
skytap.usage.check({ report_id: 123456 }, next);

// Retrieve report results
skytap.usage.fetch({ report_id: 123456 }, next);
```

####Audit Reports
```javascript

// Create a report
skytap.usage.create({ date_start: { year: '2015', month: '04', day: '30', hour: '00', minute: '00' }, date_end: { year: '2015', month: '04', day: '30', hour: '23', minute: '59' } }, next);

// Check a report status
skytap.usage.check({ report_id: 123456 }, next);

// Retrieve report results
skytap.usage.fetch({ report_id: 123456 }, next);
```

####Additional Parameters
Parameters to an API call that aren't recognized will be added to the query string. One use of this is to query an environment without changing its idle time:

`environments.get({ configuration_id: 1234, keep_idle: true }`

List methods support optional arguments that can be passed.  For example, when using the v2 API calls to you can scope requests to the company and apply paging by doing the following:

`environments.list({ scope: 'company', offset: 0, count: 100 }, next);`

### Contributing

Formatting uses spaces instead of tabs and 2-space tabs.  

Please use JSHint via the grunt task `grunt validate`.

Please add proper unit test coverage in accordance with existing test patterns (API methods do not yet have test coverage or parameter validation).

### Change Log

####[0.7.0](/../../milestones/v0.7.0/)
* Adds support for audit report generation/retrieval

####[0.6.0](/../../milestones/v0.6.0/)
* Adds support for report generation/retrieval

####[0.5.0](/../../milestones/v0.5.0/)
* Adds optional option argument to list functions

####[0.4.1](/../../milestones/v0.4.1/)
* Fixes `vms.del`
* Fixes `environments.all` promise usage
* Added testing to cover api calls
* Additional uri cleanup for 

####0.4.0
* Added support for list/get of users
* Added support for retrieving all accessible environments and templates

####0.3.0
* Added support for V2 API calls

####0.2.0
* Added template list/get/create/update/delete
* Added add/remote template from project

####0.1.3 
* Moved repository to fti-technology

####0.1.2
* Added VPN connect/disconnect/attach support
* Added user_data support for environments and vms
* Updated code examples

####0.1.1
* Added start/stop/suspend helpers for environments

####0.1.0
* Initial release
