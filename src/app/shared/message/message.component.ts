import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;
  @Input() element: ElementRef;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  temErro(): boolean {
    const campo = new ElementRef(this.element);
    if (this.error && this.control.errors) {
      const erro = this.control.errors[this.error] && (this.control.dirty  && this.control.touched);

      if (erro) {
        campo.nativeElement.classList.add('is-invalid');
      } else {
        campo.nativeElement.classList.remove('is-invalid');
      }
      
      return erro;
    } else {
      campo.nativeElement.classList.remove('is-invalid');
    }
  }

}
