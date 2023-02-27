import { Component, ContentChild, OnInit } from '@angular/core';
import { Widget } from '../widgets/widget.interface';
import { WIDGET } from '../widgets/widget.token';

@Component({
  selector: 'app-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.css']
})
export class WidgetWrapperComponent implements OnInit{

  @ContentChild(WIDGET as any, { static: true })
  widget!: Widget;

  ngOnInit(): void {
    this.widget.load();
  }

  onRefresh() {
    this.widget.refresh();
  }

}
