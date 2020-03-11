import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Início"
        subtitle="Primeiro projeto React.">
        <div className="display-4">Bem vindo!</div>
        <hr/>
        <p className="mb-0">  
            <i className="fa fa-user-circle-o"> <strong>C R U D</strong> </i> de usuários com json-server  
        </p>
    </Main>