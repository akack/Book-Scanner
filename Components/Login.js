import React, { Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from './forms/FormInput'
import FormButton from './forms/FormButton'
import ErrorMessage from './forms/ErrorMessage'

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
    constructor(props) {
        super(props);
    }

    handleSubmit = values => {
        if (values.email.length > 0 && values.password.length > 0) {
            this.props.navigation.navigate('HomeScreen')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <SafeAreaView >
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
                                                autoFocus
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
                                                    disabled={!isValid || isSubmitting}
                                                    loading={isSubmitting}
                                                />
                                            </View>
                                        </Fragment>
                                    )}
                            </Formik>
                            <Button
                                title="Don't have an account? Sign Up"
                                onPress={this.goToSignup}
                                titleStyle={{
                                    color: 'lightskyblue'
                                }}
                                type='clear'
                            />
                        </SafeAreaView>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
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