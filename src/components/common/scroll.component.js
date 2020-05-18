import React, { PureComponent } from 'react';

export default class ScrollComponent extends PureComponent {
  constructor() {
    super();
    this.rootRef = React.createRef();
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom - 100 <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const { onBottom } = this.props;
    const wrappedElement = this.rootRef.current;
    if (this.isBottom(wrappedElement)) {
      onBottom();
    }
  };
  render() {
    const { children } = this.props;
    return <div ref={this.rootRef}>{children}</div>;
  }
}
