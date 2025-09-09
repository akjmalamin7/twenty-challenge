import { Badge, BlockStack, Box, InlineStack } from "@/shared/uiLibrary";
import { useState } from "react";

const storePermissions = [
  "read_app",
  "create_app",
  "update_app",
  "delete_app",
  "read_brand",
  "update_brand",
  "read_domain",
  "create_domain",
  "update_domain",
  "delete_domain",
  "read_media",
  "create_media",
  "update_media",
  "delete_media",
  "read_preset",
  "create_preset",
  "update_preset",
  "delete_preset",
  "read_shop",
  "update_shop",
  "read_staff",
  "create_staff",
  "update_staff",
  "delete_staff",
  "read_store",
  "update_store",
  "read_metafield",
  "create_metafield",
  "update_metafield",
  "delete_metafield",
  "read_location",
  "create_location",
  "update_location",
  "delete_location",
  "read_redirect",
  "create_redirect",
  "update_redirect",
  "delete_redirect",
  "read_blog",
  "create_blog",
  "update_blog",
  "delete_blog",
  "read_checkout",
  "update_checkout",
  "read_article",
  "create_article",
  "update_article",
  "delete_article",
  "read_linklist",
  "create_linklist",
  "update_linklist",
  "delete_linklist",
  "read_page",
  "create_page",
  "update_page",
  "delete_page",
  "read_inventory",
  "create_inventory",
  "update_inventory",
  "delete_inventory",
  "read_variant",
  "create_variant",
  "update_variant",
  "delete_variant",
  "read_product",
  "create_product",
  "update_product",
  "delete_product",
  "read_market",
  "create_market",
  "update_market",
  "delete_market",
  "read_collection",
  "create_collection",
  "update_collection",
  "delete_collection",
  "read_purchase",
  "create_purchase",
  "update_purchase",
  "delete_purchase",
  "read_transfer",
  "create_transfer",
  "update_transfer",
  "delete_transfer",
  "read_customer",
  "create_customer",
  "update_customer",
  "delete_customer",
  "read_segment",
  "create_segment",
  "update_segment",
  "delete_segment",
  "read_metaobject",
  "create_metaobject",
  "update_metaobject",
  "delete_metaobject",
  "read_file",
  "create_file",
  "update_file",
  "delete_file",
  "read_analytics",
  "create_analytics",
  "update_analytics",
  "delete_analytics",
  "read_discount",
  "create_discount",
  "update_discount",
  "delete_discount",
  "read_plan",
  "create_plan",
  "update_plan",
  "delete_plan",
  "read_payment",
  "create_payment",
  "update_payment",
  "delete_payment",
  "read_shipping",
  "create_shipping",
  "update_shipping",
  "delete_shipping",
  "read_delivery",
  "create_delivery",
  "update_delivery",
  "delete_delivery",
  "read_pickup",
  "create_pickup",
  "update_pickup",
  "delete_pickup",
  "read_tax",
  "create_tax",
  "update_tax",
  "delete_tax",
  "read_order",
  "create_order",
  "update_order",
  "delete_order",
  "read_translation",
  "create_translation",
  "update_translation",
  "delete_translation",
  "read_theme",
  "create_theme",
  "update_theme",
  "delete_theme"
] as const

type Permission = (typeof storePermissions)[number];
type Group = string;
const User = () => {

  const groups: Group[] = Array.from(new Set(storePermissions.map(pr => pr.split("_")[1])))
  const permissionGroups: Record<Group, Permission[]> = {}

  groups.forEach(gp => {
    const groupPermissions = storePermissions.filter(sp => sp.endsWith(`_${gp}`));
    permissionGroups[gp] = groupPermissions;
  })

  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([])


  const handlePermissionsSelection = (permission: Permission) => {
    const group = permission.split("_")[1];
    let tempPermissions: Permission[] = [];

    if (selectedPermissions.includes(permission)) {
      tempPermissions = selectedPermissions.filter(pr => permission !== pr);
    } else {
      tempPermissions = [...selectedPermissions, permission];
    }
    const isPresent = permissionGroups[group].every(el => tempPermissions.includes(el));
    if (isPresent) {
      setSelectedGroups([...selectedGroups, group])
    } else {
      setSelectedGroups(selectedGroups.filter(el => el !== group))
    }
    setSelectedPermissions(tempPermissions)
  }


  const handleGroupSelection = (group: Group) => {
    let tempGroups = [];
    let tempPermissions = [];
    const permissions = permissionGroups[group];
    if (selectedGroups.includes(group)) {
      tempGroups = selectedGroups.filter(sg => sg !== group)
      tempPermissions = selectedPermissions.filter(sp => !permissions.includes(sp))
    } else {
      tempGroups = [...selectedGroups, group]
      tempPermissions = Array.from(new Set([...selectedPermissions, ...permissions]))
    }
    setSelectedGroups(tempGroups)
    setSelectedPermissions(tempPermissions)
  }
  return (
    <Box className="!max-w-[960px] mx-auto">
      <BlockStack>
        {
          groups.map(group => (
            <InlineStack key={group} alignItems={"initial"} className="overflow-hidden border-b border-b-gray-300">
              <Box className="!w-[130px]  flex items-center" padding={40} background="secondary">
                <Badge variant={selectedGroups.includes(group) ? "info" : "neutral"} onClick={() => handleGroupSelection(group)} className="md:cursor-pointer"> {group}</Badge>
              </Box>
              <InlineStack gap={40} padding={60} flexWrap="wrap" className="!bg-gray-100">
                {
                  permissionGroups[group].map(gp => <Badge
                    key={gp}
                    onClick={() => handlePermissionsSelection(gp)}
                    variant={selectedPermissions.includes(gp) ? "info" : "neutral"}
                    className="md:cursor-pointer"
                  >{gp}</Badge>)
                }
              </InlineStack>
            </InlineStack>
          ))
        }
      </BlockStack>
    </Box>
  );
};
export default User;