import { Component } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  render() {
    return (
      <ion-page class='show-page'>
        <ion-header md-height='56px'>
          <ion-toolbar color='primary'>
            <ion-title>Random GIF generator</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <random-gif/>
        </ion-content>
      </ion-page>
    );
  }
}
