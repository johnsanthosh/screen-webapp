import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ScreenService} from '../screen.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @ViewChild('f') submittedForm: NgForm;
  @Input() screens: { id: string, content: string };
  submittedScreen: { id: string, content: string };
  @Input() id: number;
  message: any;
  subscription: Subscription;

  item: { id: string, content: string };

  constructor(private screenService: ScreenService, private messageService: MessageService, private route: ActivatedRoute) {
    // subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message.text;
      console.log(this.message);
      this.refreshScreens(this.message);
    });
  }


  ngOnInit() {
    this.submittedScreen = {id: '', content: ''};
    this.id = this.route.snapshot.params['id'];
    if (this.id === undefined) {
      console.log('ID : ' + undefined);
      this.screenService.getScreens().subscribe((response => {
        this.screens = response;
        console.log(this.screens);
      }));
    } else {
      console.log('ID : ' + this.id);
      this.screenService.getScreen(this.id).subscribe((response => {
        this.screens = response;
        console.log(this.screens);
      }));
    }

  }

  onSubmit() {
    console.log(this.submittedForm);
    this.submittedScreen.id = this.id.toString();
    this.submittedScreen.content = this.submittedForm.value.content;
    console.log(this.submittedScreen);
    this.screenService.updateScreen(this.submittedScreen).subscribe((response => {
      console.log(response);
      this.sendMessage(this.submittedScreen.id);
    }));
  }

  refreshScreens(id: string) {
    console.log('Refresh');
    this.screenService.getScreen(Number(id)).subscribe((response => {
      this.screens = response;
      console.log(this.screens);
    }));
  }

  sendMessage(id: string): void {
    this.messageService.sendMessage(id);
  }


}
