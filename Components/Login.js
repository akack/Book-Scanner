import React, { Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from './forms/FormInput'
import FormButton from './forms/FormButton'
import ErrorMessage from './forms/ErrorMessage'
import { AppService } from '../app.service';
import { Container } from 'native-base';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    password: Yup.string()
        .label('Password')
        .required()
        .min(6, 'Password must have more than 6 characters ')
});

export default class LoginScreen extends React.Component {
    appService = new AppService;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goToSignup = () => {
        this.props.navigation.navigate('RegisterScreen');
    }

    handleSubmit = values => {
        //this.props.navigation.navigate('HomeScreen');
        if (values.email.length > 0 && values.password.length > 0) {
            console.log('Pass/email: ', values.email, values.password);
            this.appService.singInFireBase(values.email, values.password)
                .then(
                    (res) => {
                        console.log('res', res.user.uid)
                        this.appService.getUserDetails(res.user.uid)
                            .then(
                                async res => {
                                    //await AsyncStorage.setItem("user", JSON.stringify(res));
                                    if(res === true) {
                                        this.setState({
                                            email: '',
                                            password: ''
                                        });
                                        this.props.navigation.navigate('HomeScreen');
                                    }
                                   
                                },
                                err => {
                                    this.setState({
                                        err: true
                                    })
                                    this.error = true;
                                    console.log('error 2', err)
                                }
                            )
                    },
                    err => {
                        console.log(err)
                        Alert.alert(
                            'Login Error',
                            'Invalid email / password.'
                        )
                    }
                )

        }
    }

    render() {
        return (
            <KeyboardAvoidingView enabled behavior="padding">
                <ScrollView>
                    <Container style={styles.container}>
                        <View style={{
                            justifyContent: 'center',
                            textAlign: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <Image source={require('../assets/imgs/scanner.png')} style={{ width: 200, height: 200 }} />
                        </View>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={values => {
                                this.handleSubmit(values)
                            }}
                            validationSchema={validationSchema}>
                            {({
                                handleChange,
                                values,
                                handleSubmit,
                                errors,
                                isValid,
                                touched,
                                handleBlur,
                                isSubmitting
                            }) => (
                                    <Fragment>
                                        <FormInput
                                            name='email'
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            placeholder='Enter email'
                                            autoCapitalize='none'
                                            iconName='ios-mail'
                                            iconColor='#2C384A'
                                            onBlur={handleBlur('email')}
                                        />
                                        <ErrorMessage errorValue={touched.email && errors.email} />
                                        <FormInput
                                            name='password'
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            placeholder='Enter password'
                                            secureTextEntry
                                            iconName='ios-lock'
                                            iconColor='#2C384A'
                                            onBlur={handleBlur('password')}
                                        />
                                        <ErrorMessage errorValue={touched.password && errors.password} />
                                        <View style={styles.buttonContainer}>
                                            <FormButton
                                                buttonType='outline'
                                                onPress={handleSubmit}
                                                title='LOGIN'
                                                buttonColor='#039BE5'
                                                disabled={!isValid}
                                            // loading={isSubmitting}
                                            />
                                        </View>
                                    </Fragment>
                                )}
                        </Formik>
                        <Button
                            title="Don't have an account? Sign Up"
                            onPress={this.goToSignup}
                            titleStyle={{
                                color: 'black'
                            }}
                            type='clear'
                        />
                    </Container>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'stretch'
    },
    buttonContainer: {
        margin: 25
    }
});