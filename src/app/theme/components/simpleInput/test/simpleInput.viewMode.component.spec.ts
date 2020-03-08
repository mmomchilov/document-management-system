import { ComponentFixture, TestBed, async, getTestBed } from '@angular/core/testing';
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
  field: 'legalName',
  type: 'input'
};

const SELECT_WITH_OPTIONS = {
  field: 'optionField',
  type: 'select',
  label: 'Combo box',
  options: (val => [
    { code: 'code1', display: 'Code1' },
    { code: 'code2', display: 'Code2' }
  ]),
  value: val => 'code2'
};
const SELECT_WITH_ENUM = {
  field: 'entityBelonging',
  type: 'select',
  enum: 'jurdclenttyrole',
  value: val => 'thrdprty'
};
const CHECKBOX_WITH_OPTIONS = {
  field: 'codesList',
  fieldCode: 'codeField',
  label: 'Check-box list',
  type: 'checkbox',
  options: (val => [
    { code: 'code1', display: 'Code1' },
    { code: 'code2', display: 'Code2' }
  ])
};
const CHECKBOX_WITH_ENUM = {
  field: 'functionList',
  fieldCode: 'function',
  type: 'checkbox',
  enum: 'insrrrole'
};
const DATE = {
  field: 'startDate',
  type: 'date',
  validators: {
    isRequired: true
  }
};

describe('SimpleInputComponent in read mode', () => {
  let component: SimpleInputComponent;
  let fixture: ComponentFixture<SimpleInputComponent>;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule(dependencies).compileComponents();
    const injector: Injector = getTestBed();
    translate = injector.get(TranslateService);

    fixture = TestBed.createComponent(SimpleInputComponent);
    component = fixture.componentInstance;
    component.displayMode = 'r';
    component.database = database;
    component.collectionId = collectionId;
    component.locale = 'fr';
    component.collection = {
      legalName: 'G.F.P.',
      code: 'G',
      startDate: '2010-01-01T00:00:00.000Z',
      functionList: [{ function: 'admin' }],
      codesList: [{ codeField: 'code1' }]
    };
    translate.use(component.locale);
  });

  it('should create', () => {
    setConfig(component, fixture, INPUT);
    expect(component).toBeTruthy();
  });

  it('should have input with correct value', () => {
    setConfig(component, fixture, INPUT);
    expect(TestUtilities.getValueBySelector(fixture, 'input[name="legalName"]')).toBe('G.F.P.');
  });

  it('should have default label', () => {
    setConfig(component, fixture, INPUT);
    expect(TestUtilities.getTextBySelector(fixture, 'label[for="legalName"]'))
      .toBe('localizationProperty.agreement.juridical-entity.legalName.shortLabel');
  });

  it('should have checkbox selected', () => {
    setConfig(component, fixture, CHECKBOX_WITH_OPTIONS);
    expect(TestUtilities.isCheckBoxSelected(fixture, 'input[value="code1"]')).toBe(true);
    expect(TestUtilities.isCheckBoxSelected(fixture, 'input[value="code2"]')).toBe(false);
  });

  it('should have checkbox with correct values from enumeration', () => {
    setConfig(component, fixture, CHECKBOX_WITH_ENUM);
    expect(TestUtilities.isCheckBoxSelected(fixture, 'input[value="admin"]')).toBe(true);
    expect(TestUtilities.isCheckBoxSelected(fixture, 'input[value="bssfndr"]')).toBe(false);
  });

  it('should have combo box with specified value', () => {
    setConfig(component, fixture, SELECT_WITH_OPTIONS);
    expect(TestUtilities.getValueBySelector(fixture, 'select[name="optionField"]')).toBe('code2');
  });

  it('should have combo box with specified value from enumeration', () => {
    setConfig(component, fixture, SELECT_WITH_ENUM);
    expect(TestUtilities.getValueBySelector(fixture, 'select[name="entityBelonging"]')).toBe('thrdprty');
  });

  it('should have date with value from the collection', () => {
    setConfig(component, fixture, DATE);
    expect(TestUtilities.getValueBySelector(fixture, 'input[name="startDate"]')).toBe('01/01/2010');
  });

  it('should have custom labels', () => {
    setConfig(component, fixture, SELECT_WITH_OPTIONS);
    expect(TestUtilities.getTextBySelector(fixture, 'label[for="optionField"]'))
      .toBe('Combo box');
  });

  it('should have translated label', () => {
    setConfig(component, fixture, SELECT_WITH_ENUM);
    expect(TestUtilities.getTextBySelector(fixture, 'label[for="entityBelonging"]')).toBe('Type FR');
  });

  // in view mode none of the elements should be clickable
  it('should NOT have clickable checkbox', () => {
    setConfig(component, fixture, CHECKBOX_WITH_ENUM);
    
    const selector = 'input[value="admin"]';
    expect(TestUtilities.isCheckBoxSelected(fixture, selector)).toBe(true);

    const box: HTMLElement = TestUtilities.getHtMLElementBySelector(fixture, selector);
    box.click();
    expect(TestUtilities.isCheckBoxSelected(fixture, selector)).toBe(true);
  });
});

function setConfig(component, fixture, config) {
  component.config = config;
  fixture.detectChanges();
  fixture.whenStable();
}
