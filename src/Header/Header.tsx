import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

interface HeaderProps {
    timeOfDay: 'morning' | 'afternoon' | 'night';
}


export function Header({ timeOfDay }: HeaderProps) {

    
  const statusBarHeight = Constants.statusBarHeight;

    function colorOfStatusBar(){
        if (timeOfDay === 'morning') {
        return '#8BA9DF';
    
        } else if (timeOfDay === 'afternoon') {
            return '#E0928C';
    
        } 

        console.log(timeOfDay);
        return '#543BA0';
        
    }

    const color = colorOfStatusBar();

    return (
        <>
            <View style= {{ height: statusBarHeight + 4, backgroundColor: color}} />
            <View className="flex w-full mt-1 justify-end items-end pr-5">
                <Pressable>
                        <Ionicons name="location-sharp" size={30} color="white"/>
                </Pressable>
            </View>
        
        </>
    );
}
