import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';
import './paper-autocomplete-suggestions';

class PaperAutocomplete extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                    box-sizing: border-box;
                    position: relative;
                    color: var(--paper-autocomplete-main-color);
                    min-height: var(--paper-autocomplete-min-height);
                }

                #clear {
                    display: none;
                    line-height: 8px;
                }

                .sr-only {
                    position: absolute;
                    clip: rect(1px, 1px, 1px, 1px);
                }
                paper-autocomplete-suggestions {
                    --suggestions-wrapper: {
                        color: var(--paper-autocomplete-suggestions-color, var(--paper-autocomplete-main-color));
                        --paper-item-min-height: var(--suggestions-item-min-height);
                    }
                }
                paper-input{
                    --paper-input-container-color: var(--paper-autocomplete-main-color);
                    --paper-input-container-focus-color: var(--paper-autocomplete-main-color);
                    --paper-input-container-input-color: var(--paper-input-font-color);
                }
            </style>
            <div class="autocomplete-wrapper">
                <!-- Find all information for WAI-ARIA (role attribute ecc..) in this site https://www.w3.org/TR/wai-aria-1.1/#combobox -->
                <div class="input-wrapper" role="combobox" aria-haspopup="true" aria-owns="suggestionsWrapper" aria-expanded$="[[_isSuggestionsOpened]]">
                    <!-- For accessibility, it is needed to have a label or aria-label. Label is preferred -->
                    <label for="autocompleteInput" class="sr-only">[[label]]</label>

                    <paper-input id="autocompleteInput"
                                label="[[label]]"
                                autocapitalize="[[autocapitalize]]"
                                no-label-float="[[noLabelFloat]]"
                                disabled="{{disabled}}"
                                readonly="[[readonly]]"
                                focused="{{focused}}"
                                auto-validate$="[[autoValidate]]"
                                error-message$="[[errorMessage]]"
                                required$="[[required]]"
                                value="{{text}}"
                                allowed-pattern="[[allowedPattern]]"
                                pattern="[[pattern]]"
                                no-label-float="[[noLabelFloat]]"
                                always-float-label="[[alwaysFloatLabel]]"
                                char-counter$="[[charCounter]]"
                                maxlength$="[[maxlength]]"
                                placeholder="[[placeholder]]"
                                invalid="{{invalid}}"

                                role="textbox"
                                aria-autocomplete="list"
                                aria-multiline="false"
                                aria-activedescendant$="[[_highlightedSuggestion.elementId]]"
                                aria-disabled$="[[disabled]]"
                                aria-controls="autocompleteStatus suggestionsWrapper">

                        <slot name="prefix" slot="prefix"></slot>
                        <paper-icon-button slot="suffix" suffix id="clear" icon="icons:clear" on-click="_clear"></paper-icon-button>
                        <slot name="suffix" slot="suffix"></slot>
                    </paper-input>
                    <!-- to announce current selection to screen reader -->
                    <!-- <span id="autocompleteStatus" role="status" class="sr-only">[[_highlightedSuggestion.textValue]]</span> -->
                </div>

                <paper-autocomplete-suggestions for="autocompleteInput"
                                                id="paperAutocompleteSuggestions"
                                                min-length="[[minLength]]"
                                                text-property="[[textProperty]]"
                                                source="[[source]]"
                                                remote-source="[[remoteSource]]"
                                                query-fn="[[queryFn]]"
                                                event-namespace="[[eventNamespace]]"
                                                highlighted-suggestion="{{_highlightedSuggestion}}"
                                                is-open="{{_isSuggestionsOpened}}"
                                                highlight-first="[[highlightFirst]]"
                                                show-results-on-focus="[[showResultsOnFocus]]">

                    <slot id="customTemplate" name="autocomplete-custom-template"></slot>
                </paper-autocomplete-suggestions>
            </div>
        `;
    }

    static get properties() {
        return {
            /**
             * `autoValidate` Set to true to auto-validate the input value.
             */
            autoValidate: {
                type: Boolean,
                value: false
            },
            /**
             * Setter/getter manually invalid input
             */
            invalid: {
                type: Boolean,
                notify: true,
                value: false
            },
            /**
             * `autocapitalize` Sets auto-capitalization for the input element.
             */
            autocapitalize: {
                type: String
            },

            /**
             * `errorMessage` The error message to display when the input is invalid.
             */
            errorMessage: {
                type: String
            },

            /**
             * `label` Text to display as the input label
             */
            label: {
                type: String
            },

            /**
             * `noLabelFloat` Set to true to disable the floating label.
             */
            noLabelFloat: {
                type: Boolean,
                value: false
            },

            /**
             * `alwaysFloatLabel` Set to true to always float label
             */
            alwaysFloatLabel: {
                type: Boolean,
                value: false
            },

            /**
             * The placeholder text
             */
            placeholder: {
                type: String
            },

            /**
             * `required` Set to true to mark the input as required.
             */
            required: {
                type: Boolean,
                value: false
            },

            /**
             * `readonly` Set to true to mark the input as readonly.
             */
            readonly: {
                type: Boolean,
                value: false
            },

            /**
             * `focused` If true, the element currently has focus.
             */
            focused: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * `disabled` Set to true to mark the input as disabled.
             */
            disabled: {
                type: Boolean,
                value: false
            },

            /**
             * `source` Array of objects with the options to execute the autocomplete feature
             */
            source: {
                type: Array,
                observer: '_sourceChanged'
            },

            /**
             * Property of local datasource to as the text property
             */
            textProperty: {
                type: String,
                value: 'text'
            },

            /**
             * `value` Selected object from the suggestions
             */
            value: {
                type: Object,
                notify: true
            },

            /**
             * The current/selected text of the input
             */
            text: {
                type: String,
                notify: true,
                value: '',
                observer: '_textObserver'
            },

            /**
             * Disable showing the clear X button
             */
            disableShowClear: {
                type: Boolean,
                value: false
            },

            /**
             * Binds to a remote data source
             */
            remoteSource: {
                type: Boolean,
                value: false
            },

            /**
             * Event type separator
             */
            eventNamespace: {
                type: String,
                value: '-'
            },

            /**
             * Minimum length to trigger suggestions
             */
            minLength: {
                type: Number,
                value: 1
            },

            /**
             * `pattern` Pattern to validate input field
             */
            pattern: {
                type: String
            },

            /**
             * `allowedPattern` to validate input field
             */
            allowedPattern: {
                type: String
            },

            /**
             * Set to `true` to show a character counter.
             */
            charCounter: {
                type: Boolean,
                value: false
            },

            /**
             * The maximum length of the input value.
             */
            maxlength: {
                type: Number
            },

            /**
             * Name to be used by the autocomplete input. This is necessary if wanted to be integrated with iron-form.
             */
            name: {
                type: String
            },

            /**
             * Function used to filter available items. This function is actually used by paper-autocomplete-suggestions,
             * it is also exposed here so it is possible to provide a custom queryFn.
             */
            queryFn: {
                type: Function
            },

            /**
             * If `true`, it will always highlight the first result each time new suggestions are presented.
             */
            highlightFirst: {
                type: Boolean,
                value: false
            },

            /**
             * Set to `true` to show available suggestions on focus. This overrides the default behavior that only shows
             * notifications after user types
             */
            showResultsOnFocus: {
                type: Boolean,
                value: false
            },

            defaultValue: {
                type: Object,
                observer: '_defaultChanged'
            },

            /*************
            * PRIVATE
            *************/

            /**
             * Indicates whether the clear button is visible or not
             */
            _isClearButtonVisible: {
                type: Boolean,
                value: false
            },

            /**
             * Indicates whether the suggestion popup is visible or not.
             */
            _isSuggestionsOpened: {
                type: Boolean,
                value: false
            }
        }
    }

    ready() {
        super.ready();
        if (this.defaultValue) {
            this._setOption(this.defaultValue);
        }

        this.addEventListener('autocomplete-selected', this._onAutocompleteSelected);
    }

    _sourceChanged(newSource) {
        var text = this.text;
        if (!Array.isArray(newSource) || newSource.length === 0 || text == null || text.length < this.minLength) {
            return;
        }
        if (!this.$.autocompleteInput.focused) {
            return;
        }
        this.$.paperAutocompleteSuggestions._handleSuggestions({
            target: {
                value: text
            }
        });
    }
    
    _defaultChanged(newSource) {
        if (typeof newSource === 'object' && newSource[this.textProperty]) {
            this.text = newSource[this.textProperty];
            this.value = newSource;
        }else{
            console.error(`${newSource} isn't an object or there aren't the textProperty`);
            return;
        }
    }

    /**
     * Clear the input text
     */
    _clear() {
        var option = {
            text: this.text,
            value: this.value
        };
        // console.warn('option', option);
        this.value = null;
        this.text = '';

        this._fireEvent(option, 'reset-blur');

        this._hideClearButton();

        // Fix: https://github.com/PolymerElements/paper-input/issues/493
        if (!this.$.autocompleteInput.focused) {
            this.$.autocompleteInput.focus();
        }
    }

    /**
     * Dispatches autocomplete events
     */
    _fireEvent(option, evt) {
        var id = this._getId();
        var event = 'autocomplete' + this.eventNamespace + evt;

        this.dispatchEvent(new CustomEvent(event, {
            detail:
            {
                id: id,
                value: option.value,
                text: option[this.textProperty] || option.text,
                target: this
            },
            bubbles: true,
            composed: true
        }));
    }

    /**
     * On text event handler
     */
    _textObserver(text) {
        if (text && text.trim()) {
            this._showClearButton();
        } else {
            this._hideClearButton();
        }
    }

    /**
     * On autocomplete selection
     */
    _onAutocompleteSelected(evt) {
        var selection = evt.detail.value;
        this.value = selection;
        this.text = selection[this.textProperty];
    }
    
    /**
     * On autocomplete change
     */
    _onAutocompleteChange(evt) {
        var selection = evt.detail;
        this._fireEvent(selection.value, 'change');
    }

    /**
     * Show the clear button (X)
     */
    _showClearButton() {
        if (this.disableShowClear) {
            return;
        }

        if (this._isClearButtonVisible) {
            return;
        }

        this.$.clear.style.display = 'inline-block';
        this._isClearButtonVisible = true;
    }

    /**
     * Hide the clear button (X)
     */
    _hideClearButton() {
        if (!this._isClearButtonVisible) {
            return;
        }

        this.$.clear.style.display = 'none';
        this._isClearButtonVisible = false;
    }

    _getId() {
        var id = this.getAttribute('id');
        if (!id) id = this.dataset.id;
        return id;
    }

    /**
     * Sets the current text/value option of the input
     * @param {Object} option
     */
    _setOption(option) {
        this.text = option[this.textProperty];
        this.value = option;
        this._showClearButton();
    }

    /****************************
     * PUBLIC
     ****************************/

    /**
     * Gets the current text/value option of the input
     * @returns {Object}
     */
    getOption() {
        return {
            text: this.text,
            value: this.value
        };
    }

    /**
     * Disables the input
     */
    disable() {
        this.disabled = true;
    }

    /**
     * Enable the input
     */
    enable() {
        this.disabled = false;
    }

    /**
     * Sets the component's current suggestions
     * @param {Array} arr
     */
    suggestions(arr) {
        this.$.paperAutocompleteSuggestions.suggestions(arr);
    }

    /**
     * Validates the input
     * @returns {Boolean}
     */
    validate() {
        return this.$.autocompleteInput.validate();
    }

    /**
     * Clears the current input
     */
    clear() {
        this._clear();
    }

    /**
     * Hides the suggestions popup
     */
    hideSuggestions() {
        this._hideClearButton();
        this.$.paperAutocompleteSuggestions.hideSuggestions();
    }

    /**
     * Allows calling the onSelect function from outside
     * This in time triggers the autocomplete-selected event
     * with all the data required
     */
    onSelectHandler(event) {
        this.$.paperAutocompleteSuggestions._onSelect(event);
    }

    /**
     * Fired when a selection is made
     *
     * @event autocomplete-selected
     * @param {String} id
     * @param {String} text
     * @param {Element} target
     * @param {Object} option
     */

    /**
     * Fired on input change
     *
     * @event autocomplete-change
     * @param {String} id
     * @param {String} text
     * @param {Element} target
     * @param {Object} option
     */

    /**
     * Fired on input focus
     *
     * @event autocomplete-focus
     * @param {String} id
     * @param {String} text
     * @param {Element} target
     * @param {Object} option
     */

    /**
     * Fired on input blur
     *
     * @event autocomplete-blur
     * @param {String} id
     * @param {String} text
     * @param {Element} target
     * @param {Object} option
     */

    /**
     * Fired on input reset/clear
     *
     * @event autocomplete-reset-blur
     * @param {String} id
     * @param {String} text
     * @param {Element} target
     * @param {Object} option
     */
}

window.customElements.define('paper-autocomplete', PaperAutocomplete);