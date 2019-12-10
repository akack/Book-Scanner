import React, { Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from './forms/FormInput'
import FormButton from './forms/FormButton'
import ErrorMessage from './forms/ErrorMessage'
import { Container } from 'native-base';
import { AppService } from '../app.service';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  surname: Yup.string()
    .label('Surname')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have more than 4 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required')
})

export default class RegisterScreen extends React.Component {
  appService = new AppService;
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      password: '',
      confirmPassword: '',
      email: '',
      uidFB: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  goToLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  }

  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {

      console.log('State 2: ', values);
      this.appService.signUpFireBase(values.email, values.password)
        .then(
          res => {
            this.setState({
              email: values.email,
              name: values.name,
              surname: values.surname,
              uidFB: res.user.uid
            })
            console.log('State: ', this.state);
            setTimeout(() => {
              this.appService.addUserToDB(this.state);
              this.props.navigation.navigate('LoginScreen')
            }, 3000)


          },
          err => {
            console.log('Error: ', err.message)
            if (err.message === 'The email address is already in use by another account.') {
              Alert.alert(
                'Email Error',
                'Email already in use.',
                [
                  {
                    text: 'Ok', onPress: () => {
                      this.props.navigation.navigate('RegisterScreen')
                    }
                  },
                ],
                { cancelable: false }
              )
            }
          })
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView>
          <Container style={styles.container}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                surname: '',
                uid: ''
              }}
              onSubmit={values => {
                this.handleSubmit(values)
                this.setState({
                  name: values.name,
                  email: values.email,
                  password: values.password
                })
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
                      name='name'
                      value={values.name}
                      onChangeText={handleChange('name')}
                      placeholder='Name'
                      iconName='md-person'
                      iconColor='#2C384A'
                      onBlur={handleBlur('name')}
                    />
                    <ErrorMessage errorValue={touched.name && errors.name} />

                    <FormInput
                      name='surname'
                      value={values.surname}
                      onChangeText={handleChange('surname')}
                      placeholder='Surname'
                      iconName='md-person'
                      iconColor='#2C384A'
                      onBlur={handleBlur('surname')}
                    />
                    <ErrorMessage errorValue={touched.surname && errors.surname} />

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
                    <FormInput
                      name='password'
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      placeholder='Confirm password'
                      secureTextEntry
                      iconName='ios-lock'
                      iconColor='#2C384A'
                      onBlur={handleBlur('confirmPassword')}
                    />
                    <ErrorMessage
                      errorValue={touched.confirmPassword && errors.confirmPassword}
                    />
                    <View style={styles.buttonContainer}>
                      <FormButton
                        buttonType='outline'
                        onPress={handleSubmit}
                        title='SIGNUP'
                        buttonColor='#F57C00'
                        disabled={isSubmitting}
                        loading={isSubmitting}
                      />
                    </View>
                  </Fragment>
                )}
            </Formik>
            <Button
              title='Have an account? Login'
              onPress={this.goToLogin}
              titleStyle={{
                color: '#000000'
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
    flexDirection: 'column',
    alignContent: 'stretch',
    marginTop: 30
  },
  buttonContainer: {
    margin: 25
  }
});