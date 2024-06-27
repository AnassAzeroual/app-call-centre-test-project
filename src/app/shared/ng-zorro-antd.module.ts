import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';


const listAnt = [
    NzBreadCrumbModule
];
@NgModule({
    imports: [...listAnt],
    exports: [...listAnt]
})
export class ListNgZorroAntdModule {

}
