"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vue_class_component_1 = __importDefault(require("vue-class-component"));
const vue_property_decorator_1 = require("vue-property-decorator");
let $nameComponent = class $nameComponent extends vue_1.default {
    constructor() {
        super();
        /**
         * Members
         */
        this.myVar = "";
    }
    /**
     * Watchers
     */
    myVar() { }
    /**
     * Computed values
     */
    get myComputedValue() {
        return 0;
    }
    set myComputedValue(value) { }
    /**
     * Emitters
     */
    closeForm() {
        return true;
    }
    /**
     * Methods
     */
    myMethod() { }
};
__decorate([
    vue_property_decorator_1.Prop({ default: 0 })
], $nameComponent.prototype, "myProp", void 0);
__decorate([
    vue_property_decorator_1.PropSync('syncProp', { type: String })
], $nameComponent.prototype, "mySyncProp", void 0);
__decorate([
    vue_property_decorator_1.Watch
], $nameComponent.prototype, "myVar", null);
__decorate([
    vue_property_decorator_1.Emit('close-form')
], $nameComponent.prototype, "closeForm", null);
$nameComponent = __decorate([
    vue_class_component_1.default({
        name: 'test',
        components: {}
    })
], $nameComponent);
exports.default = $nameComponent;
//# sourceMappingURL=test.component.js.map