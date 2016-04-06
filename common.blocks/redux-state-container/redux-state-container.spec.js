modules.define(
    'spec',
    ['redux-state-container', 'i-bem__dom', 'BEMHTML', 'jquery', 'sinon'],
    function (provide, ReduxStateContainer, BEMDOM, BEMHTML, $, sinon) {
        describe('redux-state-container', function () {
            var bReduxStateContainer;
            var bemJson = { block: 'redux-state-container' };

            beforeEach(function () {
                bReduxStateContainer = BEMDOM.init($(BEMHTML.apply(bemJson)).appendTo('body'))
                    .bem('redux-state-container');
                bReduxStateContainer.rootReducer = function (state, action) {
                    return {
                        text: action.text,
                        isVisible: false
                    }
                }
            });

            afterEach(function () {
                BEMDOM.destruct(bReduxStateContainer.domElem);
            });

            it('should create redux store', function () {
                bReduxStateContainer.store.should.be.ok;
                bReduxStateContainer.store.getState().should.be.ok;
                bReduxStateContainer.store.getState().should.be.empty;
                bReduxStateContainer.getInitialState().should.be.ok;
                bReduxStateContainer.getInitialState().should.be.empty;
            });

            it('should call root reducer function', function () {
                sinon.stub(bReduxStateContainer, 'rootReducer');
                bReduxStateContainer.store.dispatch({ type: 'TEST', text: 'value' });
                bReduxStateContainer.rootReducer.should.have.been.calledOnce;
                bReduxStateContainer.rootReducer.restore();
            });

            it('should trigger event correctly when filter is empty', function () {
                var callback = sinon.spy();
                bReduxStateContainer.onStoreChanged({}, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.calledOnce;
            });

            it('should trigger event when filter is null', function () {
                var callback = sinon.spy();
                bReduxStateContainer.onStoreChanged(null, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.calledOnce;
            });

            it('should trigger event when filter is undefined', function () {
                var callback = sinon.spy();
                bReduxStateContainer.onStoreChanged(undefined, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.calledOnce;
            });

            it('should not trigger event because state not changed', function () {
                var callback = sinon.spy();
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                bReduxStateContainer.onStoreChanged({}, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.notCalled;
            });

            it('should not trigger event when filter is equal to state', function () {
                var callback = sinon.spy();
                var filter = {
                    text: 'test'
                };
                bReduxStateContainer.onStoreChanged(filter, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.notCalled;
            });

            it('should not trigger event when filter is not equal to state', function () {
                var callback = sinon.spy();
                var filter = {
                    text: 'text',
                    isFocused: false
                };
                bReduxStateContainer.onStoreChanged(filter, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.notCalled;
            });

            it('should not trigger event when filter value is not equal to state value', function () {
                var callback = sinon.spy();
                var filter = {
                    value: 'test'
                };
                bReduxStateContainer.onStoreChanged(filter, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.notCalled;
            });

            it('should not trigger event when filter values are partialy equal to state values', function () {
                var callback = sinon.spy();
                var filter = {
                    text: 'test',
                    isVisible: true
                };
                bReduxStateContainer.onStoreChanged(filter, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.notCalled;
            });

            it('should not trigger when filter is not equal to state', function () {
                var callback = sinon.spy();
                var filter = {
                    text: 'text'
                };
                bReduxStateContainer.onStoreChanged(filter, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
                callback.should.have.been.notCalled;
            });

            it('should keep original state after external change', function () {
                var callback = function (state) {
                    state.text = 'val';

                    bReduxStateContainer.store.getState().should.to.be.deep.equal({
                        text: 'test',
                        isVisible: false
                    });
                };
                bReduxStateContainer.onStoreChanged({}, callback);
                bReduxStateContainer.store.dispatch({type: 'TEST', text: 'test'});
            });
        });
        provide();
    }
);
