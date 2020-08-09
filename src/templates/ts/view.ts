import Vue from "vue";
import Component from "vue-class-component";
import {
    Watch,
    Prop,
    PropSync,
    Emit
} from "vue-property-decorator"

@Component({
    name: '$name',
    components: {}
})
export default class $NameView extends Vue {
    /**
     * Props
     */
    @Prop({ default: 0 }) readonly myProp!: Number;
    @PropSync('syncProp', { type: String }) mySyncProp!: String;

    /**
     * Members
     */
    myVar: string = "";

    constructor() {
        super();
    }

    /**
     * Watchers
     */
    @Watch
    myVar() { }

    /**
     * Computed values
     */
    get myComputedValue(): Number {
        return 0;
    }

    set myComputedValue(value: Number) { }

    /**
     * Emitters
     */
    @Emit('close-form')
    closeForm(): boolean {
        return true;
    }

    /**
     * Methods
     */
    myMethod(): void { }
}