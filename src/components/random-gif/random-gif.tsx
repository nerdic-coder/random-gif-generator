import { Component, Prop, State, Method, Watch } from '@stencil/core';
import { ToastController } from '@ionic/core';
declare var Clipboard: any;
declare var navigator: any;

@Component({
  tag: 'random-gif'
})
export class RandomGif {

  @Prop() method: string  = 'GET';
  @Prop() keyword: string  = '';
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;
  @State() gifurl: string  = 'https://media.giphy.com/media/iCbBAJpfvm17G/giphy.gif';
  @State() available : boolean = false;

  tag: string  = this.keyword;
  url: string  = 'https://api.giphy.com/v1/gifs/random?api_key={API_KEY}&tag=';
  mp4url: string = '';
  componentDidLoad() {
    new Clipboard('#shareBtn');
    if(self.fetch) {
      this.available = true;
      this.makeRequest();
    }
  }

  @Method()
  handleChange(event) {
    this.tag = event.target.value;
    console.log(this.tag);
    this.makeRequest();
  }

  @Method()
  shared(event) {
    if (navigator.share) {
      navigator.share({
          title: 'Random GIF',
          text: 'Check out this gif!',
          url: this.mp4url,
      })
        .then(() => this.showSharedToast())
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log("toast");
      this.showSharedToast();
    }
  }

  @Method()
  showSharedToast() {
    this.toastCtrl.create({
      message: 'GIF copied to clipboard',
      showCloseButton: false,
      duration: 3000
    }).then((toast) => {
      toast.present();
    });
  }

  @Watch('keyword')
  validateKeyword(newValue: string) {
    this.tag = newValue;
  }

  @Method()
  makeRequest() {
    if(this.available) {
      var xhr = new XMLHttpRequest();
      xhr.open(this.method, this.url + this.tag);
      xhr.send(null);

      xhr.onload = evt => {
        this.parseXHRResult(xhr);
      };
    }
  }

  @Method()
  parseXHRResult(xhr: XMLHttpRequest) {
    var jsonResponse = JSON.parse(xhr.responseText);
    this.gifurl = jsonResponse.data.image_original_url;
    this.mp4url = jsonResponse.data.image_mp4_url
  }

  render() {
    return (
      <main>
        <ion-searchbar value={this.tag} placeholder="Keyword" onInput={(event) => this.handleChange(event)}/>
        <ion-button expand="block" onClick={(event: UIEvent) => this.makeRequest()}>Load another GIF</ion-button>
        <img src={this.gifurl} alt="MVP GIF"/>
        <ion-button color="secondary" id="shareBtn" expand="block" data-clipboard-text={this.mp4url} onClick={(event: UIEvent) => this.shared(event)}>Share GIF</ion-button>
        
      </main>
    );
  }
}
