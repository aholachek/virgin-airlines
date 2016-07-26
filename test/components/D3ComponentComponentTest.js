/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import D3ComponentComponent from 'components//D3ComponentComponent.js';

describe('D3ComponentComponent', () => {
    let component;

    beforeEach(() => {
      component = createComponent(D3ComponentComponent);
    });

    it('should have its component name as default className', () => {
      expect(component.props.className).to.equal('d3component-component');
    });
});
