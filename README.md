# css-injector
Creates stylesheets out of strings

## Motivation
Bakes one or more baseline mandatory stylesheets into your JavaScript -- i.e., without having to depend on an external .css file. You supply css rules as strings and cssInjector creates `<style>...</style>` elements and inserts them into your `<head>...</head>` element (wherever else you want).

## Synopsis

```javascript
cssInjector(stylesheet _[_ , id _[_ , refereneceElement _] ]_ );
```
where:
* `stylesheet` is a string _or_ a list of strings containing css rules.
* `id` is an optional string that will get assigned to the `<style>` tag's `id` attribute
* `referenceElement` is an optional DOM `Element` _or_ a string containing a css selector that resolves to a DOM element _or_ `null`. Including this parameter forces the new `<style>...</style>` element to be inserted just before the given element. If omitted (or `undefined`), the new stylesheet is injected at top of `<head>...</head>` element. If `null`, it is inserted at the bottom of the `<head>...</head>` element.

## Example

```javascript
var stylesheet = [
    'div {',
    '    background-color: red;',
    '    color: yellow;'
    '}'
];

cssInjector(stylesheet);
```

\[See the note [Regarding submodules](https://github.com/openfin/rectangular#regarding-submodules)
for important information on cloning this repo or re-purposing its build template.\]

## API documentation

Detailed API docs can be found [here](http://openfin.github.io/css-injector).
