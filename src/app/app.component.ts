import { Component, AfterViewInit } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
const { AwesomePlugin } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ionic-capacitor-demo';

  constructor() {
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
  
  ngAfterViewInit(): void {
    window.addEventListener("myCustomEvent", function(e) {
      console.log("myCustomEvent was fired",e)
    });
  }
}
