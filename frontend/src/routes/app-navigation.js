const permissions = {
	'superuser': 1,
	'administrator': 2,
	'merchant': 3,

}

const main = [
  { title: 'Home', icon: 'mdi-home', path: '/', permission: permissions.superuser },
  { title: 'Dashboard', icon: 'mdi-gauge', path: '/', permission: permissions.superuser },
  { title: 'Admin', icon: 'mdi-account-supervisor-circle', path: '/admin', permission: permissions.superuser },
  { title: 'Vendors', icon: 'mdi-cube-send', path: '/vendor', permission: permissions.superuser },
  { title: 'Teachers', icon: 'mdi-teach', path: '/teacher', permission: permissions.superuser },
  { title: 'Parents', icon: 'mdi-account-child-circle', path: '/parent', permission: permissions.superuser }
]

const superuser = [
  { title: 'Home', icon: 'mdi-home', path: '/', permission: permissions.superuser },
	{ title: 'Dashboard', icon: 'mdi-gauge', path: '/superuser', permission: permissions.superuser },
	{ title: 'Manage Schools', icon: 'mdi-school', path: '/superuser/schools', permission: permissions.superuser },
	{ title: 'Manage SuperUsers', icon: 'mdi-account-tie', path: '/superuser/superuser', permission: permissions.superuser },
  { title: 'Manage Admins', icon: 'mdi-account-cog', path: '/superuser/admin', permission: permissions.superuser }
]

const merchant = [
  { title: 'Home', icon: 'mdi-home', path: '/', permission: permissions.superuser },
  { title: 'Dashboard', icon: 'mdi-gauge', path: '/admin', permission: permissions.administrator },
  { title: 'Manage Teachers', icon: 'mdi-teach', path: '/admin/teachers', permission: permissions.administrator },
  { title: 'Manage Parents', icon: 'mdi-account-child-outline', path: '/admin/parents', permission: permissions.administrator },
  { title: 'Manage Students', icon: 'mdi-human-male-child', path: '/admin/students', permission: permissions.administrator },
  { title: 'Manage Vendors', icon: 'mdi-truck-fast-outline', path: '/admin/vendors', permission: permissions.administrator },
  { title: 'Manage Inventory', icon: 'mdi-package-variant', path: '/products-services', permission: permissions.administrator },
	{ title: 'Purchase Orders', icon: 'mdi-post-outline', path: '/admin/POs', permission: permissions.administrator },
	{ title: 'Email Notifications', icon: 'mdi-email', path: '/admin/email/notifications', permission: permissions.administrator },
	// { subtitle: 'Email Templates', icon: 'mdi-email', path: '/admin/email/templates', permissions.administrator },
  { title: 'Settings', icon: 'mdi-cog', path: '/admin/settings', permission: permissions.administrator }
]




export { main }
export { superuser }
export { merchant }

