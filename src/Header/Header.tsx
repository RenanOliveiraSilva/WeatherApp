import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

export function Header() {

    
  const statusBarHeight = Constants.statusBarHeight;

    return (
        <View style= {{ marginTop: statusBarHeight}} className="w-full justify-end items-end px-4">
            <Pressable>
                <Ionicons name="location-sharp" size={30}/>
            </Pressable>
        </View>
    );
}
