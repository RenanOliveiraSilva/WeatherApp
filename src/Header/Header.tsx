import { Pressable, View, Modal, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useState } from "react";

interface HeaderProps {
    timeOfDay: 'morning' | 'afternoon' | 'night';
}

export function Header({ timeOfDay }: HeaderProps) {
    const [openModal, setOpenModal] = useState(false);
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => setOpenModal(false)} // Fecha o modal quando o usuário pressiona o botão de voltar no Android
            >
                <View className="flex-1 justify-center items-center bg-black/75">
                    <View className="bg-white rounded-lg w-11/12 p-5">
                        {/* Cabeçalho do Modal */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-semibold">Detalhes da Localização</Text>
                            <TouchableOpacity 
                                onPress={() => setOpenModal(false)} 
                                accessible={true} 
                                accessibilityLabel="Fechar modal"
                            >
                                <Ionicons name="close-circle" size={28} color="gray" />
                            </TouchableOpacity>
                        </View>

                        {/* Conteúdo do Modal */}
                        <Text className="mb-4">Aqui você pode exibir informações adicionais sobre a localização.</Text>
                        
                        {/* Exemplo de conteúdo adicional */}
                        <Text className="mb-4">Latitude: -23.5505</Text>
                        <Text className="mb-4">Longitude: -46.6333</Text>

                    </View>
                </View>
            </Modal>
            <View style= {{ height: statusBarHeight + 4, backgroundColor: color}} />
            <View className="flex w-full mt-1 justify-end items-end pr-5">
                <Pressable onPress={() => setOpenModal(true)}>
                        <Ionicons name="location-sharp" size={30} color="white"/>
                </Pressable>
            </View>
        
        </>
    );
}
