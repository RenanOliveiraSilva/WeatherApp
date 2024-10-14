import { Pressable, View, Modal, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useState } from "react";
import ModalLocation from "../Modal";
import { LocationObjectCoords } from "expo-location";

interface HeaderProps {
    timeOfDay: 'morning' | 'afternoon' | 'night' | 'rain';
    onLocationSelected : (lat: number, lon: number, name: string) => void;
    currentLocation: LocationObjectCoords | null;
    
}

export function Header({ timeOfDay, onLocationSelected, currentLocation  }: HeaderProps) {
    const statusBarHeight = Constants.statusBarHeight;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!currentLocation) {
        return;
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function colorOfStatusBar(){
        if (timeOfDay === 'rain') {
            return '#0D192B';
        }

        if (timeOfDay === 'morning') {
        return '#8BA9DF';
    
        } else if (timeOfDay === 'afternoon') {
            return '#E0928C';
    
        } 

        return '#543BA0';
        
    }

    const color = colorOfStatusBar();

    return (
        <>
            <View style= {{ height: statusBarHeight + 4, backgroundColor: color}} />
            <View className="flex w-full mt-1 justify-end items-end pr-5">
                <Pressable onPress={() => openModal()}>
                        <Ionicons name="earth-sharp" size={30} color="white"/>
                </Pressable>
                
                {isModalOpen && 
                     <ModalLocation 
                     closeModal={closeModal} 
                     onSelectLocation={(location) => {
                         onLocationSelected(location.lat, location.lon, location.name);
                     }} 
                     currentLocation={currentLocation}  // Passando a prop corretamente
                 />}
            </View>
        
        </>
    );
}
