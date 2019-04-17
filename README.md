[![Coverage Status](https://coveralls.io/repos/github/EmanueleDessi/paper-autocomplete/badge.svg?branch=master)](https://coveralls.io/github/EmanueleDessi/paper-autocomplete?branch=master)
[![Published on NPM](https://img.shields.io/npm/v/paper-autocomplete.svg)](https://www.npmjs.com/package/paper-autocomplete)

# Paper Autocomplete

**_Premise_**: This repo has been forked from OLD polymer element, writing in polymer 1.  
I updated to polymer 3, now this web-component it's compabile only with Polymer 3.0.   
I'm so sorry but there aren't fork in my project from the original repo.   
This is the source [Repo](https://github.com/ellipticaljs/paper-autocomplete)

`<paper-autocomplete>` used to select one element of an array or from a data source.

See: [Documentation](TODO),
     [Demo](TODO).

## Usage

### Installation
```
npm install --save @p3e/paper-autocomplete
```

### In an html file
```html
<html>
  <head>
    <script type="module" src="@p3e/paper-autocomplete/paper-autocomplete.js"></script>
  </head>
  <body>
    <paper-autocomplete label="Search Something" source={{array}}></paper-autocomplete>
  </body>
</html>
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@p3e/paper-autocomplete/paper-autocomplete';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-autocomplete label="Search Something" source={{array}}></paper-autocomplete>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

# For Developers

## Demo and Docs

#### Custome Style, from outside
Find some test on the various demo file.

**_--paper-autocomplete-main-color_**: Color for autocomplete details (border & icons).  
**_--paper-input-font-color_**: Font color only for input value.  
**_--paper-suggestions-color_**: Font color for item suggestions.  
**_--suggestions-item-min-height_**: Min heigth for item suggestions.  
**_--paper-autocomplete-min-height_**: Min heigth for the autocomplete, that wrap also the suggestions.

## Testing & Demo

### First step clone repo & install dependencies:
```
git clone https://github.com/EmanueleDessi/paper-autocomplete.git
cd paper-autocomplete
npm install
```

### To run test whit polymer use:
```
npm run test //Test for all installed browser in your pc
npm run test-safari //Test only for safari browser
```

#### If you have the problem with polymer test, try this (I use this method):

1. open the serve with polymer serve;
```
npm run serve
```
2. run debbuger with vscode or open demo path in your localhost by terminal;
```
open http://localhost:8081/components/@p3e/paper-autocomplete/test/paper-autocomplete-test.html
```

##### Difference Usage between VScode and not
With VScode you see the result and log in the **_DEBUG CONSOLE_**.  
Without VScode you must use the **_Inspect Element_** of your default Browser.  
If will you use VScode, **_remember_**, you must config the debbuger in .vscode folder.  
(my .vscode folder is ignored by gitignore)

### To run demo
```
npm run serve
```

**_TODO_**