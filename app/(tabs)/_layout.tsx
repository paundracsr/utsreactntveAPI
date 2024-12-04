import {Tabs} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {DrawerToggleButton} from "@react-navigation/drawer";
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerLeft: () => <DrawerToggleButton />,
          title: "Home",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="List"
        options={{
          title: "List",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
