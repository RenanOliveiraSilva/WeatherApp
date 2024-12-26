import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import debounce from "lodash.debounce";
import { LocationObjectCoords } from 'expo-location';

interface ModalLocationProps {
    closeModal: () => void;
    onSelectLocation: (location: {
        name: string;
        lat: number;
        lon: number;
        country: string;
        state?: string;
      }) => void;

      currentLocation: LocationObjectCoords | null;
}

const API_KEY = 'SUACHAVEAQUI';

export default function ModalLocation({closeModal, onSelectLocation, currentLocation}: ModalLocationProps) {
    const [query, setQuery] = useState('');
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    if (!currentLocation) {
        return;
    }

  const fetchLocations = async (text: string) => {
    if (text.length < 3) {
      setLocations([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          q: text,
          limit: 5,
          appid: API_KEY,
        },
      });
      setLocations(response.data);
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce para otimizar chamadas à API
  const debouncedFetchLocations = useCallback(debounce(fetchLocations, 500), []);

  const handleChangeText = (text: string) => {
    setQuery(text);
    debouncedFetchLocations(text);
  };

  const handleSelect = (location: any) => {
    onSelectLocation(location);
    setQuery('');
    setLocations([]);
    closeModal()
  };

  // Função para definir a localização atual como a escolhida
  const handleUseCurrentLocation = () => {
    const location = {
      name: 'Localização Atual',
      lat: currentLocation.latitude,
      lon: currentLocation.longitude,
      country: 'Desconhecido',
    };
    onSelectLocation(location);
    closeModal(); // Fecha o modal
  };

  return (
        <Modal
            animationType="slide"
            transparent={true}
            
            onRequestClose={() => closeModal()} 
        >
            <View className="flex-1 justify-center items-center bg-black/75">
                <View className="bg-white rounded-lg w-11/12 p-5">
                    {/* Cabeçalho do Modal */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-semibold">Selecione uma localização</Text>
                        <TouchableOpacity 
                            onPress={() => closeModal()} 
                            accessible={true} 
                            accessibilityLabel="Fechar modal"
                        >
                            <Ionicons name="close-circle" size={28} color="gray" />
                        </TouchableOpacity>
                    </View>

                    {/* Conteúdo do Modal */}
                    <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginTop: 15, paddingHorizontal: 10 }}
            placeholder="Digite o nome da cidade"
            value={query}
            onChangeText={handleChangeText}
          />

          {/* Lista de Sugestões */}
          {loading ? (
            <ActivityIndicator className='h-40' size="large" color="#0000ff" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              className='h-40'
              data={locations}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)} style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
                  <Text style={{ fontSize: 16 }}>{item.name}, {item.state ? `${item.state}, ` : ''}{item.country}</Text>
                </TouchableOpacity>
              )}
              style={{ marginTop: 20 }}
            />
          )}  
          <View className="flex w-full justify-center items-center">
                    <TouchableOpacity
                        onPress={handleUseCurrentLocation}
                        activeOpacity={0.7}
                        className="rounded-md shadow-md bg-black py-2 px-4 flex-row items-center justify-center w-fit"
                        accessibilityRole="button"
                        accessibilityLabel="Usar localização atual"
                    >
                        
                                <Ionicons name="locate-sharp" size={16} color="white" style={{ marginRight: 8 }} />
                                <Text className="text-white text-lg font-semibold text-center">
                                    Usar localização atual
                                </Text>
                            
                    </TouchableOpacity>
            </View>
                </View>
            </View>
        </Modal>
  )
}
