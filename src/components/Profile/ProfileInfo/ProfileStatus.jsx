import React, {Component} from 'react';

class ProfileStatus extends Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activatedEditMode = () => {
        this.setState({
            editMode: true
        });
    }

    deactivatedEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        let body = e.currentTarget.value;
        this.setState({ status: body });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status });
        }
    }

    render() {
        return (
            <>
                {!this.state.editMode ?
                    <p
                        onDoubleClick={this.activatedEditMode}
                    >
                        {this.props.status ? this.props.status : 'Nope'}
                    </p>
                    :
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            value={this.state.status}
                            type="text"
                            autoFocus={true}
                            onBlur={this.deactivatedEditMode}
                        />
                    </div>
                }
            </>
        );
    }
}

export default ProfileStatus;
