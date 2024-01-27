import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { auth, firestore } from '../firebase';
import { collection, doc, onSnapshot, serverTimestamp, orderBy, addDoc, query } from 'firebase/firestore';

const IndividualChatScreen = ({ route }) => {
    const { chatId } = route.params;
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        const chatMessagesRef = collection(doc(firestore, 'individualChats', chatId), 'messages');
        const messagesQuery = query(chatMessagesRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const messagesData = snapshot.docs.map(doc => doc.data());
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }, [chatId]);

    const sendMessage = () => {
        if (messageText.trim() === '') return;

        addDoc(collection(doc(firestore, 'individualChats', chatId), 'messages'), {
            text: messageText,
            timestamp: serverTimestamp(),
            sender: auth.currentUser.uid
        })
            .then(() => {
                setMessageText('');
            })
            .catch(error => console.error('Error sending message:', error));
    };

    const sentbyUser = (item) => {
        return item.sender == auth.currentUser.uid
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={[
                        styles.messageContainer,
                        sentbyUser(item) ? styles.myMessageContainer : null
                    ]}>
                        <Text style={[
                            styles.messageText,
                            sentbyUser(item) ? styles.myMessageText : null
                        ]}>
                            {item.text}
                        </Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={messageText}
                    onChangeText={setMessageText}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 10,
    },
    messageContainer: {
        padding: 12,
        backgroundColor: '#e5e5e5',
        borderRadius: 12,
        marginBottom: 12,
        maxWidth: '70%',
        alignSelf: 'flex-start',
    },
    myMessageContainer: {
        padding: 12,
        backgroundColor: '#007bff',
        borderRadius: 12,
        marginBottom: 12,
        maxWidth: '70%',
        alignSelf: 'flex-end',
    },
    messageText: {
        fontSize: 16,
    },
    myMessageText: {
        fontSize: 16,
        color: '#ffffff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        fontSize: 16,
    },
});

export default IndividualChatScreen;
