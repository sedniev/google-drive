import { Component } from '@angular/core';
// import { GoogleAuthService } from 'ng-gapi';
declare let gapi:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'google-drive';
  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: any;
  public error: string;
  public user: any;

  // constructor(private googleAuth: GoogleAuthService){ 
  // }
  
  auth():void{
    console.log('auth')
    // this.signIn();
    this.authenticate();
  }

  // public signIn(): void {
  //   this.googleAuth.getAuth()
  //       .subscribe((auth) => {
  //           console.log(auth)
  //       });
  // }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve 
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '223971077227-mfpp3qa0tlfs2mctcfhum5h4tbtv7aul.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<any> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => this.user = user,
        error => this.error = error);
    });
  }

}
