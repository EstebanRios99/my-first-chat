import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app'
import {switchMap, map} from 'rxjs/operators';
import * as Crypto from 'crypto-js';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;
  secretKey = "YourSecretKeyForEncryption&Descryption";

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.afAuth.onAuthStateChanged(user => {
      console.log ('Changed: ', user);
      this.currentUser = user;
    })
  }

  async signUp({email,password}){
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log('result: ', credential);
    const uid = credential.user.uid;

    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    })
  }

  signIn({ email,  password }){
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }

  signOut(){
    return this.afAuth.signOut();
  }

  addChatMessage(msg){
    
    const msgEncrypt= Crypto.AES.encrypt(msg, this.secretKey.trim()).toString();
    return this.afs.collection('messages').add({
      msg: msgEncrypt,
      from: this.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  getChatMessages(){
    let users = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log('all users: ', users);
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({idField: 'id'}) as Observable<Message[]>
      }),
      map(messages => {
        for (let m of messages){
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
          m.msg = this.getMsgDecrypt(m.msg);
        }
        console.log('all messages: ', messages);
        
        return messages;
      })
    )
  }
  
  getUsers(){
    return this.afs.collection('users').valueChanges({idField:'uid'}) as Observable<User[]>;
  }
  getMsgDecrypt(message){
     return   Crypto.AES.decrypt(message, this.secretKey.trim()).toString(Crypto.enc.Utf8);  
  }

  getUserForMsg(msgFromId, users: User[]): string {
    for (let usr of users){
      if (usr.uid == msgFromId){
        return usr.email;
      }
    }
    return 'Deleted';
  }
}
