# Vue Tools
A set of tools for Vue.js projects

## Installation
`npm install vue-tools -g`
or
`yarn add vue-tools -g`

Then, you can simply type `vt` in your terminal to use Vue Tools.

## Generator
Let generate components, views, services and modules with simple commands!

### vt --help
Show the help of Vue Tools

### vt init
Initialize Vue Tools config file in the current project.
Must run this command **at the root of the project** before using any other commands.

`vt init`

### vt generate component
Generate a new component.

`vt generate component [name]`

[name]: The name of the new component

Short version: `vt g c [name]`

#### Available arguments :
Generate in a module

`-m|--module [moduleName]`

[moduleName]: The module where the new component will be generated

Generate a component in JavaScript instead of TypeScript

`-j|--js`

Don't fill the component with decorators examples, such as @Prop, @PropSync, @Watch, computed value get/set, @Emitters, etc.

`-e|--empty`

### vt generate view
Generate a new view.

`vt generate view [name]`

[name]: The name of the new view

Short version: `vt g v [name]`

#### Available arguments :
Generate in a module

`-m|--module [moduleName]`

[moduleName]: The module where the new view will be generated

Generate a component in JavaScript instead of TypeScript

`-j|--js`

Don't fill the view with decorators examples, such as @Prop, @PropSync, @Watch, computed value get/set, @Emitters, etc.

`-e|--empty`

### vt generate service
Generate a new service.

`vt generate service [name]`

[name]: The name of the new service

Short version: `vt g s [name]`

#### Available arguments :
Generate in a module

`-m|--module [moduleName]`

[moduleName]: The module where the new service will be generated

Generate a component in JavaScript instead of TypeScript

`-j|--js`

### vt generate store
Generate a new Vuex store.

`vt generate store [name]`

[name]: The name of the new Vuex store

Short version: `vt g x [name]`

#### Available arguments :
Generate a component in JavaScript instead of TypeScript

`-j|--js`

### vt generate module
Generate a new module.

`vt generate module [name]`

[name]: The name of the new module

Short version: `vt g m [name]`

#### Available arguments :
Generate a component in JavaScript instead of TypeScript

`-j|--js`

