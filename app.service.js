import React from "react";
import { AsyncStorage, Alert, Platform } from "react-native";
import * as firebase from "firebase";

export class AppService {
    addUserToDBUrl = 'https://fm2rj65ye9.execute-api.us-east-1.amazonaws.com/dev/add_user_to_db';
    getUserDetailsUrl =  'https://cors-anywhere.herokuapp.com/https://fm2rj65ye9.execute-api.us-east-1.amazonaws.com/dev/get_user_details';
    addCommissioningDataUrl = 'http://10.0.2.2:3000/store_commission_sheet';

    // addUserToDBUrl = "http://localhost:3000/add_user_to_db";
    // getUserDetailsUrl = "http://localhost:3000/get_user_details";
    // addCommissioningDataUrl = "http://localhost:3000/store_commission_sheet";

    signUpFireBase(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    singInFireBase(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    async StoreCommissionDataToDB(data) {
        const results = await fetch(this.addCommissioningDataUrl, {
            method: "Post",
            body: JSON.stringify(data),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
        let sumbmitted = "";
        const savedCom = await results.json();
        if (results.status === 200) {
            console.log("Save Data to DB: ");
            sumbmitted = "true";
        } else {
            console.error("Error saving data");
            sumbmitted = "false";
        }
        sumbmitted = "false";
        return sumbmitted;
    }

    async addUserToDB(user) {
        const results = await fetch(this.addUserToDBUrl, {
            method: "Post",
            body: JSON.stringify(user),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
        const savedCom = await results.json();
        if (results.status === 200) {
            console.log("Saved User to DB: ");
        } else {
            console.error("Error Saving DUser");
        }
    }

    async getUserDetails(uid) {
        console.log('uid: ', uid)
        const results = await fetch(`${this.getUserDetailsUrl}/${uid}`, {
            method: "Get",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
        console.log('resulte', results)
        const userDetails = await results.json();
        await AsyncStorage.setItem("user", JSON.stringify(userDetails));
        console.log('user', userDetails);
        return true;
    }

    async logout() {
        await AsyncStorage.removeItem("user");
        return firebase.auth().signOut();
    }

    passwordRecovery(email) {
        return firebase.auth().sendPasswordResetEmail(email);
    }
}
