import {css, html, LitElement, PropertyValues, TemplateResult} from "lit";
import {customElement, query} from "lit/decorators.js";
import {ObjectContextConsumer} from "libs/lit-helper/src/Mixin/ObjectContext";
import {trainNumberContext} from "./TrainNumberContext";
import {TrainNumberController} from "./TrainNumberController";

@customElement('ts-number-input')
class NumberInput extends ObjectContextConsumer(LitElement)(trainNumberContext) {
    @query('input')
    private input: HTMLInputElement
    @query('select')
    private select: HTMLSelectElement

    private controller = new TrainNumberController(this)

    private operators: {
        id: string
        displayName: string
    }[] = []

    protected async scheduleUpdate(): Promise<unknown> {
        this.operators = await this.controller.operators();
        return super.scheduleUpdate();
    }

    static styles = css`
        :host(ts-number-input) {
            display: flex;
            gap: 1px;
        }

        input {
            flex-grow: 1;
        }

        input, select {
            padding: .5rem;
            font-size: 1rem;
            border-radius: 0;
            border: none;
        }

        input:focus, select:focus {
            outline: 1px solid white;
        }
    `

    protected render(): TemplateResult {
        return html`
            <input type="text" @keyup="${this.changeNumber}" placeholder="Zugnummer" autocomplete="false"
                   autocapitalize="off">
            <select @change="${this.changeOperator}">
                <option>-- Betreiber --</option>
                ${this.operators.map(operator => html`
                    <option value="${operator.id}">${operator.displayName}</option>`)}
            </select>
        `;
    }

    private changeOperator() {
        this.context.operator = this.select.value
    }

    private changeNumber() {
        this.context.number = this.input.value
    }
}