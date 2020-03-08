import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { BackUpTranslations } from './backUpTranslations';

export class CustomMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return BackUpTranslations.translate(params.key, params. interpolateParams);
    }
}
