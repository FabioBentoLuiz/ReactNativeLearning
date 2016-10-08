import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spiner } from './common';


class LoginForm extends Component {
state = { email: '', password: '', error: "", loading: false };

    onButtonPress() {
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication failed', loading: false });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spiner size="small" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                        Log in
                    </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        onChangeText={email => this.setState({ email })} 
                        value={this.state.email}
                        label="Email"
                        placeholder="john@hotmail.com"
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        label="Password"
                        secureTextEntry
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
