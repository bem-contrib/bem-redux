# bem-redux
Redux for BEM projects

## How to use

You have 2 main options to use it.
* Connect your store with block-container that contains your dynamic logic.
* Create store as singleton without connection with BEM block.

### Block as state container

Inherit your block that should be state container from `redux-state-container` using `base-block` construction.

Declare (override) you own `getInitialState` and `rootReducer` methods ([more about reducers](http://redux.js.org/docs/basics/Reducers.html)).

Use [redux store api](http://redux.js.org/docs/basics/Store.html) to interact with your store:
```javascript
// Dispatch some actions
this.store.dispatch

// Subscribe to the state changes
this.store.subscribe

// Get current state
this.store.getState
```

### Store as singleton

You can use `Redux` as you want.
Just add `redux` in your module dependencies and go ahead.
For example, you can define module that provides your store with your logic as singleton.

```javascript
modules.define('my-store', ['redux'], function(provide, Redux) {
    const initialState = { ... };
    const rootReducer = (state, action) => { ... };
    const store = Redux.createStore(rootReducer, initialState);
    provide(store);
});
```

Use this store in needed blocks adding `my-store` in dependencies.

## View example

[Todo example for bem-redux](https://github.com/rakchaev/bem-redux-todo-example).