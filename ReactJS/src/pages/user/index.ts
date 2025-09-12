export { default as User } from "./User";
//  const navigate = useNavigate();
//   const groups: Group[] = Array.from(new Set(storePermissions.map(sp => sp.split("_")[1])))
//   const permissionGroups: Record<Group, Permission[]> = {};

//   groups.forEach((group) => {
//     const groupPermissions = storePermissions.filter(sp => sp.endsWith(`_${group}`));
//     permissionGroups[group] = groupPermissions;
//   })

//   const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])
//   const [selectedGroups, setSelectedGroups] = useState<Group[]>([])

//   const handlePermissionsSelection = (permission: Permission) => {

//     const group = permission.split("_")[1];
//     let tempPermissions: Permission[] = [];

//     if (selectedPermissions.includes(permission)) {
//       tempPermissions = selectedPermissions.filter(perm => perm !== permission);
//     } else {
//       tempPermissions = [...selectedPermissions, permission];
//     }

//     const isPresent = permissionGroups[group].every(el => tempPermissions.includes(el));

//     if (isPresent) {
//       setSelectedGroups([...selectedGroups, group])
//     } else {
//       setSelectedGroups(selectedGroups.filter(grp => grp !== group))
//     }
//     setSelectedPermissions(tempPermissions)

//   }

//   const handleGroupSelection = (group: Group) => {
//     let tempGroups = [];
//     let tempPermissions = [];
//     const permissions = permissionGroups[group];
//     if (selectedGroups.includes(group)) {
//       console.log(selectedGroups)
//       tempGroups = selectedGroups.filter(sg => sg !== group);
//       tempPermissions = selectedPermissions.filter(sp => !permissions.includes(sp))

//     } else {
//       tempGroups = [...selectedGroups, group]
//       tempPermissions = Array.from(new Set([...selectedPermissions, ...permissions]))
//     }
//     // console.log(tempPermissions)
//     setSelectedGroups(tempGroups);
//     setSelectedPermissions(tempPermissions)
//   }