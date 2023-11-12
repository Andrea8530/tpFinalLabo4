import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'main-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
})
export class MailComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    from_name: '',
    to_name: 'Maxi',
    message: '',
  });

  ngOnInit() {}

  async enviarCorreo() {
    emailjs.init('KVIUdMmWDmmBvDA57');
    let response = await emailjs.send('service_7i6of97', 'template_7ekv8m2', {
      from_name: this.form.value.from_name,
      to_name: this.form.value.to_name,
      message: this.form.value.message,
    });

    alert('Mensaje enviado con exito');
    this.form.reset();
  }
}
