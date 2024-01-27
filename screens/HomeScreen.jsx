import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
const HomeScreen = () => {
    const navigation = useNavigation();
    const [individualChats, setIndividualChats] = useState([]);
    const [groupChat, setGroupChat] = useState([]);
    useEffect(() => {
        // Fetch individual chats from Firestore
        const unsubscribeIndividual = onSnapshot(
            query(
                collection(firestore, 'individualChats'),
                where('participants', 'array-contains', auth.currentUser.email)
            ),
            (snapshot) => {
                const chats = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
                setIndividualChats(chats);
            }
        );
        // Fetch group chat from Firestore
        const unsubscribeGroup = onSnapshot(collection(firestore, 'groupChats'), (snapshot) => {
            const chats = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
            if (chats.length > 0) {
                setGroupChat(chats);
            } else {
                setGroupChat(null); // Set to null if no group chat found
            }
        });


        return () => {
            unsubscribeIndividual();
            unsubscribeGroup();
        };
    }, []);

    const handleIndividualChatPress = (chatId) => {
        navigation.navigate('IndividualChat', { chatId });
    };

    const handleGroupChatPress = (chatId, Chatname) => {
        navigation.navigate('GroupChat', { chatId, Chatname });
    };

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                // Navigate to the LoginScreen upon successful logout
                navigation.navigate('Login');
            })
            .catch(error => {
                console.error('Logout Error:', error);
            });
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Text style={styles.subtitle}>Individual Chats:</Text>
            <FlatList
                data={individualChats}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleIndividualChatPress(item.id)}>
                        <Text style={styles.chatItem}>{item.data.participants.map(participant => participant !== auth.currentUser.email ? participant.substring(0, 6) : '')}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
            <Text style={styles.subtitle}>Group Chats:</Text>
            {groupChat &&
                <FlatList
                    data={groupChat}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleGroupChatPress(item.id, item.data.name)}>
                            <Text style={styles.chatItem}>{item.data.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Button title="Logout" onPress={handleLogout} />
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chatItem: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '400',
        color: 'black',
        backgroundColor: '#f0f0f0', // Background color
        padding: 15, // Padding for better readability and appearance
        borderRadius: 10, // Rounded corners
    },
});

export default HomeScreen;
