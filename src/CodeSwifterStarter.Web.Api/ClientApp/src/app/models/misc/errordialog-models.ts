import { ErrorDialogMessageTypeEnum } from 'app/models/misc/enums/error-dialog-message-type.enum';

export class ErrorDialogMessage {
    type:ErrorDialogMessageTypeEnum;
    title:string;
    message:string;
    dismissedAlert:boolean;
}