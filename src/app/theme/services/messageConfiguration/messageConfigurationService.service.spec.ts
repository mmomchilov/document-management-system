import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MessageConfigurationService } from './messageConfigurationService.service';


describe('MessageConfigurationService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MessageConfigurationService
            ],
            imports: [
                HttpClientTestingModule
            ]
        });
    });

    it(
        'should get collections',
        inject(
            [HttpTestingController, MessageConfigurationService],
            (
                httpMock: HttpTestingController,
                dataService: MessageConfigurationService
            ) => {
                const mockCollections = [
                    {
                        database: 'portfolio',
                        collectionId: 'contract',
                        permission: 'u',
                        depth: 0,
                        sequence: 2,
                        isMandatory: true
                    }];

                dataService.getCollections('health').subscribe(event => {
                    expect(event).toEqual([
                        {
                            database: 'message-information',
                            collectionId: 'slip-message',
                            permission: 'u',
                            depth: 0,
                            sequence: 1,
                            isMandatory: true
                        },
                        {
                            database: 'portfolio',
                            collectionId: 'contract',
                            permission: 'u',
                            depth: 0,
                            sequence: 2,
                            isMandatory: true
                        }]);
                });
                const url = 'undefined/collections/businesscontext/health';
                const mockReq = httpMock.expectOne(url);

                expect(mockReq.cancelled).toBeFalsy();
                expect(mockReq.request.responseType).toEqual('json');
                expect(mockReq.request.method).toEqual('GET');

                mockReq.flush(mockCollections);

                httpMock.verify();
            }
        )
    );
});
