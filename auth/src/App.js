import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spiner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        // Initialize with your Firebase configuration
            firebase.initializeApp({
            apiKey: '',
            authDomain: '',
            databaseURL: '',
            storageBucket: '',
            messagingSenderId: ''
        });

        firebase.auth().onAuthStateChanged((user) => { 
            if (user) { 
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true: return (
                <Button onPress={() => firebase.auth().signOut()}> 
                    Log Out 
                </Button>
                );
            case false: return <LoginForm />;
            default: return <Spiner />;
        }
    }


    render() {
        return (
            <View>
            <Header headerText='Authentication' />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
