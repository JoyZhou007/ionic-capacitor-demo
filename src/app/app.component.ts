import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
const { NFCPlugin } = Plugins;
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'ionic-capacitor-demo';

  constructor(private nfc: NFC, private ndef: Ndef) {
    if (Capacitor.isPluginAvailable('NFC')) {
    }
    console.log(
      'NFCPlugin',
      NFCPlugin,
      Capacitor.isPluginAvailable('NFCPlugin')
    );
    // NFCPlugin.echo({ value: 'teet' });
    NFCPlugin.testEvent();
  }
  ngOnInit(): void {}

  test() {
    NFCPlugin.echo({ value: 'test' });
    NFCPlugin.sendTaskInfo({
      taskInfo: {
        id: 1,
        taskNumber: '111111',
        process: 'joy',
      },
    }).then((m) => {
      console.log('send task info', m);
    });
  }

  ngAfterViewInit(): void {
    NFCPlugin.addListener('readNFCResult', (info: any) => {
      console.log('readNFCResult was fired', info);
    });
    NFCPlugin.addListener('beginWriteNFC', (info: any) => {
      console.log('beginWriteNFC was fired', info);
    });
    NFCPlugin.addListener('writeNFCResult', (info: any) => {
      console.log('writeNFCResult was fired', info);
    });
    window.addEventListener('myCustomEvent', function (e) {
      console.log('myCustomEvent was fired', e);
    });
    this.nfc
      .addNdefListener(
        () => {
          console.log('successfully attached ndef listener');
        },
        (err) => {
          console.log('error attaching ndef listener', err);
        }
      )
      .subscribe((event) => {
        console.log('received ndef message. the tag contains: ', event.tag);
        console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

        let message = this.ndef.textRecord('Hello world');
        this.nfc
          .share([message])
          .then(() => console.log('share sunccess'))
          .catch(() => console.log('share err'));
      });
  }
}
