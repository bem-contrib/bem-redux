/**
 * @module redux-state-container
 */
modules.define('redux-state-container', ['i-bem__dom', 'redux', 'lodash'], function(provide, BEMDOM, Redux, _) {

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
                var _this = this;
                var reducer = function(state, action) {
                    return _this.rootReducer(state, action);
                };

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
    },

    /**
     * Adding subscriber for changing of store
     *
     * @param {Object} filter filter set for to screen out unnecessary triggering of events
     * @param {Function} callback обработчик события изменения состояния блока
     */
    onStoreChanged: function(filter, callback) {
        var _this = this;
        _this.store.subscribe(function() {
            var state = _this.store.getState();
            if (!filter || _this._isMatch(state, filter)) {
                return callback(_.clone(state));
            }
        });
    },

    /**
     * Performs a partial deep comparison between object and source (copy from lodash@4.8.2)
     * Should be deleted when version of lodash in bem-components will be updated
     *
     * @see https://lodash.com/docs#isMatch
     *
     * @param {Object} object the object to inspect
     * @param {Object} source the object of property values to match
     * @private
     * @returns {Boolean} returns true if object is a match, else false.
     */
    _isMatch: function(object, source) {
        var isStrictComparable = function(value) {
            return value === value && !_.isObject(value);
        };

        var getMatchData = function(object) {
            var result = _.pairs(object);
            var length = result.length;

            while(length--) {
                result[length][2] = isStrictComparable(result[length][1]);
            }
            return result;
        };

        var baseIsMatch = function(object, matchData) {
            var index = matchData.length;
            var length = index;

            if(object === null) {
                return !length;
            }

            while (index--) {
                var data = matchData[index];
                var isNotMatch = data[2] ? data[1] !== object[data[0]] : !(data[0] in object);
                if (isNotMatch) {
                    return false;
                }
            }

            while (++index < length) {
                var data = matchData[index];
                var key = data[0];
                var objectValue = object[key];
                var sourceValue = data[1];

                if (data[2]) {
                    if (objectValue === undefined && !(key in object)) {
                        return false;
                    } else {
                        if (!_.isEqual(sourceValue, objectValue)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        return baseIsMatch(object, getMatchData(source));
    }
}));

});
