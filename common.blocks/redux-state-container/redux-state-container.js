/**
 * @module redux-state-container
 */
modules.define('redux-state-container', ['i-bem__dom', 'redux'], function(provide, BEMDOM, Redux) {

/**
 * @exports
 * @class redux-state-container
 * @abstract
 * @bem
 */
provide(BEMDOM.decl(this.name, /** @lends redux-state-container.prototype */{
    onSetMod: {
        js: {
            inited: function() {
                var initialState = this.getInitialState();
                // Save context for rootReducer
                var reducer = function (state, action) {
                    return this.rootReducer(state, action)
                }.bind(this);

                /**
                 * Store of Redux State Container
                 * @public
                 * @type {Object}
                 */
                this.store = Redux.createStore(reducer, initialState);
            }
        }
    },

    /**
     * Returns initial state
     * Should be overridden
     * @returns {Object}
     */
    getInitialState: function() {
        return {};
    },

    /**
     * Root reducer
     * Should be overridden
     * @param {Object} state Previous state
     * @param {Object} action Action
     * @param {String} action.type Type of action
     * @returns {Object} New state
     */
    rootReducer: function(state, action) {
        return state;
    }
}));

});
