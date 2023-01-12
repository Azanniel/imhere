import { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    const isParticipantNameEmpty = !Boolean(participantName.trim());
    if(isParticipantNameEmpty) {
      return false;
    }

    const participantWithoutEmptySpaces = participantName.trim();
    if(participants.includes(participantWithoutEmptySpaces)) {
      return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome.');
    }

    setParticipants(prevState => [...prevState, participantWithoutEmptySpaces]);
    setParticipantName('');
  }

  function removeParticipant(name: string) {
    Alert.alert('Remover', `Remover participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          const participantsWithoutOneDeleted = participants.filter(participant => {
            return participant !== name
          });

          setParticipants(participantsWithoutOneDeleted);
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Evento Expo Go
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 09 de Dezembro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={participantName}
          onChangeText={setParticipantName}
          onSubmitEditing={handleParticipantAdd}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>
        Participantes
      </Text>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({item: participant}) => (
          <Participant
              key={participant}
              name={participant}
              onRemove={removeParticipant}
            />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  );
}