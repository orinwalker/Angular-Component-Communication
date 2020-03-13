import { Component, EventEmitter, ViewChild, ElementRef,
         AfterViewInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnChanges, AfterViewInit {

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  @Output() changeFilter: EventEmitter<string> = new EventEmitter<string>();

  @Input()
      private _listFilter: string = '';
      public get listFilter(): string {
        return this._listFilter;
      }
      public set listFilter(value: string) {
        this._listFilter = value;
        this.changeFilter.emit( this.listFilter);
      }

  hitMessage: string;

  @ViewChild('childfilterElement') filterElementRef: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.filterElementRef) {
        this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }
  }
}
