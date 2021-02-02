import { DataCrud } from '../../Data access/DataCrud'
import { ControllerCrud } from '../ControllerCrud'

export class UserCrud extends ControllerCrud {

    constructor() {
        super(new DataCrud())
    }


}