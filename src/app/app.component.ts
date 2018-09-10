import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl,
  FormGroup, AbstractControl } from '@angular/forms';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements OnInit {

  public show: boolean;
  methods: string[] = ['Get', 'Post', 'Head', 'Put'];

  public requestForm = new FormGroup({
    method: new FormControl(null),
    baseUrl: new FormControl({
      value: 'https://www.google.com.ua?q=angula&aqs=chrome',
      disabled: false
    }),
    urlParams: new FormArray([]),
    headerParams: new FormArray([
      new FormGroup({
        name: new FormControl(null),
        value: new FormControl(null)
      })
    ]),
    bodyParams: new FormArray([
      new FormGroup({
        name: new FormControl(null),
        value: new FormControl(null),
        type: new FormControl(null)
      })
    ])
  });

  constructor() {}

  public ngOnInit() {}

  public get baseUrl(): AbstractControl {
    return this.requestForm.get('baseUrl');
  }

  public get urlParams(): AbstractControl {
    return this.requestForm.get('urlParams');
  }

  public get headerParams(): AbstractControl {
    return this.requestForm.get('headerParams');
  }

  public generateUrl(): string {
    let params = new HttpParams();

    this.urlParams.value.forEach(({ name, value }) => {
      if (name) {
        params = params.append(name, value);
      }
    });

    return `${this.baseUrl.value}/${encodeURI(params.toString())}`;
  }

  // -------------------> START NEW CODE <-------------------
  public toggleForm() {
    this.show = !this.show;
    if (this.show) {
      this.parseUrl();
      this.baseUrl.disable();
    } else {
      this.buildUrl();
      this.baseUrl.enable();
    }
  }

  public parseUrl() {
    const url: any = new window.URL(this.baseUrl.value);
    this.baseUrl.setValue(url.origin);
    url.searchParams.forEach((value, key) => {
      (<FormArray>this.urlParams).push(
        new FormGroup({
          name: new FormControl(key),
          value: new FormControl(value)
        })
      );
    });
    this.addInput(true, 'urlParams');
  }

  public buildUrl() {
    // let params = new HttpParams(); // TODO: Можно юзать HttpParams, если нужно.
    const searchParams = new URLSearchParams();
    this.urlParams.value
      .filter(({name}) => name)
      .forEach(({ name, value }) => {
        // params = params.append(name, value); // TODO: Добавление для HttpParams.
        searchParams.append(name, value);
    });
    this.removeAllParams(this.urlParams);
    const params = searchParams.toString();
    const url = `${this.baseUrl.value}${params && '?'}${params}`;
    this.baseUrl.setValue(url);
  }

  private removeAllParams(form) {
    while (0 !== form.length) {
      form.removeAt(0);
    }
  }
  // -------------------> END NEW CODE <-------------------









  // Добавить новые поля ввода при изминении в последнем поле
  public addInput(isLast, FormName) {  // Передаем последний индекс массива
    if (isLast) {
      (<FormArray>this.requestForm.get( FormName )).push(
        new FormGroup({
          name: new FormControl(null),
          value: new FormControl(null)
        })
      );
    }
    console.log( this.generateUrl() );
  }

  public removeInput(index: number, FormName: string) {
    if (index !== (<FormArray>this.requestForm.get(FormName)).length - 1) {
      (<FormArray>this.requestForm.get(FormName)).removeAt(index);
    }
    console.log('Длина ' + FormName + ' массива: ' + (<FormArray>this.requestForm.get(FormName)).length);
  }

}
