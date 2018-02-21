import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ScreenService} from '../screen.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

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
  singleScreen: boolean;

  constructor(private screenService: ScreenService, private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.submittedScreen = {id: '', content: ''};
    this.id = this.route.snapshot.params['id'];
    if (this.id === undefined) {
      this.screenService.getScreens().subscribe((response => {
        this.screens = response;
      }));
      this.singleScreen = false;
    } else {
      this.screenService.getScreen(this.id).subscribe((response => {
        this.screens = response;
      }));
      this.singleScreen = true;
    }

    Observable.interval(5000).subscribe(x => {
      if (this.id !== undefined) {
        this.refreshScreens(this.id.toString());
      }
    });

  }

  onSubmit() {
    this.submittedScreen.id = this.id.toString();
    this.submittedScreen.content = this.submittedForm.value.content;
    console.log(this.submittedScreen);
    this.screenService.updateScreen(this.submittedScreen).subscribe((response => {
      this.refreshScreens(this.submittedScreen.id);
    }));
  }


  refreshScreens(id: string) {
    this.screenService.getScreen(Number(id)).subscribe((response => {
      this.screens = response;
    }));
  }


}
