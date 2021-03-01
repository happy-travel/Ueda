import React from 'react';
import { observer } from 'mobx-react';

@observer
class Modal extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <div className="modal-wrapper">
                <div
                    className="overlay"
                    onClick={this.props.onCloseClick}
                />
                <div className="modal-scroll">
                    <div className="confirm modal">
                        <div
                            className="close-button"
                            onClick={this.props.onCloseClick}
                        >
                            <span className="icon icon-close" />
                        </div>
                        {title ?
                            <h3><strong>{title}</strong></h3> :
                            null
                        }
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
