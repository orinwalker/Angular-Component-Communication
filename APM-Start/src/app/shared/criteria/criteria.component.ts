import { Component, EventEmitter, OnInit, ViewChild, ElementRef,
         AfterViewInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() childDisplayDetailBoolean: boolean;
  @Input() childHitCount: number;
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  private _childListFilter: string = '';
  public get childListFilter(): string {
    return this._childListFilter;
  }
  public set childListFilter(value: string) {
    this._childListFilter = value;
    console.log('in setter calling emit: [' + this.childListFilter + ']');
    this.change.emit( this.childListFilter);
  }

  childHitMessage: string;

  @ViewChild('childfilterElement') filterElementRef: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    // This works perfectly
    if (this.filterElementRef) {
        // console.log('setting focus');
        this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges called in the child');
    // This works perfectly
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.childHitMessage = 'No matches found';

    } else {

      this.childHitMessage = 'Hits:' + this.childHitCount;
      // console.log('calling emit: [' + this.childListFilter + ']');
      // this.getChildFilterStatusChange.emit(this.childListFilter);
    }
  }

  ngOnInit() {
  }

}
