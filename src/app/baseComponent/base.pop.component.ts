import {
    Component, SimpleChange, OnChanges, OnInit, Input, DoCheck, IterableDiffer,
    KeyValueDiffer, KeyValueDiffers, IterableDiffers, KeyValueChangeRecord, ChangeDetectorRef
} from "@angular/core";
import {TableListConfig} from "../model/table.list.config.model";
import {TableListSimpleConfig} from "../model/table.list.simple.config.model";
/**
 * Created by Administrator on 2017/5/15.
 */

@Component({
    selector:"base-pop-component",
    templateUrl:"base.pop.component.html",
    styleUrls:["base.pop.component.css"]
})
export class BasePopComponent implements OnInit,OnChanges,DoCheck{

    @Input()
    tableListConfig:TableListConfig;

    @Input()
    simpleConfig(data:TableListSimpleConfig){
        console.log("simpleConfig",console.log(data))
        /*this._keyValueDiffer = this._keyValueDiffers.find(data).create(null);
        this.simpleConfigData=data;*/
    };
    private _keyValueDiffer: KeyValueDiffer<any,any>;
    private simpleConfigData:TableListSimpleConfig;

    constructor(
        public _iterableDiffers: IterableDiffers, public _keyValueDiffers: KeyValueDiffers,public changeDetectorRef:ChangeDetectorRef
    ){

    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        console.log("this.simpleConfig ngOnChanges")
        for (let propName in changes) {
            let changedProp = changes[propName];
            console.log(propName,changedProp);

        }
    }

    ngDoCheck():void{
        console.log("this.simpleConfig ngDoCheck")
        /*if(this._keyValueDiffers) {
            const changes = this._keyValueDiffer.diff(this.simpleConfigData);
            if (changes) {
                console.log("this.simpleConfig",changes)
                this.whatIsChanged(changes);
            }
        }*/
    }

    whatIsChanged(changes:any){
        changes.forEachAddedItem(
            (record: KeyValueChangeRecord<any,any>) => {
                console.log("Added item",record.key, record.currentValue)
            });

        changes.forEachChangedItem(
            (record: KeyValueChangeRecord<any,any>) => {
                console.log("change item",record.key, record.currentValue)
            });

        changes.forEachRemovedItem((record: KeyValueChangeRecord<any,any>) => {
            if (record.previousValue) {
               console.log("remove",record)
            }
        });
    }

    ngOnInit(){
    }
}
