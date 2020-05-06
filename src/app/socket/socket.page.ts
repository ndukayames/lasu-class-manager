import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.page.html',
  styleUrls: ['./socket.page.scss'],
})
export class SocketPage implements OnInit {
  message = '';
  messages = [];
  currentUser = '';
  constructor(private socket: Socket, private toastCtrl: ToastController) { }

  async ngOnInit() {
    this.socket.fromEvent('join').subscribe(res=>{
      console.log(res)
    })
    let name = `user-${new Date().getTime()}`;
    this.currentUser = name;
    
    this.socket.emit('set-name', name);
 
    this.socket.fromEvent('users-changed').subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

    
    this.socket.fromEvent('message').subscribe(message => {
      this.messages.push(message);
      console.log('message',message)
      this.socket
    });
    this.socket.fromEvent('see-something').subscribe(res=>{
      console.log(res)
    })
  }
  seeandcheck(){
    this.socket.emit('connnection')
    // this.socket.emit('check-something',{ text: this.message })
    this.socket.emit('check-somthing')
    
  }
  sendMessage() {
    
    this.socket.emit('send-message', { text: this.message });
    console.log('message sent', this.message)
    this.message = '';
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  }

