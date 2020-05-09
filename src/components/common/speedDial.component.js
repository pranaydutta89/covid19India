import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { WhatsApp, Facebook, InfoOutlined } from '@material-ui/icons';
const actions = [
  { icon: <InfoOutlined />, name: 'About Us', id: 'about' },
  { icon: <WhatsApp />, name: 'Whatsapp Share', id: 'wa' },
  { icon: <Facebook />, name: 'Facebook Share', id: 'fb' },
];

const css = `.fab-btn{
              bottom:10px;
              right:10px;
              position:fixed
            }`;

class SpeedDialComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  menuItemClick(id) {
    const { history } = this.props;
    switch (id) {
      case 'about':
        history.push('/about');
        break;
      case 'wa':
        window.open(
          'whatsapp://send?text=Latest covid19 outbreak data on https://covid2.in',
          '_blank'
        );
        break;
      case 'fb':
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=covid2.in',
          '_blank'
        );
        break;
    }

    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <>
        <style>{css}</style>
        <div className="fab-btn">
          <SpeedDial
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon />}
            open={isOpen}
            onOpen={() => this.setState({ isOpen: true })}
            onClose={() => this.setState({ isOpen: false })}
            direction="up"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  this.menuItemClick(action.id);
                }}
              />
            ))}
          </SpeedDial>
        </div>
      </>
    );
  }
}

export default withRouter(SpeedDialComponent);
