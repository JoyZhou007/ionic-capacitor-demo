import { Component, AfterViewInit } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
const { AwesomePlugin } = Plugins;
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ionic-capacitor-demo';

  constructor(private nfc: NFC, private ndef: Ndef) {
    if (Capacitor.isPluginAvailable('NFC')) {
    }
    console.log(
      'AwesomePluginPlugin',
      AwesomePlugin,
      Capacitor.isPluginAvailable('AwesomePlugin')
    );
    AwesomePlugin.echo({ value: 'teet' });
    AwesomePlugin.testEvent();
    AwesomePlugin.storeContact({
      yourName: 'joy',
      address: { province: 'jiangsu' },
      isAwesome: true,
      id: 1
    });
  }
  
  test(){
    AwesomePlugin.echo({ value: 'test' });
  }
  
  ngAfterViewInit(): void {
    window.addEventListener("myCustomEvent", function(e) {
      console.log("myCustomEvent was fired",e)
    });
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    
      let message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then(()=> console.log('share sunccess')).catch(()=>console.log('share err'));
    });
  }
}
