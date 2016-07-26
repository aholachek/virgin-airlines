/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import OnboardPage1Component from 'components/onboardPages/OnboardPage1Component.js';

describe('OnboardPage1Component', () => {
    let component;

    beforeEach(() => {
      component = createComponent(OnboardPage1Component);
    });

    it('should have its component name as default className', () => {
      expect(component.props.className).to.equal('onboardpage1-component');
    });
});
