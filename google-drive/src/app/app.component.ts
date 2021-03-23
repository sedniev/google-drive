import { Component } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
declare let gapi:any;
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'google-drive';
  token
  content
  constructor(private googleAuth: GoogleAuthService,
              private http: HttpClient){ 
  }
  
  auth():void{
    console.log('auth')
    this.signIn();
    // this.authenticate();
  }

  public signIn(): void {
    this.googleAuth.getAuth()
        .subscribe((auth) => {
            auth.signIn().then(res => {
              console.log(res.getAuthResponse().access_token);
              this.token = res.getAuthResponse().access_token;
              console.log(this.token);
            });
        });
  }

  createFile(): void{
      this.postRequest('https://www.googleapis.com/upload/drive/v3/files',this.content).subscribe(
        (resp)=>{
          console.log(resp);
        }
      );
  }

  public postRequest(url:string, headerData: any[] = [], bodyData = {}) {
    let headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'Authorization': 'Bearer ' + this.token,
      'name': "test_name"
    });

    return this.http.post(url, bodyData, { headers: headers });
}



  dropped(files: NgxFileDropEntry[]): void{
    if(files.length>1){
    }else{
      if(files[0].fileEntry.isFile){
        // this.content = files;
        const fileEntry = files[0].fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File)=>{
          let reader:FileReader = new FileReader();
          reader.readAsText(file, "windows-1251");
          reader.onloadend = function(){
            this.content = reader.result;
            console.log("file drop");
          }.bind(this);  
        })  
      }
    }
  }
  
  // async initGoogleAuth(): Promise<void> {
  //   const pload = new Promise((resolve) => {
  //     gapi.load('auth2', resolve);
  //   });

  //   return pload.then(async () => {
  //     await gapi.auth2
  //       .init({ client_id: '223971077227-mfpp3qa0tlfs2mctcfhum5h4tbtv7aul.apps.googleusercontent.com' })
  //       .then(auth => {
  //         this.gapiSetup = true;
  //         this.authInstance = auth;
  //         console.log(auth);
  //       });
  //   });
  // }

  // async authenticate(): Promise<any> {
  //   if (!this.gapiSetup) {
  //     await this.initGoogleAuth();
  //   }
  //   return new Promise(async () => {
  //     await this.authInstance.signIn().then(
  //       user => this.user = user,
  //       error => this.error = error);
  //   });
  // }

}
