import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { SimpleInputComponent } from '../simpleInput.component';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../nga.module';
import { JsonPath } from '../../../services/jsonPath';
import { BaThemeConfigProvider } from '../../../theme.configProvider';
import { TestUtilities } from '../../../test/testUtilities';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Injector } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateLoaderTestCard } from './translateLoaderTestCard';
import { CollectionService } from '../../cardDetail/collectionService';

registerLocaleData(localeFr);
const database = 'agreement';
const collectionId = 'juridical-entity';
const dependencies = {
  imports: [
    FormsModule,
    NgaModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLoaderTestCard
      }
    }),
  ],
  providers: [
    JsonPath,
    CollectionService,
    BaThemeConfigProvider,
    TranslateLoaderTestCard
  ],
  declarations: []
};

const INPUT = {
  field: 'code',
  type: 'input'
};
const SELECT_WITH_ENUM = {
  field: 'entityBelonging',
  type: 'select',
  enum: 'jurdclenttyrole',
  value: val => 'tnntprty'
};
const CHECKBOX_WITH_ENUM = {
  field: 'functionList',
  fieldCode: 'function',
  type: 'checkbox',
  enum: 'insrrrole'
};

describe('SimpleInputComponent in update mode', () => {
  let component: SimpleInputComponent;
  let fixture: ComponentFixture<SimpleInputComponent>;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule(dependencies).compileComponents();
    const injector: Injector = getTestBed();
    translate = injector.get(TranslateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleInputComponent);
    component = fixture.componentInstance;
    component.displayMode = 'u';
    component.database = database;
    component.collectionId = collectionId;
    component.locale = 'fr';
    component.collection = {
      legalName: 'G.F.P.',
      code: 'G',
      functionList: [{ function: 'admin' }],
      codesList: [{ codeField: 'code1' }]
    };

    translate.use(component.locale);
  });

  it('should create', () => {
    setConfig(component, fixture, INPUT);
    expect(component).toBeTruthy();
  });

  it('should have check box with correct value after click', () => {
    setConfig(component, fixture, CHECKBOX_WITH_ENUM);
    const selector = 'input[value="admin"]';
    expect(TestUtilities.isCheckBoxSelected(fixture, selector)).toBe(true);

    const box: HTMLElement = TestUtilities.getHtMLElementBySelector(fixture, selector);
    box.click();
    expect(TestUtilities.isCheckBoxSelected(fixture, selector)).toBe(false);
  });

  it('should have combo box with specified value from enumeration', () => {
    setConfig(component, fixture, SELECT_WITH_ENUM);
    expect(TestUtilities.getValueBySelector(fixture, 'select[name="entityBelonging"]')).toBe('tnntprty');
  });
});

function setConfig(component, fixture, config) {
  component.config = config;
  fixture.detectChanges();
  fixture.whenStable();
}
