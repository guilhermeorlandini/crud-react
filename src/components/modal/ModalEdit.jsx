import React, { Component } from 'react'
import './ModalEdit.css'
import { Button, Modal} from 'react-bootstrap'

const initialState = {
    show: false
}

export default class ModalEdit extends Component {

    state = {...initialState}

    constructor(props) {
        super(props)

        this.handleClose = this.handleClose.bind(this)
        this.onClickLoad = this.onClickLoad.bind(this)
        this.onClickSave = this.onClickSave.bind(this)
    }

    onClickLoad (event) {
        this.props.loadButtonHandler(this.props.user) 
        this.setState({show: true})
    }

    onClickSave (event) {
        this.props.saveButtonHandler(this.props.user) 
        this.setState({show: false})
    }

    handleClose () {
        this.setState({...initialState})
    }

    render() {
        return (
            <React.Fragment>
                <Button className="mr-2" variant={this.props.buttonColor} onClick={this.onClickLoad}>
                    {this.props.buttonMsg}
                </Button>
                <Modal 
                    className="ModalContent"
                    show={this.state.show} 
                    animation={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>{this.props.title}</Modal.Title>
                        <Button className="close" onClick={this.handleClose}>
                            x
                        </Button>
                        </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" onClick={this.onClickSave}>
                        Confirmar
                    </Button>
                    <Button variant="danger" onClick={this.handleClose}>
                        Cancelar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}