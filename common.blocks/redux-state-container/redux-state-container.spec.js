modules.define(
  'spec',
  ['redux-state-container', 'i-bem__dom', 'BEMHTML', 'jquery', 'sinon'],
  function (provide, ReduxStateContainer, BEMDOM, BEMHTML, $, sinon) {
    describe('redux-state-container', function () {
      var bReduxStateContainer;
      var bemJson = { block: 'redux-state-container' };

      beforeEach(function () {
        bReduxStateContainer = BEMDOM.init($(BEMHTML.apply(bemJson)).appendTo('body')).bem('redux-state-container');
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
        bReduxStateContainer.store.dispatch({ type: 'TEST-CASE', text: 'value' });
        bReduxStateContainer.rootReducer.should.have.been.calledOnce;
        bReduxStateContainer.rootReducer.restore();
      });
    });

    provide();
  }
);
